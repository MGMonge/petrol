import TestCase from '../core/TestCase';
import VueTestCase from '../core/VueTestCase';
import ExampleComponent from './fakes/ExampleComponent.vue';

export default class VueTestCaseTest extends TestCase {

    /** @test */
    it_mounts_an_instance_of_vue_wrapper_from_vue_test_utils() {
        const vueTestCase = new VueTestCase

        const wrapper = vueTestCase.mount(ExampleComponent)

        this.assertEquals('VueWrapper', wrapper.constructor.name)
    }

    /** @test */
    it_passes_props_correct_to_mounted_component() {
        const vueTestCase = new VueTestCase

        const wrapper = vueTestCase.mount(ExampleComponent, {
            message: 'This framework is great!'
        })

        this.assertEquals('This framework is great!', wrapper.vm.message)
    }

    /** @test */
    it_can_find_an_element() {
        const vueTestCase = new VueTestCase
        vueTestCase.mount(ExampleComponent)

        const element = vueTestCase.find('ul')

        this.assertEquals('HTMLUListElement', element.constructor.name)
    }

    // How to test failure when fail method is running inside of VueTestCase...
    // Feel like it shoudl throw an error in VueTestCase and allow user to handle
    // /** @test */
    // it_throws_an_error_when_it_can_not_find_an_element() {
    //     const vueTestCase = new VueTestCase
    //     vueTestCase.mount(ExampleComponent)

    //     try {
    //         const element = vueTestCase.find('invalid')
    //     } catch (error) {
    //         this.assertEquals('Failed: Element [invalid] was not found', error.message)
    //     }
    // }

    /** @test */
    it_can_find_all_elements() {
        const vueTestCase = new VueTestCase
        vueTestCase.mount(ExampleComponent)

        const elements = vueTestCase.findAll('li')

        this.assertEquals('NodeList', elements.constructor.name)
        this.assertCount(3, elements)
    }

    /** @test */
    it_can_go_to_the_next_dom_cycle() {
        const vueTestCase = new VueTestCase
        const wrapper = vueTestCase.mount(ExampleComponent)

        vueTestCase.nextTick()
    }
}