import {question1} from './question1';
import {question2} from './question2';
import {question3} from './question3';
import {question4} from './question4';
import {question5} from './question5';
import {question6} from './question6';

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', app);
    function app() {
        console.log('app is working...');
        question1();
        question2();
        question3();
        question4();
        question5();
        //question6(); //uncomment to work question 6
    }
}

