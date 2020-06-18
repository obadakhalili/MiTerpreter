import { validateRegisters, validateImmediate, validateLabel } from '../validators.js';
import opcodes from '../opcodes.js';

export default function(AST, labels, registers, memory) {
    const height = AST.length;
    let noExecutedTimes = 0, limit = 1000000;

    for (let i = 0; i < height; i++) {
        if (noExecutedTimes == limit) {
            if (confirm(`You have executed ${limit} times, are you stuck in an infinte loop?\nPress OK to stop executing`)) {
               throw new EvalError('Emergency Break');
            } else {
                limit *= 2;
            }
        }
        let opFunc = opcodes[AST[i].format].find(opcode => opcode.name == AST[i].opcode);
        if (!opFunc) {
            throw new TypeError(`Wrong opcode "${AST[i].opcode}" at line ${AST[i].line}`);
        }
        opFunc = opFunc.func;
        if (AST[i].format == 'R') {
            validateRegisters(AST[i].line, AST[i].rd, AST[i].rs, AST[i].rt);
            opFunc(AST[i].rd, AST[i].rs, AST[i].rt, registers);
        } else if (AST[i].format == 'I') {
            validateRegisters(AST[i].line, AST[i].rd, AST[i].rs);
            validateImmediate(AST[i].imm16, [-65535, 65535], AST[i].line);
            opFunc(AST[i].rd, AST[i].rs, Number(AST[i].imm16), registers);
        } else if (AST[i].format == 'C') {
            validateRegisters(AST[i].line, AST[i].rs, AST[i].rt);
            validateLabel(AST[i].label, labels, AST[i].line, i);
            i = opFunc(AST[i].rs, AST[i].rt, registers) ? labels[AST[i].label] - 1 : i;
        } else if (AST[i].format == 'M') {
            validateRegisters(AST[i].line, AST[i].rd, AST[i].rs);
            validateImmediate(Number(AST[i].offset), [0, 1023], AST[i].line);
            opFunc(AST[i].rd, AST[i].rs, Number(AST[i].offset), registers, memory);
        } else if (AST[i].format == 'B') {
            validateRegisters(AST[i].line, AST[i].rs);
            validateLabel(AST[i].label, labels, AST[i].line, i);
            i = opFunc(AST[i].rs, registers) ? labels[AST[i].label] - 1 : i;
        } else if (AST[i].format == 'A') {
            validateRegisters(AST[i].line, AST[i].rs, AST[i].rt);
            opFunc(AST[i].rs, AST[i].rt, registers);
        } else if (AST[i].format == 'J') {
            validateLabel(AST[i].label, labels, AST[i].line);
            i = opFunc(AST[i].label, labels) - 1;
        } else if (AST[i].format == 'L') {
            validateRegisters(AST[i].line, AST[i].rd);
            validateImmediate(AST[i].imm32, [-4294967295, 4294967295], AST[i].line);
            opFunc(AST[i].rd, Number(AST[i].imm32), registers);
        }
        noExecutedTimes++;
    }
}