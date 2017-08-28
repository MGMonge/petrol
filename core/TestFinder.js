import fs from 'fs';
import walk from 'esprima-walk';
let esprima = require('esprima');

class TestFinder {

    find(path) {
        return this.getTestMethods(fs.readFileSync(path).toString());
    }

    getTestMethods(content) {
        let testMethods = [];

        let ast = esprima.parse(content, {sourceType: 'module', ranges: true, attachComment: true});

        walk(ast, (node) => {
            if (node.type == 'MethodDefinition') {
                if (this.isTestMethod(node)) {
                    testMethods.push(node.key.name);
                }
            }
        });

        return testMethods;
    }

    isTestMethod(method) {
        let name = method.key.name;

        if (name.startsWith('test')) {
            return true;
        }

        if (!method.leadingComments) {
            return false;
        }

        return method.leadingComments.filter((comment) => comment.value.includes(' @test ')).length;
    }
}

export default TestFinder;