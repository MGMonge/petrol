import BaseTestCase from "../core/BaseTestCase";

class TestCase extends BaseTestCase {

    /**
     * Asserts that a variable is of a given type.
     */
    assertInstanceOf(expected, actual, message = '') {
        this.assertConstructor(expected);
        this.assertObject(actual);

        let defaultMessage = `Expected object to be instance of [${expected.name}], ${actual.constructor.name} given ${message}`;

        this.assertTrue(actual instanceof expected, message || defaultMessage);
    }

    /**
     * Asserts the number of elements of an array.
     */
    assertCount(expectedCount, haystack, message = '') {
        this.assertInteger(expectedCount);

        if (typeof haystack.length == 'undefined') {
            fail('The second argument of assertCount() must have length property');
        }

        let defaultMessage = `Expected ${expectedCount} elements, but found ${haystack.length}`;

        this.assertEquals(haystack.length, expectedCount, message || defaultMessage);
    }

    /**
     * Asserts that two variables are equal.
     */
    assertEquals(expected, actual, message = '') {
        this.magicAssert.deepEqual(actual, expected, message);
    }

    /**
     * Asserts that two variables are not equal.
     */
    assertNotEquals(expected, actual, message = '') {
        return this.magicAssert.notDeepEqual(actual, expected, message);
    }

    /**
     * Asserts that two variables have the same type and value.
     * Used on objects, it asserts that two variables reference
     * the same object.
     */
    assertSame(expected, actual, message = '') {
        this.magicAssert.is(actual, expected, message);
    }

    /**
     * Asserts that two variables do not have the same type and value.
     * Used on objects, it asserts that two variables do not reference
     * the same object.
     */
    assertNotSame(expected, actual, message = '') {
        this.magicAssert.not(actual, expected, message);
    }

    /**
     * Asserts that a condition is true.
     */
    assertTrue(condition, message = '') {
        let defaultMessage = `Expected true, but got false`;

        this.assertEquals(condition, true, message || defaultMessage);
    }

    /**
     * Asserts that a condition is false.
     */
    assertFalse(condition, message = '') {
        let defaultMessage = `Expected false, but got true`;

        this.assertEquals(false, condition, message || defaultMessage);
    }

    /**
     * Asserts that an object has a specified property.
     */
    assertObjectHasProperty(property, object, message = '') {
        this.assertString(property);
        this.assertObject(object);

        let defaultMessage = `Property [${property}] was not found on object ${JSON.stringify(object)} ${message}`;

        this.assertTrue(typeof object[property] != 'undefined', message || defaultMessage);
    }

    /**
     * Asserts that an object does not have a specified property.
     */
    assertObjectNotHasProperty(property, object, message = '') {
        this.assertString(property);
        this.assertObject(object);

        let defaultMessage = `Property [${property}] was found on object ${JSON.stringify(object)} ${message}`;

        this.assertTrue(typeof object[property] == 'undefined', message || defaultMessage);
    }

    /**
     * Asserts that a string contains a needle.
     */
    assertContains(needle, string, message = '') {
        this.assertString(needle);
        this.assertString(string);

        let defaultMessage = `Expected '${string}' to contain '${needle}'`;

        this.assertTrue(string.includes(needle), message || defaultMessage);
    }

    /**
     * Asserts that a string does not contain a needle.
     */
    assertNotContains(needle, string, message = '') {
        this.assertString(needle);
        this.assertString(string);

        let defaultMessage = `Expected '${string}' to not contain '${needle}'`;

        this.assertFalse(string.includes(needle), message || defaultMessage);
    }

    /**
     * Asserts that a script executed on callback throws an error
     */
    expectsError(callback, message = '') {
        this.assertFunction(callback);

        let defaultMessage = 'Expected error has not been thrown';

        try {
            callback();

            fail(message || defaultMessage);
        } catch (e) {

        }
    }
}

export default TestCase;