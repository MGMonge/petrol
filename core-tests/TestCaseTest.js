import TestCase from '../core/TestCase';

export default class TestCaseTest extends TestCase {

    beforeEach() {
        this.failed = false;
    }

    /** @test */
    it_asserts_the_instance_of_an_object() {
        class Apple {
        }

        class Banana {
        }

        let object = new Apple();

        this.assertInstanceOf(Apple, object);

        try {
            this.assertInstanceOf(Banana, object);
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
    }

    /** @test */
    it_asserts_the_count_of_elements_in_array() {
        this.assertCount(2, ['apple', 'banana']);

        try {
            this.assertCount(3, ['apple', 'banana']);
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
    }

    /** @test */
    it_asserts_that_2_variables_are_equal() {
        let string = 'apple';
        let array = ['apple', 'banana'];

        this.assertEquals(string, 'apple');
        this.assertEquals(array, ['apple', 'banana']);

        try {
            this.assertEquals(string, 'banana');
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
        this.failed = false;

        try {
            this.assertEquals(array, ['apple']);
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
    }

    /** @test */
    it_asserts_that_2_variables_are_not_equal() {
        let string = 'apple';
        let array = ['apple', 'banana'];

        this.assertNotEquals(string, 'banana');
        this.assertNotEquals(array, ['apple']);

        try {
            this.assertNotEquals(string, 'apple');
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
        this.failed = false;

        try {
            this.assertNotEquals(array, ['apple', 'banana']);
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
    }

    /** @test */
    it_asserts_that_2_variables_are_the_same() {
        let number = 1;
        let object = {name: 'apple'}

        this.assertSame(1, number);
        this.assertSame(object, object);

        try {
            this.assertSame(number, '1');
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
        this.failed = false;

        try {
            this.assertSame(object, {name: 'apple'});
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
    }

    /** @test */
    it_asserts_that_2_variables_are_not_the_same() {
        let number = 1;
        let object = {name: 'apple'}

        this.assertNotSame(1, '1');
        this.assertNotSame(object, {name: 'apple'});

        try {
            this.assertNotSame(number, number);
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
        this.failed = false;

        try {
            this.assertNotSame(object, object);
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
    }

    /** @test */
    it_asserts_that_a_condition_is_true() {
        this.assertTrue(true);

        try {
            this.assertTrue(false);
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
    }

    /** @test */
    it_asserts_that_a_condition_is_false() {
        this.assertFalse(false);

        try {
            this.assertFalse(true);
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
    }

    /** @test */
    it_asserts_that_object_has_property() {
        let object = {name: 'apple'};

        this.assertObjectHasProperty('name', object);

        try {
            this.assertObjectHasProperty('color', object);
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
    }

    /** @test */
    it_asserts_that_object_does_not_have_property() {
        let object = {name: 'apple'};

        this.assertObjectNotHasProperty('color', object);

        try {
            this.assertObjectNotHasProperty('name', object);
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
    }

    /** @test */
    it_asserts_that_a_string_contains_a_needle() {
        let string = 'I eat apples';

        this.assertContains('apple', string);

        try {
            this.assertContains('banana', string);
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
    }

    /** @test */
    it_asserts_that_a_string_does_not_contains_a_needle() {
        let string = 'I eat apples';

        this.assertNotContains('banana', string);

        try {
            this.assertNotContains('apple', string);
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
    }

    /** @test */
    it_asserts_that_given_function_throws_an_error() {
        this.expectsError(() => {
            throw new Error('Whoops! there was an error');
        });

        try {
            this.expectsError(() => {
                // no error thrown
            });
        } catch (e) {
            this.failed = true;
            this.assertSame('AssertionError', e.name);
        }

        this.assertTrue(this.failed);
    }
}