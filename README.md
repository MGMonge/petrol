# JSUnit
A javascript unit testing tool inspired by the famous PHPUnit framework. This tool uses eclipse internally to run the tests.
If you don't feel confortable with the sintax of the javascript testing frameworks out there this package is for you

## Installation

```bash
npm install --save-dev js-unit
```

## Usage

### Create your test file
Create a file named ExampleTest.js in the project `tests/` directory:


```javascript
import TestCase from 'js-unit/core/TestCase';

export default class ExampleTest extends TestCase {

    /** @test */
    it_counts_the_elements_of_an_array() {
        let array = ['apples', 'bananas', 'oranges'];

        this.assertCount(3, array);
    }
}
```

### Run it

```bash
./node_modules/js-unit/bin/jsunit
```

JSUnit will run all files ending with `Test.js` in the specified directory, by default `tests/` directory.


## Documentation

### Structure of test files
All Tests files need to be an exportable ES2015 class and must extends the JSunit TestCase

```javascript
// SomeTest.js
import TestCase from 'js-unit/core/TestCase';

export default class SomeTest extends TestCase {}
```

JSUnit will run all the methods starting with the word `test` or with the block comment `/** @test */` above as an individual test.
```javascript
import TestCase from 'js-unit/core/TestCase';

export default class SomeTest extends TestCase {

	testFoo() {
    	// assertions here
    }

    /** @test */
    anotherTest() {
    	// assertions here
    }

    someOtherMethod() {
    	// this won't be run
    }

}
```

### Run test files individually

```bash
./node_modules/js-unit/bin/jsunit tests/SomeTest.js
```

### Filter tests
Run only `anotherTest()` from `SomeTest.js` file
```bash
./node_modules/js-unit/bin/jsunit tests/SomeTest.js:anotherTest
```

### Stop on failure
Stop running the tests after the first failure using the flag `--stop-on-failure` or `-f`
```bash
./node_modules/js-unit/bin/jsunit tests/ -f
```

### Assertions

**assertEquals(expected, actual [, message])**
Asserts that two variables are equal.

**assertNotEquals(expected, actual [, message])** Asserts that two variables are not equal.

**assertCount(expectedCount, haystack [, message])** Asserts the number of elements of an array.

**assertInstanceOf(expected, actual [, message])** Asserts that a variable is of a given type.

**assertSame(expected, actual [, message])** Asserts that two variables have the same type and value.
Used on objects, it asserts that two variables reference the same object.

**assertNotSame(expected, actual [, message])** Asserts that two variables do not have the same type and value.
Used on objects, it asserts that two variables do not reference the same object.

**assertTrue(condition [, message])** Asserts that a condition is true.

**assertFalse(condition [, message])** Asserts that a condition is false.

**assertObjectHasProperty(property, object [, message])** Asserts that an object has a specified property.

**assertObjectNotHasProperty(property, object [, message])** Asserts that an object does not have a specified property.

**assertContains(needle, string [, message])** Asserts that a string contains a needle.

**assertNotContains(needle, string [, message])** Asserts that a string does not contain a needle.

**expectsError(callback [, message])** Asserts that a script executed on callback throws an error.

### Example of assertions

```javascript
import TestCase from 'js-unit/core/TestCase';

export default class ExampleTest extends TestCase {

    /** @test */
    it_tests_some_stuff() {

        let object = {foo: 'bar'};
        class Foo {
        }

        let testClass = new Foo;

        this.assertInstanceOf(Foo, testClass);
        this.assertContains('world', 'Hello world!');
        this.assertNotContains('foo', 'Hello world!');
        this.assertNotEquals('foo', 'bar');
        this.assertNotSame(1, '1');
        this.assertEquals(1, '1');
        this.assertNotSame(object, {foo: 'bar'});
        this.assertEquals(object, {foo: 'bar'});
        this.assertSame(object, object);
        this.assertObjectHasProperty('foo', object);
        this.assertObjectNotHasProperty('bar', object);
        this.assertCount(3, [1, 2, 3]);

        this.expectsError(() => {
            throw new Error('Whoops!');
        });
    }

}
```

### Before & after hooks
JSUnit lets you register hooks that are run before and after your tests. This allows you to run setup and/or teardown code.

```javascript
import TestCase from 'js-unit/core/TestCase';

export default class SomeTest extends TestCase {

	before() {
    	// this will be run before the first test of the file
    }

    baforeEach() {
    	// this will be run before each test
    }

    after() {
    	// this will be run after the last test of the file
    }

    afterEach() {
    	// this will be run after the each test
    }

}
```

### Extend TestCase and create custom assertions
This example is using the Vue js sintax. see https://github.com/vuejs/vue

Lets say we have a vue component like this
```javascript
// ExampleComponent.js
export default {
    template: '<div></div>',

    data() {
        return {
            foo: 'bar'
        }
    }
}

```

To create custom assertions you will need:
1. Extend the TestCase
```javascript
// VueTestCase.js
import TestCase from 'js-unit/core/TestCase';
// Import some dependencies
import browserEnv from 'browser-env';
import Vue from 'vue/dist/vue.js';

class VueTestCase extends TestCase {
    before() {
        // This is only an example. This package is to mock the browser environment
        browserEnv();

        global.Vue = Vue;
    }

    assertDataEquals(expected, component) {
        this.assertEquals(expected, JSON.parse(JSON.stringify(component.$data)));
    }
}

export default VueTestCase;
```
2. Import your custom TestCase
```javascript
// ExampleComponentTest.js
import VueTestCase from './VueTestCase';
import ExampleComponent from './ExampleComponent';

export default class ExampleComponentTest extends VueTestCase {

    beforeEach() {
        this.SUT = new Vue(ExampleComponent).$mount();
    }

    /** @test */
    it_initializes_correctly() {

        let expected = {
            foo: 'bar'
        }

       this.assertDataEquals(expected, this.SUT);
    }
}
```


## License

Licensed using the [MIT license](http://opensource.org/licenses/MIT).

    Copyright (c) 2016 Maximiliano Monge <https://github.com/mgmonge>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

## Contributing

### Guidelines

1. All pull requests must have an open issue to reference the bug / change
2. All pull requests must include unit tests to ensure the change works as
   expected and to prevent regressions.

### Running the tests

In order to contribute, you'll need to checkout the source from GitHub and
install JSUnit's dependencies using npm:

```bash
git clone https://github.com/mgmonge/jsunit.git
npm install
```

JSUnit is unit tested using its own core and tests should be on the `/core-tests` folder. Run
the tests using the jsunit bash command:

```bash
./bin/jsunit core-tests/
```