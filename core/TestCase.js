import BaseTestCase from '../core/BaseTestCase';
import assert from 'assert';

class TestCase extends BaseTestCase {

    /**
     * Asserts that a variable is of a given type.
     */
    assertInstanceOf(expected, actual, message = '') {
        this.assertConstructor(expected);
        this.assertObject(actual);

        assert(actual instanceof expected, `Expected object to be instance of [${expected.name}], ${actual.constructor.name} given ${message}`);
    }

    /**
     * Asserts the number of elements of an array.
     */
    assertCount(expectedCount, haystack, message = '') {
        this.assertInteger(expectedCount);
        this.assertArray(haystack);

        assert(haystack.length == expectedCount, `Expected ${expectedCount} elements, but found ${haystack.length}. ${message}`);
    }

    /**
     * Asserts that two variables are equal.
     */
    assertEquals(expected, actual, message = '') {
        if (typeof actual == 'object') {
            return this.magicAssert.deepEqual(actual, expected, message);
        }

        this.magicAssert.is(actual, expected, message);
    }

    /**
     * Asserts that two variables are not equal.
     */
    assertNotEquals(expected, actual, message = '') {
        if (typeof actual == 'object') {
            return this.magicAssert.notDeepEqual(actual, expected, message);
        }

        this.magicAssert.not(actual, expected, message);
    }

    /**
     * Asserts that two variables have the same type and value.
     * Used on objects, it asserts that two variables reference
     * the same object.
     */
    assertSame(expected, actual, message = '') {
        this.assertEquals(expected, actual);

        if (actual instanceof Array) {
            return assert.deepStrictEqual(actual, expected, message);
        }

        assert.strictEqual(actual, expected, message);
    }

    /**
     * Asserts that two variables do not have the same type and value.
     * Used on objects, it asserts that two variables do not reference
     * the same object.
     */
    assertNotSame(expected, actual, message = '') {
        if (actual instanceof Array) {
            return assert.notDeepStrictEqual(actual, expected, message);
        }

        assert.notStrictEqual(actual, expected, message);
    }

    /**
     * Asserts that a condition is true.
     */
    assertTrue(condition, message = '') {
        assert.equal(!!condition, true, message);
    }

    /**
     * Asserts that a condition is false.
     */
    assertFalse(condition, message = '') {
        assert.equal(!!condition, false, message);
    }

    /**
     * Asserts that an object has a specified property.
     */
    assertObjectHasProperty(property, object, message = '') {
        this.assertString(property);
        this.assertObject(object);

        assert(typeof object[property] != 'undefined', `Property [${property}] was not found on object ${JSON.stringify(object)} ${message}`);
    }

    /**
     * Asserts that an object does not have a specified property.
     */
    assertObjectNotHasProperty(property, object, message = '') {
        this.assertString(property);
        this.assertObject(object);

        assert(typeof object[property] == 'undefined', `Property [${property}] was found on object ${JSON.stringify(object)} ${message}`);
    }

    /**
     * Asserts that a string contains a needle.
     */
    assertContains(needle, string, message = '') {
        this.assertString(needle);
        this.assertString(string);

        assert(string.includes(needle), `'${needle}' was not found in '${string}' ${message}`);
    }

    /**
     * Asserts that a string does not contain a needle.
     */
    assertNotContains(needle, string, message = '') {
        this.assertString(needle);
        this.assertString(string);

        assert(!string.includes(needle), `'${needle}' was found in '${string}' ${message}`);
    }

    /**
     * Asserts that a script executed on callback throws an error
     */
    expectsError(callback, message = '') {
        this.assertFunction(callback);

        assert.throws(() => callback(), Error, message);
    }
}

export default TestCase;