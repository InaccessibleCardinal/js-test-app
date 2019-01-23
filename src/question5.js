export function question5() {

    /**
    Below is a function for making network requests
    but we don't like its api
    We'd rather be able to use makeGetRequest like this:

    makeGetRequest(url).then(
        (response) => {
            //do something with the response
        },
        (error) => {
            //do something with the error
        }
    );

    So the object of this exercise is to make this function "thenable"
    and to get data from it.
    */
    function makeGetRequest(url) {


        let req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onload = function() {
            if (req.status < 400) {
                //success, do something with data
                //hint: this api has req.responseText
                //warning: req.responseText is a string, not json "out of the box"
                
            } else {
                //failure, handle this
               
            }
        }
        req.send();

    }

    //test it:
    //here's a url you can use: 
    let u = 'https://jsonplaceholder.typicode.com/todos';

    //makeGetRequest(u).then((r) => console.log(r)).catch((e) => console.log(e));

}