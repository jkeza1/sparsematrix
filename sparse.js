const fs = require('fs');

class SparseMatrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    setValue(row, col, value) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols)
            throw new RangeError("Index out of range");
        this.data[row][col] = value;
    }

    getValue(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols)
            throw new RangeError("Index out of range");
        return this.data[row][col];
    }

    print() {
        this.data.forEach(row => console.log(row.join(' ')));
    }

    static add(a, b) {
        if (a.rows !== b.rows || a.cols !== b.cols)
            throw new Error("Matrices dimensions must agree for addition.");

        let result = new SparseMatrix(a.rows, a.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                result.setValue(i, j, a.getValue(i, j) + b.getValue(i, j));
            }
        }
        return result;
    }

    static subtract(a, b) {
        if (a.rows !== b.rows || a.cols !== b.cols)
            throw new Error("Matrices dimensions must agree for subtraction.");

        let result = new SparseMatrix(a.rows, a.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                result.setValue(i, j, a.getValue(i, j) - b.getValue(i, j));
            }
        }
        return result;
    }

    static multiply(a, b) {
        if (a.cols !== b.rows)
            throw new Error("Matrices dimensions must agree for multiplication.");

        let result = new SparseMatrix(a.rows, b.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < b.cols; j++) {
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.getValue(i, k) * b.getValue(k, j);
                }
                result.setValue(i, j, sum);
            }
        }
        return result;
    }

    static loadFromFile(filename) {
        const data = fs.readFileSync(filename, 'utf8');
        const lines = data.trim().split('\n');

        const [rows, cols] = lines[0].split(' ').map(Number);
        if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
            throw new Error("Input file has wrong format");
        }

        let matrix = new SparseMatrix(rows, cols);

        for (let i = 1; i < lines.length; i++) {
            const [row, col, value] = lines[i].split(' ').map(Number);
            if (isNaN(row) || isNaN(col) || isNaN(value)) {
                throw new Error("Input file has wrong format");
            }
            matrix.setValue(row, col, value);
        }

        return matrix;
    }
}

function saveToFile(matrix, filename) {
    let data = `${matrix.rows} ${matrix.cols}\n`;
    for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.cols; j++) {
            let value = matrix.getValue(i, j);
            if (value !== 0) {
                data += `${i} ${j} ${value}\n`;
            }
        }
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
                break;
            default:
                throw new Error("Invalid operation");
        }

        saveToFile(result, outputFile);
        console.log(`Operation successful. Result saved to ${outputFile}`);
    } catch (e) {
        console.error(`Error: ${e.message}`);
    } finally {
        rl.close();
    }
})();

