import TestCase from "./TestCase.js";
import Vue from "vue";
global.Vue = Vue;

class VueTestCase extends TestCase {

    mount(VueComponent, props = {}) {
        let Constructor = Vue.extend(VueComponent);

        this.mounted = new Constructor({ propsData: props }).$mount();

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
        var event = document.createEvent("HTMLEvents");

        event.initEvent('click', true, true);

        let element = this.find(selector);

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
