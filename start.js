import TestFinder from './core/TestFinder';
import 'colors';

let finder = new TestFinder;

console.log(`Running tests...\n`);

petrol.files.forEach((file) => {
    try {
        let testMethods = finder.find(file);
        let TestCases = new require(file).default;
        let instance = new TestCases;

        if (petrol.filter) {
            testMethods = testMethods.filter(method => method.includes(petrol.filter));
        }

        // Temp hack to get transitions on jsdom working, till jsdom implements a proper fix
        window.getComputedStyle = () => {
            return {
                transitionDelay: '',
                animationDelay: '',
                transitionDuration: '',
                animationDuration: '',
            };
        };

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