# sparsematrix


A JavaScript implementation of a sparse matrix with support for addition, subtraction, and multiplication. The matrix is stored as a sparse representation using an object of objects.

## Installation

Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/sparsematrix.git
cd sparsematrix
# Usage
# Matrix File Format
# Matrix files should be formatted as follows:
```
rows=<number_of_rows>
cols=<number_of_cols>
(row1, col1, value1)
(row2, col2, value2)
...
# Running the Program
To run the program, use the following command:
```
node index.js
```
You will be prompted to enter the operation (add, subtract, multiply) and the paths for the two matrix files.

# Example Interaction
```
Enter the operation (add, subtract, multiply): add
Enter the path for the first matrix file: matrix1.txt
Enter the path for the second matrix file: matrix2.txt
Result:
rows=3
cols=3
(0, 1, 5)
(1, 2, 8)
(2, 0, 3)
```

Here's a detailed README.md file for your SparseMatrix project:

markdown
Copy code
# SparseMatrix

A JavaScript implementation of a sparse matrix with support for addition, subtraction, and multiplication. The matrix is stored as a sparse representation using an object of objects.

## Installation

Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/sparsematrix.git
cd sparsematrix
Install the necessary dependencies (if any):

bash
Copy code
npm install
Usage
Matrix File Format
Matrix files should be formatted as follows:

makefile
Copy code
rows=<number_of_rows>
cols=<number_of_cols>
(row1, col1, value1)
(row2, col2, value2)
...
Example:

scss
Copy code
rows=3
cols=3
(0, 1, 5)
(1, 2, 8)
(2, 0, 3)
Running the Program
To run the program, use the following command:

bash
Copy code
node index.js
You will be prompted to enter the operation (add, subtract, multiply) and the paths for the two matrix files.

Example Interaction
sql
Copy code
Enter the operation (add, subtract, multiply): add
Enter the path for the first matrix file: matrix1.txt
Enter the path for the second matrix file: matrix2.txt
Result:
rows=3
cols=3
(0, 1, 5)
(1, 2, 8)
(2, 0, 3)
# Example Matrix Files
# matrix1.txt
```
rows=3
cols=3
(0, 0, 1)
(1, 1, 2)
(2, 2, 3)
```
# matrix2.txt
```
rows=3
cols=3
(0, 0, 4)
(1, 1, 5)
(2, 2, 6)
```
#Running the Addition Operation
```
Enter the operation (add, subtract, multiply): add
Enter the path for the first matrix file: matrix1.txt
Enter the path for the second matrix file: matrix2.txt
Result:
rows=3
cols=3
(0, 0, 5)
(1, 1, 7)
(2, 2, 9)
```
# Functions
`SparseMatrix` 
constructor(rows, cols): Initializes a new sparse matrix with the given number of rows and columns.
static fromFile(filePath): Reads a sparse matrix from a file and returns a SparseMatrix instance.
getElement(row, col): Returns the value at the specified row and column.
setElement(row, col, value): Sets the value at the specified row and column.
add(matrix): Adds the current matrix with another matrix and returns the result.
subtract(matrix): Subtracts another matrix from the current matrix and returns the result.
multiply(matrix): Multiplies the current matrix with another matrix and returns the result.
toString(): Returns a string representation of the matrix.

AUTHOR
Joan keza

