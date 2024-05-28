class SparseMatrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = {}; // Store the matrix as an object of objects for sparse representation
    }

    static fromFile(filePath) {
        const fs = require('fs');
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n').filter(line => line.trim() !== '');
        
        const rows = parseInt(lines[0].split('=')[1]);
        const cols = parseInt(lines[1].split('=')[1]);
        const matrix = new SparseMatrix(rows, cols);
        
        for (let i = 2; i < lines.length; i++) {
            const [row, col, value] = lines[i].slice(1, -1).split(',').map(Number);
            matrix.setElement(row, col, value);
        }
        
        return matrix;
    }

    getElement(row, col) {
        if (this.data[row] && this.data[row][col] !== undefined) {
            return this.data[row][col];
        }
        return 0;
    }

    setElement(row, col, value) {
        if (!this.data[row]) {
            this.data[row] = {};
        }
        this.data[row][col] = value;
    }

    add(matrix) {
        if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
            throw new Error("Matrices must have the same dimensions for addition to perfom");
        }

        const result = new SparseMatrix(this.rows, this.cols);

        for (let row in this.data) {
            for (let col in this.data[row]) {
                result.setElement(parseInt(row), parseInt(col), this.getElement(row, col));
            }
        }

        for (let row in matrix.data) {
            for (let col in matrix.data[row]) {
                result.setElement(parseInt(row), parseInt(col), result.getElement(row, col) + matrix.getElement(row, col));
            }
        }

        return result;
    }

    subtract(matrix) {
        if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
            throw new Error("Matrices must have the same dimensions for subtraction to perfom");
        }

        const result = new SparseMatrix(this.rows, this.cols);

        for (let row in this.data) {
            for (let col in this.data[row]) {
                result.setElement(parseInt(row), parseInt(col), this.getElement(row, col));
            }
        }

        for (let row in matrix.data) {
            for (let col in matrix.data[row]) {
                result.setElement(parseInt(row), parseInt(col), result.getElement(row, col) - matrix.getElement(row, col));
            }
        }

        return result;
    }

    multiply(matrix) {
        if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
            throw new Error("Matrices must have the same dimensions for addition to perfom");
        }

        const result = new SparseMatrix(this.rows, this.cols);

        for (let row in this.data) {
            for (let col in this.data[row]) {
                result.setElement(parseInt(row), parseInt(col), this.getElement(row, col));
            }
        }

        for (let row in matrix.data) {
            for (let col in matrix.data[row]) {
                result.setElement(parseInt(row), parseInt(col), result.getElement(row, col) * matrix.getElement(row, col));
            }
        }

        return result;
    }

    toString() {
        let result = `rows=${this.rows}\ncols=${this.cols}\n`;
        for (let row in this.data) {
            for (let col in this.data[row]) {
                result += `(${row}, ${col}, ${this.data[row][col]})\n`;
            }
        }
        return result;
    }
}

module.exports = SparseMatrix;
