export function validateRegisters(lineNumber, ...registers) {
    for (let i = 0; i < registers.length; i++) {
        if (!/^([ts][0-7]|zero|lo|hi)$/.test(registers[i])) {
            throw new TypeError(`Wrong register "${registers[i]}" at line ${lineNumber}`);
        }
    }
}

export function validateImmediate(value, range, lineNumber) {
    if (value < range[0] || value > range[1]) {
        throw new RangeError(`Immediate value is outside its range, at line ${lineNumber}`);
    }
}

export function validateLabel(label, labels, lineNumber) {
    if (!Object.keys(labels).includes(label)) {
        throw new TypeError(`Unexpected label "${label}" at line ${lineNumber}`);
    }
}