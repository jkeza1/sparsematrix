const readline = require('readline');
const fs = require('fs');
const path = require('path');
const SparseMatrix = require('./SparseMatrix');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    rl.question("Enter the operation (add, subtract, multiply): ", function(operation) {
        rl.question("Enter the path for the first matrix file: ", function(firstPath) {
            rl.question("Enter the path for the second matrix file: ", function(secondPath) {
                try {
                    const matrix1 = SparseMatrix.fromFile(firstPath);
                    const matrix2 = SparseMatrix.fromFile(secondPath);

                    let result;
                    switch (operation.toLowerCase()) {
                        case 'add':
                            result = matrix1.add(matrix2);
                            break;
                        case 'subtract':
                            result = matrix1.subtract(matrix2);
                            break;
                        case 'multiply':
                            result = matrix1.multiply(matrix2);
                            break;
                        default:
                            console.log("Invalid operation");
                            rl.close();
                            return;
                    }

                    console.log("Result:");
                    console.log(result.toString());

                    const outputDir = './results';
                    if (!fs.existsSync(outputDir)) {
                        fs.mkdirSync(outputDir);
                    }

                    const outputFile = path.join(outputDir, 'result.txt');
                    fs.writeFileSync(outputFile, result.toString(), 'utf8');
                    console.log(`Result saved to ${outputFile}`);
                } catch (error) {
                    console.error(error.message);
                }
                rl.close();
            });
        });
    });
}

promptUser();
