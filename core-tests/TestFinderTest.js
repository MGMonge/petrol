import TestCase from '../core/TestCase';
import TestFinder from '../core/TestFinder';

export default class TestFinderTest extends TestCase {

    beforeEach() {
        this.SUT = new TestFinder;
    }

    /** @test */
    it_gets_methods_starting_with_test() {

        let classContent = `
            import TestCase from '../core/TestCase';

            export default class Foo {

                method1() {}

                testMethod2() {}

                test_method_3() {}
            }
        `;

        let expected = ['testMethod2', 'test_method_3'];

        this.assertEquals(expected, this.SUT.getTestMethods(classContent));
    }

    /** @test */
    it_gets_methods_with_comment_block_test() {
        let classContent = `
            class Foo {
                /** @test **/
                method1() {}

                method2() {}

                /**  @test  **/
                method3() {}

                /** @testBar
                @testBar **/
                method4() {}

                /**test**/
                method5() {}
            }
        `;

        let expected = ['method1', 'method3'];

        this.assertEquals(expected, this.SUT.getTestMethods(classContent));
    }

    /** @test */
    it_throws_an_exception_when_content_is_invalid() {
        let classContent = `
            {

                method1() {}

                testMethod2() {}

                test_method_3() {}
            }
        `;

        this.expectsError(() => this.SUT.getTestMethods(classContent));
    }
}
