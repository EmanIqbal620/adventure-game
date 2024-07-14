#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';

class Character {
    name: string;
    fuel: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    fuelDecrease() {
        this.fuel = Math.max(this.fuel - 25, 0);
    }

    fuelIncrease() {
        this.fuel = 100;
    }
}

class Player extends Character {
    constructor(name: string) {
        super(name);
    }
}

class Opponent extends Character {
    constructor(name: string) {
        super(name);
    }
}

async function main() {
    let playerInput = await inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Please Enter Your Name:'
        }
    ]);

    let opponentInput = await inquirer.prompt([
        {
            name: 'select',
            type: 'list',
            message: 'Select Your Opponent:',
            choices: [
                { name: 'Skeleton', value: 'Skeleton' },
                { name: 'Alien', value: 'Alien' },
                { name: 'Zombie', value: 'Zombie' }
            ]
        }
    ]);

    let p1 = new Player(playerInput.name);
    let o1 = new Opponent(opponentInput.select);

    while (true) {
        let ask = await inquirer.prompt([
            {
                name: 'opt',
                type: 'list',
                message: 'What would you like to do?',
                choices: ['Attack', 'Drink Potion', 'Run For Your Life..']
            }
        ]);

        if (ask.opt === 'Attack') {
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                p1.fuelDecrease();
                console.log(chalk.red(`${p1.name} fuel is ${p1.fuel}`));
                console.log(chalk.green(`${o1.name} fuel is ${o1.fuel}`));
            } else {
                o1.fuelDecrease();
                console.log(chalk.red(`${p1.name} fuel is ${p1.fuel}`));
                console.log(chalk.green(`${o1.name} fuel is ${o1.fuel}`));
            }
        } else if (ask.opt === 'Drink Potion') {
            p1.fuelIncrease();
            console.log(chalk.blue(`You Drink Health Potion. Your Fuel is ${p1.fuel}`));
        } else if (ask.opt === 'Run For Your Life..') {
            console.log(chalk.yellow('You Lose, Better Luck Next Time'));
            break;
        }

        if (p1.fuel <= 0 || o1.fuel <= 0) {
            if (p1.fuel <= 0) {
                console.log(chalk.yellow('You Lose, Better Luck Next Time'));
            } else {
                console.log(chalk.green('You Win!'));
            }
            break;
        }
    }
}

main();


