const fs = require('fs');

class SparseMatrix {
    constructor(arg1, arg2) {
        if (typeof arg1 === 'string') {
            this._loadFromFile(arg1);
        } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
            this._initialize(arg1, arg2);
        } else {
            throw new Error("Invalid constructor arguments");
        }
    }

    _initialize(numRows, numCols) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.data = {}; // Dictionary to store non-zero elements
    }

    _loadFromFile(matrixFilePath) {
        const data = fs.readFileSync(matrixFilePath, 'utf8');
        const lines = data.trim().split('\n');

        const [numRows, numCols] = lines[0].split(' ').map(Number);
        this._initialize(numRows, numCols);

        for (let i = 1; i < lines.length; i++) {
            const [row, col, value] = lines[i].split(' ').map(Number);
            this.setElement(row, col, value);
        }
    }

    getElement(currRow, currCol) {
        if (currRow < 0 || currRow >= this.numRows || currCol < 0 || currCol >= this.numCols) {
            throw new RangeError("Index out of range");
        }
        return this.data[`${currRow},${currCol}`] || 0;
    }

    setElement(currRow, currCol, value) {
        if (currRow < 0 || currRow >= this.numRows || currCol < 0 || currCol >= this.numCols) {
            throw new RangeError("Index out of range");
        }
        if (value !== 0) {
            this.data[`${currRow},${currCol}`] = value;
        } else {
            delete this.data[`${currRow},${currCol}`];
        }
    }

    print() {
        for (let i = 0; i < this.numRows; i++) {
            let row = [];
            for (let j = 0; j < this.numCols; j++) {
                row.push(this.getElement(i, j));
            }
            console.log(row.join(' '));
        }
    }

    static add(a, b) {
        if (a.numRows !== b.numRows || a.numCols !== b.numCols) {
            throw new Error("Matrices dimensions must agree for addition.");
        }

        let result = new SparseMatrix(a.numRows, a.numCols);
        for (let key in a.data) {
            result.data[key] = a.data[key];
        }
        for (let key in b.data) {
            if (result.data[key]) {
                result.data[key] += b.data[key];
            } else {
                result.data[key] = b.data[key];
            }
        }
        return result;
    }

    static subtract(a, b) {
        if (a.numRows !== b.numRows || a.numCols !== b.numCols) {
            throw new Error("Matrices dimensions must agree for subtraction.");
        }

        let result = new SparseMatrix(a.numRows, a.numCols);
        for (let key in a.data) {
            result.data[key] = a.data[key];
        }
        for (let key in b.data) {
            if (result.data[key]) {
                result.data[key] -= b.data[key];
            } else {
                result.data[key] = -b.data[key];
            }
        }
        return result;
    }

    static multiply(a, b) {
        if (a.numCols !== b.numRows) {
            throw new Error("Matrices dimensions must agree for multiplication.");
        }

        let result = new SparseMatrix(a.numRows, b.numCols);
        for (let keyA in a.data) {
            const [rowA, colA] = keyA.split(',').map(Number);
            for (let colB = 0; colB < b.numCols; colB++) {
                const keyB = `${colA},${colB}`;
                if (b.data[keyB]) {
                    const keyResult = `${rowA},${colB}`;
                    if (result.data[keyResult]) {
                        result.data[keyResult] += a.data[keyA] * b.data[keyB];
                    } else {
                        result.data[keyResult] = a.data[keyA] * b.data[keyB];
                    }
                }
            }
        }
        return result;
    }

    static loadFromFile(filename) {
        const data = fs.readFileSync(filename, 'utf8');
        const lines = data.trim().split('\n');

        const [numRows, numCols] = lines[0].split(' ').map(Number);
        if (isNaN(numRows) || isNaN(numCols) || numRows <= 0 || numCols <= 0) {
            throw new Error("Input file has wrong format");
        }

        let matrix = new SparseMatrix(numRows, numCols);

        for (let i = 1; i < lines.length; i++) {
            const [row, col, value] = lines[i].split(' ').map(Number);
            if (isNaN(row) || isNaN(col) || isNaN(value)) {
                throw new Error("Input file has wrong format");
            }
            matrix.setElement(row, col, value);
        }

        return matrix;
    }
}

function saveToFile(matrix, filename) {
    let data = `${matrix.numRows} ${matrix.numCols}\n`;
    for (let key in matrix.data) {
        const [row, col] = key.split(',').map(Number);
        data += `${row} ${col} ${matrix.data[key]}\n`;
    }
    fs.writeFileSync(filename, data, 'utf8');
}

(async function main() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const question = (query) => new Promise(resolve => rl.question(query, resolve));

    try {
        const operation = await question("Enter operation (add, subtract, multiply): ");
        const file1 = await question("Enter first matrix file: ");
        const file2 = await question("Enter second matrix file: ");
        const outputFile = await question("Enter output file: ");

        const matrix1 = SparseMatrix.loadFromFile(file1);
        const matrix2 = SparseMatrix.loadFromFile(file2);
        let result;

        switch (operation) {
            case 'add':
                result = SparseMatrix.add(matrix1, matrix2);
                break;
            case 'subtract':
                result = SparseMatrix.subtract(matrix1, matrix2);
                break;
            case 'multiply':
                result = SparseMatrix.multiply(matrix1, matrix2);
                break

