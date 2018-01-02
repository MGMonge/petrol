import TestCase from '../core/TestCase';
import VueTestCase from '../core/VueTestCase';
import ExampleComponent from './fakes/ExampleComponent.vue';

export default class VueTestCaseTest extends TestCase {

    /** @test */
    it_mounts_an_instance_of_vue_wrapper_from_vue_test_utils()
    {
        //Arrange
        const vueTestCase = new VueTestCase

        //Act
        const wrapper = vueTestCase.mount(ExampleComponent)

        //Assert
        this.assertEquals('VueWrapper', wrapper.constructor.name)
    }

    /** @test */
    it_passes_props_correct_to_mounted_component()
    {
        //Arrange
        const vueTestCase = new VueTestCase

        //Act
        const wrapper = vueTestCase.mount(ExampleComponent, {
            message: 'This framework is great!'
        })

        //Assert
        this.assertEquals('This framework is great!', wrapper.vm.message)
    }

}
