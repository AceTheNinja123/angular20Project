import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// this is inspored by https://www.geeksforgeeks.org/angular-js/calculator-app-using-angular/
@Component({
    selector: 'app-calculator',
    standalone: true,
    // imports: [RouterOutlet],
    templateUrl: './Calculator.component.html',
    styleUrl: '../../../styles.css'
})
export class CalculatorComponent {
    title = 'calculator';
    display: string = '';
    buttons: string[][] = [['7', '8', '9', '/'], ['4', '5', '6', '*'], ['1', '2', '3', '-'], ['0', '.', '=', '+']];
    appendInput(value: string): void { this.display += value; }

    clear(): void { this.display = ''; }

    calculate(): void {
        try {
            const result = this.evaluateExpression(this.display || '0');
            this.display = String(result);
        } catch (e) { this.display = 'Error'; }
    }

    // Small, safe expression evaluator supporting + - * /, parentheses and decimals. Uses the shunting-yard algorithm to produce RPN and then evaluates it.
    private evaluateExpression(expr: string): number {
        if (!expr) { return 0; }
        // basic validation: allow digits, operators, parentheses, dot and whitespace
        if (/[^0-9+\-*/().\s]/.test(expr)) { throw new Error('Invalid characters'); }

        type Token = number | string;
        const outputQueue: Token[] = [];
        const opStack: string[] = [];

        const precedence: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2 };

        // Tokenize: numbers (with decimal) or operators/parens
        const tokenRegex = /\d*\.?\d+|[+\-*/()]/g;
        const tokens = expr.match(tokenRegex);
        if (!tokens) { throw new Error('Empty expression'); }

        for (const t of tokens) {
            if (/^\d*\.?\d+$/.test(t)) { outputQueue.push(parseFloat(t)); }
            else if (t === '+' || t === '-' || t === '*' || t === '/') {
                while (
                    opStack.length > 0 &&
                    opStack[opStack.length - 1] !== '(' &&
                    precedence[opStack[opStack.length - 1]] >= precedence[t]
                ) { outputQueue.push(opStack.pop() as string); }
                opStack.push(t);
            } else if (t === '(') { opStack.push(t); }
            else if (t === ')') {
                while (opStack.length > 0 && opStack[opStack.length - 1] !== '(') {
                    outputQueue.push(opStack.pop() as string);
                }
                if (opStack.length === 0) { throw new Error('Mismatched parentheses'); }
                opStack.pop(); // remove '('
            }
        }

        while (opStack.length > 0) {
            const op = opStack.pop() as string;
            if (op === '(' || op === ')') { throw new Error('Mismatched parentheses'); }
            outputQueue.push(op);
        }

        // Evaluate RPN
        const evalStack: number[] = [];
        for (const tok of outputQueue) {
            if (typeof tok === 'number') { evalStack.push(tok); }
            else {
                const b = evalStack.pop();
                const a = evalStack.pop();
                if (a === undefined || b === undefined) { throw new Error('Invalid expression'); }
                let res: number;
                switch (tok) {
                    case '+': res = a + b; break;
                    case '-': res = a - b; break;
                    case '*': res = a * b; break;
                    case '/': if (b === 0) { throw new Error('Division by zero'); } res = a / b; break;
                    default: throw new Error('Unknown operator');
                }
                evalStack.push(res);
            }
        }
        if (evalStack.length !== 1) { throw new Error('Invalid expression'); }
        return evalStack[0];
    }
}