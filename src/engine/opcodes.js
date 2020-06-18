import { validateImmediate } from './validators.js';

// R-Format
const add = {
    func(rd, rs, rt, registers) {
        const sum = registers[rs] + registers[rt];
        validateImmediate(sum, [-4294967295, 4294967295]);
        registers[rd] = sum;
    },
    name: 'add'
};

const and = {
    func(rd, rs, rt, registers) {
        registers[rd] = registers[rs] & registers[rt];
    },
    name: 'and'
};

const or = {
    func(rd, rs, rt, registers) {
        registers[rd] = registers[rs] | registers[rt];
    },
    name: 'or'
};

const slt = {
    func(rd, rs, rt, registers) {
        if (registers[rs] < registers[rt]) {
            registers[rd] = 1;
        } else {
            registers[rd] = 0;
        }
    },
    name: 'slt'
};

const sub = {
    func(rd, rs, rt, registers) {
        const sum = registers[rs] - registers[rt];
        validateImmediate(sum, [-4294967295, 4294967295]);
        registers[rd] = sum;
    },
    name: 'sub'
};

const xor = {
    func(rd, rs, rt, registers) {
        registers[rd] = registers[rs] ^ registers[rt];
    },
    name: 'xor'
};

// I-Format
const addi = {
    func(rd, rs, imm16, registers) {
        const sum = registers[rs] + imm16;
        validateImmediate(sum, [-4294967295, 4294967295]);
        registers[rd] = sum;
    },
    name: 'addi'
};

const andi = {
    func(rd, rs, imm16, registers) {
        registers[rd] = registers[rs] & imm16;
    },
    name: 'andi'
};

const xori = {
    func(rd, rs, imm16, registers) {
        registers[rd] = registers[rs] ^ imm16;
    },
    name: 'xori'
};

const sll = {
    func(rd, rs, imm16, registers) {
        registers[rd] = registers[rs] << imm16;
    },
    name: 'sll'
};

const srl = {
    func(rd, rs, imm16, registers) {
        registers[rd] = registers[rs] >> imm16;
    },
    name: 'srl'
};

// C-Format
const beq = {
    func(rs, rt, registers) {
        return registers[rs] == registers[rt];
    },
    name: 'beq'
};

const bne = {
    func(rs, rt, registers) {
        return registers[rs] != registers[rt];
    },
    name: 'bne'
};

const bge = {
    func(rs, rt, registers) {
        return registers[rs] >= registers[rt];
    },
    name: 'bge'
};

const ble = {
    func(rs, rt, registers) {
        return registers[rs] <= registers[rt];
    },
    name: 'ble'
};

const blt = {
    func(rs, rt, registers) {
        return registers[rs] < registers[rt];
    },
    name: 'blt'
};

const bgt = {
    func(rs, rt, registers) {
        return registers[rs] > registers[rt];
    },
    name: 'bgt'
};

// M-Format
const lw = {
    func(rd, rs, offset, registers, memory) {
        registers[rd] = memory[offset + registers[rs]];
    },
    name: 'lw'
};

const sw = {
    func(rd, rs, offset, registers, memory) {
        memory[offset + registers[rs]] = registers[rd];
    },
    name: 'sw'
};

// B-Type
const bgez = {
    func(rs, registers) {
        return registers[rs] >= 0;
    },
    name: 'bgez'
};

const bgtz = {
    func(rs, registers) {
        return registers[rs] > 0;
    },
    name: 'bgtz'
};

const blez = {
    func(rs, registers) {
        return registers[rs] <= 0;
    },
    name: 'blez'
};

const bltz = {
    func(rs, registers) {
        return registers[rs] < 0;
    },
    name: 'bltz'
};

// A-Format
const div = {
    func(rs, rt, registers) {
        registers.lo = Math.floor(registers[rs] / registers[rt]);
        registers.hi = registers[rs] % registers[rt];
    },
    name: 'div'
};

const mult = {
    func(rs, rt, registers) {
        registers.lo = registers[rs] * registers[rt];
    },
    name: 'mult'
};

// J-Format
const j = {
    func(label, labels) {
        return labels[label];
    },
    name: 'j'
};

// L-Format
const li = {
    func(rd, imm32, registers) {
        registers[rd] = imm32;
    },
    name: 'li'
};


export default {
    R: [add, and, or, srl, sub, xor],
    I: [addi, andi, sll, slt, xori],
    C: [bne, beq, bge, ble, blt, bgt],
    M: [lw, sw],
    B: [bgez, bgtz, blez, bltz],
    A: [div, mult],
    J: [j],
    L: [li]
};