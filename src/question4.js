import makeGetRequest from './utils/makeGetRequest';
import {create, render} from './utils/dom';

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
     
    If you don't remember all of the dom api, or just want to type less,
    two functions, create and render have been imported to help. They are explained below.
     */

    makeGetRequest()
        .then((data) => {

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
          
            });
            
        })
        .catch((e) => {
            console.log(e);
        });

}

/*
util functions: 
We are importing two simple functions called 'create' and 'render'.

    create(nodeName, value?) will make
    1) a dom element of type nodeName (nodeName is a string like 'p', 'div', 'ul' etc).
    2) if you pass in a value (a string or number), the innerHTML of the element will be that value.

    render(element) will put an element in the dom of our html page.
*/