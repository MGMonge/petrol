class BaseTestCase {

    before() {
        // override
    }

    after() {
        // override
    }

    beforeEach() {
        // override
    }

    afterEach() {
        // override
    }

    assertConstructor(value) {
        try {
            new value;
        } catch(e) {
            throw new Error(`Expected constructor, ${typeof value} given`);
        }
    }

    assertObject(value) {
        if (typeof value === 'object') {
            return true;
        }
        throw new Error(`Expected object, ${typeof value} given`);
    }

    assertInteger(value) {
        if (typeof value === 'number' && value == parseInt(value, 10)) {
            return true;
        }
        throw new Error(`Expected integer, ${typeof value} given`);
    }

    assertArray(value) {
        if (value instanceof Array) {
            return true;
        }
        throw new Error(`Expected array, ${typeof value} given`);
    }

    assertFunction(value) {
        if (typeof value === 'function') {
            return true;
        }
        throw new Error(`Expected function, ${typeof value} given`);
    }

    assertString(value) {
        if (typeof value === 'string') {
            return true;
        }
        throw new Error(`Expected string, ${typeof value} given`);
    }
}

export default BaseTestCase;