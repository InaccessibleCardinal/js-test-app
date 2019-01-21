export default function makeGetRequest() {
    let u = 'https://jsonplaceholder.typicode.com/todos';
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', u);
        xhr.onload = function() {
            if (xhr.status < 400) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject({error: `Request failed with status ${xhr.status}`});
            }
        }
        xhr.send();
    });
}
