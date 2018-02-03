import TestCase from '../core/TestCase';
import VueTestCase from '../core/VueTestCase';
import ExampleComponent from './fakes/ExampleComponent.vue';

export default class VueTestCaseTest extends TestCase {

    /** @test */
    it_mounts_an_instance_of_vue_wrapper_from_vue_test_utils() {
        const SUT = new VueTestCase;

        const wrapper = SUT.mount(ExampleComponent);

        this.assertInstanceOf('VueWrapper', wrapper);
    }

    /** @test */
    it_passes_props_correct_to_mounted_component() {
        const SUT = new VueTestCase;

        const wrapper = SUT.mount(ExampleComponent, {
            message: 'This framework is great!'
        })

        this.assertEquals('This framework is great!', wrapper.vm.message);
    }

    /** @test */
    it_can_find_an_element() {
        const SUT = new VueTestCase;

        SUT.mount(ExampleComponent);

        const actual = SUT.find('ul');

        this.assertInstanceOf('Wrapper', actual);
        this.assertInstanceOf('HTMLUListElement', actual.element);
    }

    /** @test */
    it_throws_an_error_when_it_can_not_find_an_element() {
        const SUT = new VueTestCase;

        SUT.mount(ExampleComponent);

        try {
            const element = SUT.find('invalid');
        } catch (error) {
            this.assertEquals('Element [invalid] was not found', error.message);
        }
    }

    /** @test */
    it_can_find_all_elements() {
        const SUT = new VueTestCase;

        SUT.mount(ExampleComponent);

        const actual = SUT.findAll('li');

        this.assertInstanceOf('WrapperArray', actual);
        this.assertCount(3, actual);

        for(let wrapper of actual.wrappers) {
            this.assertInstanceOf('Wrapper', wrapper);
            this.assertInstanceOf('HTMLLIElement', wrapper.element);
        }
    }
}