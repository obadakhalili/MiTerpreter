const labels = Object.create(null);

function readLabel(instruction, address) {
    const match = /^([a-zA-Z][a-zA-Z0-9_]*[ ]*:)?/.exec(instruction);
    if (match[1]) {
        labels[match[1].slice(0, -1).trimEnd()] = address;
        return match[1].length;
    }
    return 0;
}

function readComment(instruction) {
    const match = /#.*/.exec(instruction);
    if (match) {
        return match.index;
    }
    return instruction.length;
}

export default function(MIPS) {
    const instructions = MIPS.split('\n'), noInstructions = instructions.length, AST = [];
    let currentInstruction = 0;

    for (let i = 0; i < noInstructions; i++) {
        instructions[i] = instructions[i].trimStart();
        const skipTo = readLabel(instructions[i], currentInstruction);
        const stopAt = readComment(instructions[i]);
        instructions[i] = instructions[i].slice(skipTo, stopAt).trim();
        let match, fields;
        if (match = /^([a-zA-Z]+)[ ]+\$(.+),[ ]*\$(.+),[ ]*\$(.+)$/.exec(instructions[i])) {
            fields =  {
                format: 'R',
                opcode: match[1],
                rd: match[2].trimEnd(),
                rs: match[3].trimEnd(),
                rt: match[4].trimEnd(),
                line: i + 1
            };
        } else if (match = /^([a-zA-Z]+)[ ]+\$(.+),[ ]*\$(.+),[ ]*([-+]?[0-9]+)$/.exec(instructions[i])) {
            fields = {
                format: 'I',
                opcode: match[1],
                rd: match[2].trimEnd(),
                rs: match[3].trimEnd(),
                imm16: match[4],
                line: i + 1
            };
        } else if (match = /^([a-zA-Z]+)[ ]+\$(.+),[ ]*\$(.+),[ ]*([a-zA-Z][a-zA-Z0-9_]*)$/.exec(instructions[i])) {
            fields = {
                format: 'C',
                opcode: match[1],
                rs: match[2].trimEnd(),
                rt: match[3].trimEnd(),
                label: match[4],
                line: i + 1
            };
        } else if (match = /^([a-zA-Z]+)[ ]+\$(.+),[ ]*([0-9]+)\(\$(.+)\)$/.exec(instructions[i])) {
            fields = {
                format: 'M',
                opcode: match[1],
                rd: match[2].trimEnd(),
                rs: match[4].trimEnd(),
                offset: match[3],
                line: i + 1
            };
        } else if (match = /^([a-zA-Z]+)[ ]+\$(.+),[ ]*([a-zA-Z][a-zA-Z0-9_]*)$/.exec(instructions[i])) {
            fields = {
                format: 'B',
                opcode: match[1],
                rs: match[2].trimEnd(),
                label: match[3],
                line: i + 1
            };
        } else if (match = /^([a-zA-Z]+)[ ]+\$(.+),[ ]*\$(.+)$/.exec(instructions[i])) {
            fields = {
                format: 'A',
                opcode: match[1],
                rs: match[2].trimEnd(),
                rt: match[3].trimEnd(),
                line: i + 1
            };
        } else if (match = /^j[ ]+([a-zA-Z][a-zA-Z0-9_]*)$/.exec(instructions[i])) {
            fields = {
                format: 'J',
                opcode: 'j',
                label: match[1],
                line: i + 1
            };
        } else if (match = /^([a-zA-Z]+)[ ]+\$(.+),[ ]*([-+]?[0-9]+)$/.exec(instructions[i])) {
            fields = {
                format: 'L',
                opcode: match[1],
                rd: match[2].trimEnd(),
                imm32: match[3],
                line: i + 1
            };
        } else if (/^(?![\s\S])/.test(instructions[i])) {
            continue;
        } else {
            throw new SyntaxError(`Unexpected syntax at line ${i + 1}, "${instructions[i]}"`);
        }
        currentInstruction++;
        AST.push(fields);
    }
    return {
        AST,
        labels
    }
}