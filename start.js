import TestFinder from './core/TestFinder';
import 'colors';

let finder = new TestFinder;

console.log(`Running tests...\n`);

jsunit.files.forEach((file) => {
    try {
        let testMethods = finder.find(file);
        let TestCases = new require(file).default;
        let instance = new TestCases;

        if (jsunit.filter) {
            testMethods = testMethods.filter(method => method.includes(jsunit.filter));
        }

        describe(file.replace(process.cwd(), ''), () => {
            beforeAll(() => instance.before());
            beforeEach(() => instance.beforeEach());
            afterEach(() => instance.afterEach());
            afterAll(() => instance.after());

            testMethods.forEach((method) => {
                it(method, () => {
                    let test = instance[method]();

                    if (test instanceof Promise) {
                        test.catch((error) => {
                            fail(error);
                        })
                    }
                });
            });
        });

    } catch (e) {
        console.log(`Couldn't read file [${file}]`.red);
        console.log(e);
        process.exit();
    }
});