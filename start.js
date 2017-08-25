import TestFinder from './core/TestFinder';
import 'colors';

let finder = new TestFinder;

jasmine.stopSpecOnExpectationFailure = true;

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
                    instance[method]();
                });
            });
        });

    } catch (e) {
        console.log(`Couldn't read file [${file}]`.red);
        console.log(e);
        process.exit();
    }
});