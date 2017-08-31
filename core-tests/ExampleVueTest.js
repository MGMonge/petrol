import Example from "../Example.vue";
import VueTestCase from "../core/VueTestCase.js";

export default class ExampleVueTest extends VueTestCase {
    beforeEach() {
        this.SUT = this.mount(Example);
    }

    /** @test */
    it_displays_the_list_of_todos_with_completed_class() {
        this.SUT.todos = [
            {title: 'Do task 1', completed: true},
            {title: 'Do task 2', completed: false},
            {title: 'Do task 3', completed: false}
        ];

        this.nextTick(() => {
            this.assertElementExists('.todos');
            this.assertNumberOfElements('.todos li', 3);
            this.assertNumberOfElements('.todos li.completed', 1);
            this.assertElementContains('.todos li.completed', 'Do task 1');
            this.assertElementNotContains('.todos li.completed', 'Do task 2');
            this.assertElementNotContains('.todos li.completed', 'Do task 3');
            this.assertElementNotExists('.foobar');
        });
    }

    /** @test */
    async it_toggles_completed_state() {
        this.SUT.todos = [
            {title: 'Do task 1', completed: false},
        ];

        await this.nextTick();
        this.assertNumberOfElements('.todos li.completed', 0);

        this.click('.todos li:first-child');

        await this.nextTick();
        this.assertNumberOfElements('.todos li.completed', 1);

        this.click('.todos li:first-child');
        await this.nextTick();
        this.assertNumberOfElements('.todos li.completed', 0);
    }
}


<template>
    <div>
        <ul class="todos">
            <li v-on:click="toggle(todo)" class="todo-item" v-for="todo in todos" :class="{'completed' : todo.completed}">
                {{ todo.title }}
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                todos: []
            }
        },

        methods: {
            addTodo(title) {
                this.todos.push({title: title, completed: false})
            },

            toggle(todo) {
                todo.completed = !todo.completed;
            }
        }
    }
</script>

spoonit



https://github.com/MGMonge/jsunit/blob/images/successful_test.png
https://github.com/MGMonge/jsunit/blob/images/failing_test.png

add config file to set tests directory and other things
add "run" command
add "-v" option to show error stack 
add "-vv" option to show full error stuck (Jasmine, Vue error that were exclude)
improve "make" command, making it more clever

herbie

