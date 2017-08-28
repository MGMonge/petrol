import TestCase from "./TestCase.js";
import Vue from "vue";
global.Vue = Vue;

class VueTestCase extends TestCase {
    mount(VueComponent) {
        this.mounted = new Vue(VueComponent).$mount();

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
}

export default VueTestCase;
