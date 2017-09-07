import TestCase from "./TestCase.js";
import Vue from "vue";
global.Vue = Vue;

class VueTestCase extends TestCase {

    mount(VueComponent, props = {}) {
        let Constructor = Vue.extend(VueComponent);

        this.mounted = new Constructor({propsData: props}).$mount();

        return this.mounted;
    }

    assertNumberOfElements(selector, expected) {
        let actual = this.findAll(selector);

        this.assertCount(expected, actual, `Expected ${expected} [${selector}] elements, but found ${actual.length}`);
    }

    assertElementContains(selector, needle) {
        let element = this.find(selector);

        this.assertContains(needle, element.innerHTML);
    }

    assertElementNotContains(selector, needle) {
        let element = this.find(selector);

        this.assertNotContains(needle, element.innerHTML);
    }

    assertElementExists(selector) {
        this.find(selector);
    }

    assertElementNotExists(selector) {
        this.assertNumberOfElements(selector, 0);
    }

    click(selector) {
        let element = this.find(selector);

        this.dispatchEvent(element, 'click');
    }

    fillField(selector, value) {
        let element = this.find(selector);

        if (!this.isInput(element) && !this.isTextarea(element)) {
            fail(`Element [${selector}] must be an input or textarea`);
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
        let element = this.find(selector);

        if (!this.isCheckbox(element)) {
            fail(`Element [${selector}] must be a checkbox`);
        }

        element.checked = true;

        this.dispatchEvent(element, 'change');
    }

    uncheckOption(selector) {
        let element = this.find(selector);

        if (!this.isCheckbox(element)) {
            fail(`Element [${selector}] must be a checkbox`);
        }

        element.checked = false;

        this.dispatchEvent(element, 'change');
    }

    selectOption(selector, value) {
        let element = this.find(selector);

        if (!this.isSelect(element) && !this.isRadio(element)) {
            fail(`Element [${selector}] must be a selector or a radio button`);
        }

        let options = this.isSelect(element) ? element.querySelectorAll('option') : this.findAll(selector);
        let availableOptions = [];
        let selectedOption = null;

        for (let i = 0; i < options.length; i++) {

            if (this.isRadio(element) && !this.isRadio(options[i])) {
                continue;
            }

            if (options[i].value == value) {
                selectedOption = options[i].value;

                if (this.isSelect(element)) {
                    options[i].selected = true;
                } else {
                    options[i].checked = true;
                }

                this.dispatchEvent(element, 'change');
            }

            availableOptions.push(`'${options[i].value}'`);
        }

        if (selectedOption == null) {
            fail(`Option '${value}' not found on [${selector}] element. Available options: ${availableOptions.join(', ')}`);
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
        return this.mounted.$el.querySelectorAll(selector);
    }

    find(selector) {
        let element = this.mounted.$el.querySelector(selector);

        if (!element) {
            fail(`Element [${selector}] was not found`);
        }

        return element;
    }

    nextTick() {
        this.SUT.$nextTick();
    }
}

export default VueTestCase;
