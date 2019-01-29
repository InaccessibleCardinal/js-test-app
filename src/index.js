// import {question1} from './question1';
// import {question2} from './question2';
// import {question3} from './question3';
// import {question4} from './question4';
// import {question5} from './question5';
// import {question6} from './question6';
// import {question9} from './question9';
//import application from './application/';
import main from './actual-dom';

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', app);
    function app() {
        console.log('app is working...');
        // question1();
        // question2();
        // question3();
        // question4();
        // question5();
        //question9();
        //application();
        main();
    }
}

