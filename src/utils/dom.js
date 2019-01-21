export function create(nodeName, value) {

    let el = document.createElement(nodeName);
    if (value) {
        el.innerHTML = value;
    }
    return el;
}

export function render(el) {
    document.getElementById('app').innerHTML = '';
    document.getElementById('app').appendChild(el);
}

