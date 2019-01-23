import {create, render} from './utils/dom';

export function question6() {

    /**
    MyButton is a class that makes a button and puts it in the dom.
    One passes to MyButton's constructor some text for the button text and 
    a callback that will fire when the button is clicked. However, we may 
    have many types of buttons, so we'd like to log some info about which 
    type of button is clicked.

    The below code almost works, but something went wrong. Try to fix this class so
    that when the button is clicked, both the logging and the callback are invoked 
    without errors. Note: the error message in the console is misleading.
    */

    class MyButton {

        constructor(text, callback) {
            this.name = 'MyButton';
            this.element = create('button', text);
            this.callback = callback;
            this.init();
        }

        init() {
            this.element.addEventListener('click', this.listener);
            render(this.element);
        }

        listener() {
            console.log(`${this.name} is invoking a callback.`);
            this.callback();
        }

    }

    function f() {
        console.log('Something for the button to do...');
    }

    let b = new MyButton('My Button', f);

}