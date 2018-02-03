import TestCase from "./TestCase.js";
import { mount } from 'vue-test-utils';

class VueTestCase extends TestCase {

    mount(VueComponent, props = {}) {
        this.wrapper = mount(VueComponent, {
            propsData: props
        })

        return this.wrapper;
    }

    assertNumberOfElements(selector, expected) {
        let actual = this.findAll(selector);

        this.assertCount(expected, actual, `Expected ${expected} [${selector}] elements, but found ${actual.length}`);
    }

    assertElementContains(selector, needle) {
        let wrapper = this.find(selector);

        this.assertContains(needle, wrapper.html());
    }

    assertElementNotContains(selector, needle) {
        let wrapper = this.find(selector);

        this.assertNotContains(needle, wrapper.html());
    }

    assertElementExists(selector) {
        this.find(selector);
    }

    assertElementNotExists(selector) {
        this.assertNumberOfElements(selector, 0);
    }

    click(selector) {
        this.find(selector).trigger('click');
    }

    fillField(selector, value) {
        let wrapper = this.find(selector);
        let element = wrapper.element;

        if (!this.isInput(element) && !this.isTextarea(element)) {
            throw new Error(`Element [${selector}] must be an input or textarea`);
        }

        element.value = '';

        for (let character of value) {
            this.dispatchEvent(element, 'keydown');
            element.value += character;
            this.dispatchEvent(element, 'keypress');
            this.dispatchEvent(element, 'keyup');
        }

        this.dispatchEvent(element, 'change');
        this.dispatchEvent(element, 'input');

    }

    checkOption(selector) {
        let wrapper = this.find(selector);

        if (!this.isCheckbox(wrapper.element)) {
            fail(`Element [${selector}] must be a checkbox`);
        }

        wrapper.element.checked = true;

        wrapper.trigger('change');
    }

    uncheckOption(selector) {
        let wrapper = this.find(selector);

        if (!this.isCheckbox(wrapper.element)) {
            throw new Error(`Element [${selector}] must be a checkbox`);
        }

        wrapper.element.checked = false;

        wrapper.trigger('change');
    }

    selectOption(selector, value) {
        let wrapper = this.find(selector);
        let element = wrapper.element;

        if (!this.isSelect(element) && !this.isRadio(element)) {
            fail(`Element [${selector}] must be a selector or a radio button`);
        }

        let options = this.isSelect(element) ? wrapper.findAll('option') : this.findAll(selector);

        let availableOptions = [];
        let selectedOption = null;

        for (let i = 0; i < options.length; i++) {

            if (this.isRadio(element) && !this.isRadio(options.wrappers[i].element)) {
                continue;
            }

            if (options.wrappers[i].element.value == value) {
                selectedOption = options.wrappers[i].element.value;

                if (this.isSelect(element)) {
                    options.wrappers[i].element.selected = true;
                } else {
                    options.wrappers[i].element.checked = true;
                }

                wrapper.trigger('change');
            }

            availableOptions.push(`'${options.wrappers[i].element.value}'`);
        }

        if (selectedOption == null) {
            throw new Error(`Option '${value}' not found on [${selector}] element. Available options: ${availableOptions.join(', ')}`);
        }
    }

    isText(element) {
        return this.isInput(element) && element.type.toLowerCase() == 'text';
    }

    isRadio(element) {
        return this.isInput(element) && element.type.toLowerCase() == 'radio';
    }

    isCheckbox(element) {
        return this.isInput(element) && element.type.toLowerCase() == 'checkbox';
    }

    isInput(element) {
        return element && element.tagName == 'INPUT';
    }

    isSelect(element) {
        return element && element.tagName == 'SELECT';
    }

    isTextarea(element) {
        return element && element.tagName == 'TEXTAREA';
    }

    dispatchEvent(element, name) {
        var event = document.createEvent("HTMLEvents");

        event.initEvent(name, true, true);

        element.dispatchEvent(event);
    }

    findAll(selector) {
        return this.wrapper.findAll(selector);
    }

    find(selector) {
        let element = this.wrapper.find(selector);

        if (!element) {
            throw new Error(`Element [${selector}] was not found`);
        }

        return element;
    }

    nextTick(callback) {
        this.wrapper.vm.$nextTick(callback);
    }
}

export default VueTestCase;