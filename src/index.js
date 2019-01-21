import {question1} from './question1';
import {question2} from './question2';
import {question3} from './question3';
import { question4 } from './question4';

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', app);
    function app() {
        console.log('app is working...');
        question1();
        question2();
        question3();
        question4();
    }
}

