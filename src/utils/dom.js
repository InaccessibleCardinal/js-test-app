export function $id(id) {
    return document.getElementById(id);
}

export function create(nodeName, value) {
    let el = document.createElement(nodeName);
    if (value) {
        el.innerHTML = value;
    }
    return el;
}

export function appendTo(child, parent) {
    
    if (isDomElement(child) && isDomElement(parent)) {
        parent.appendChild(child);
    } else {
        console.error('Check the types of your arguments');
    }
    
}

export function attachEvent(eventType, element, callback) {
    
    if (typeof eventType === 'string' && isDomElement(element) && typeof callback === 'function') {
        element.addEventListener(eventType, callback);
    } else {
        console.error('Check the types of your arguments');
    }
    
}

export function render(el) {
    document.getElementById('app').appendChild(el);
}

function isDomElement(o) {
    return o instanceof HTMLElement;
}