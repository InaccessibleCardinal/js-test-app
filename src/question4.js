import makeGetRequest from './utils/makeGetRequest';
import {$id, create, render, appendTo, attachEvent} from './utils/dom';

export function question4() {
    /**
    Below uses the solution to question 3.
    This 'makeGetRequest' gets a list of "todos".
    We'd like to put those todos on the page. For each todo we want a 
    tag with that todo's 'title' as innerHTML and we'd like the 
    tag to respond to click events (logging its innerHTML to the 
    console would be fine). 
    There is a target div in the html page with id="app". 
    You can put dom elements in that div.

    Note: You might think about a strategy when adding event listeners. There are 200
    of these todos, and depending on how you do it, you could have 200 event listeners
    running in the app, or...you could have one.
     
    If you don't remember all of the dom api some functions have been imported to help.
    These dom utils are explained below.
     */

    function fn(e) {
        if (e.target.nodeName === 'LI') {
            console.log(e.target.innerHTML);
        }
        
    }
    makeGetRequest()
        .then((data) => {
            let app = $id('app');
            attachEvent('click', app, fn);
            data.forEach((todo) => {
            /*
                Each todo looks like this:
                {
                    "userId": i: number,
                    "id": j: number,
                    "title": s: string,
                    "completed": t: boolean
                }
                We just want the title. 
            */
                let li = create('li', todo.title);
                appendTo(li, app);
            });
            
        })
        .catch((e) => {
            console.log(e);
        });

}

/*
util functions: 
$id(id) //id: string; returns HTMLElement
shorthand for document.getElementById

create(nodeName, value?) // nodeName: string, value: string | number; returns HTMLELement
creates a dom element, and if a value is provided, that value is set as innerHTML

appendTo(child, parent) // child, parent: HTMLElement; returns void

attachEvent(eventType, element, callback) 
//eventType: string, element: HTMLElement, callback: function; returns void
Registers a callback function to handle an event on an element like 'addEventListener' 
or jQuery's 'on'

render(element) //element: HTMLElement; returns void
Puts an element in the <div id="app"> tag in the html file
*/