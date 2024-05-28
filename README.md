# sparsematrix
A JavaScript implementation of a sparse matrix with support for addition, subtraction, and multiplication. The matrix is stored as a sparse representation using an object of objects.

## Installation

Clone this repository to your local machine:

```bash
git clone https://github.com/jkeza1/sparsematrix.git
```
```bash
cd sparsematrix
```
# Usage
# Matrix File Format
# Matrix files should be formatted as follows:
```bash
rows=<number_of_rows>
cols=<number_of_cols>
(row1, col1, value1)
(row2, col2, value2)
...
```
# Running the Program
To run the program, use the following command:
```bash
node index.js
```
You will be prompted to enter the operation (add, subtract, multiply) and the paths for the two matrix files.

# Example Interaction
```bash
Enter the operation (add, subtract, multiply): add
Enter the path for the first matrix file: matrix1.txt
Enter the path for the second matrix file: matrix2.txt
```

Result:
```bash
rows=3
cols=3
(0, 1, 5)
(1, 2, 8)
(2, 0, 3)
```

# Functions
`SparseMatrix` 
- `constructor(rows, cols):` Initializes a new sparse matrix with the given number of rows and columns.

- `static fromFile(filePath):` Reads a sparse matrix from a file and returns a SparseMatrix instance.

- `getElement(row, col):` Returns the value at the specified row and column.

- `setElement(row, col, value):` Sets the value at the specified row and column.

- `add(matrix):` Adds the current matrix with another matrix and returns the result.

- `subtract(matrix):` Subtracts another matrix from the current matrix and returns the result.

- `multiply(matrix):` Multiplies the current matrix with another matrix and returns the result.

- `toString():` Returns a string representation of the matrix.

# AUTHOR
Joan keza

