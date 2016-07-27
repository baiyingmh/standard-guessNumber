const AnswerGenerator = require('./answer-generator');
const CompareNumber = require('./compare-number');

class Game {
    constructor() {
        this.chances = 6;
        this.answer = AnswerGenerator.generator();

        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', (input)=> {
            if (!this.validate(input)) {
                console.log('Cannot input duplicate numbers!');
                this.ask();
            } else {
                const result = CompareNumber.compare(input, this.answer);
                if (result === '4A0B') {
                    console.log("Congratulations!");
                    process.exit();
                } else {
                    console.log(result);
                    this.chances--;
                    if (this.isGameOver()) {
                        console.log("Game Over\n");
                        console.log(`Answer:${this.answer}`);
                        process.exit();
                    } else {
                        this.ask();
                    }
                }
            }
        });
    }

    start() {
        console.log('Welcome!\n');
        this.ask();
    }

    validate(input) {
        return input.split('').every((digit, index, array) => {
            return array.lastIndexOf(digit) === index;
        });
    }

    ask() {
        console.log(`Please input your number(${this.chances}):`);
    }

    isGameOver() {
        return this.chances === 0;
    }
}

new Game().start();
module.exports = Game;