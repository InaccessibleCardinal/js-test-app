

export default function main() {
    let app = $id('app');

    let h1 = create('h1', 'Some Headline', {'class': 'headline'});
    update(h1);
    
    let h2 = create('h1', 'Some <a>other</a> headline', {'class': 'headline'});
    let b = create('button', 'change');
    b.addEventListener('click', function() {
        update(h2, h1);
    });
    document.body.appendChild(b)

    function $id(id) {
        return document.getElementById(id);
    }

    function create(nodeName, text, attrs) {
        let el = document.createElement(nodeName);
        if (text) {
           el.innerHTML = text;
        }
        if (attrs) {
            for (let a in attrs) {
                if (attrs.hasOwnProperty(a)) {
                    el.setAttribute(a, attrs[a]);
                }
            }
        }
        return el;
    }

    function update(newEl, oldEl, parent = app) {
        
        if (newEl && !oldEl) {

            parent.appendChild(newEl);

        } else if (!newEl && oldEl) {

            parent.removeChild(oldEl);

        } else if (newEl && oldEl) {

            let {
                attributes: newAttributes, 
                children: newChildren, 
                childNodes: newChildNodes, 
                tagName: newTagName
            } = newEl;
            let {
                attributes: oldAttributes, 
                children: oldChildren,
                childNodes: oldChildNodes, 
                tagName: oldTagName
            } = oldEl;

            if (newTagName !== oldTagName) {
                //new tagName -> blowout original 
                parent.replaceChild(newEl, oldEl);
                return;
            } else if (XOR(newAttributes, oldAttributes)) {
                //attrs vs no attrs -> blowout original
                parent.replaceChild(newEl, oldEl);
                return;

            } else if (newAttributes && oldAttributes) {
                //diff attrs
                if (differentAttrs(newAttributes, oldAttributes)) {

                    parent.replaceChild(newEl, oldEl);
                    return void 0;

                } else if (XOR(newChildren, oldChildren)) {
                //children vs no children
                    parent.replaceChild(newEl, oldEl);
                    return;

                } else if (newChildren && oldChildren) {

                    if (newChildren.length !== oldChildren.length) {
                    //this is too strong
                        parent.replaceChild(newEl, oldEl);
                        return;
                    } else {

                        repeatOnChildren(newChildren, oldChildren, oldEl);

                    }

                }

            } else if (!newAttributes && !oldAttributes) {
                //recurse on children
                if (XOR(newChildren, oldChildren)) {

                    parent.replaceChild(newEl, oldEl);
                    return;

                } else if (newChildren && oldChildren) { 

                    if (newChildren.length !== oldChildren.length) {
                    //this is too strong
                        parent.replaceChild(newEl, oldEl);
                        return;
                    } else {

                        repeatOnChildren(newChildren, oldChildren, oldEl);

                    }
                }
     
            }
        }
    }

    function differentAttrs(newAttributes, oldAttributes) {
        let newA = genAttrsObj(newAttributes);
        let oldA = genAttrsObj(oldAttributes);
        let difference = false;
        for (let a1 in newA) {
            if (newA.hasOwnProperty(a1)) {

                if (newA[a1] !== oldA[a1]) {
                    difference = true;
                }
            }
        }
        for (let a2 in oldA) {
            if (oldA.hasOwnProperty(a2)) {
                if (oldA[a2] !== newA[a2]) {
                    difference = true;
                }
            }
        }
        return difference;
    }

    function genAttrsObj(attrs) {
        let o = {};
        let l = attrs.length;
        for (let i = 0; i < l; ++i) {
            o[attrs[i].nodeName] = attrs[i].nodeValue;
        }
        return o;
    }

    function repeatOnChildren(newChildren, oldChildren, parent) {
        let l = newChildren.length;
        for (let i = 0; i < l; ++i) {
            update(newChildren[i], oldChildren[i], parent);
        }   
    }

    function XOR(v1, v2) {
        return (
            (v1 && !v2) || (!v1 && v2)
        );
    }

}

/*
console.log('new children: ', newChildren)
console.log('whats in newEl: ', newEl.childNodes)
console.log('old children: ', oldChildren)
console.log('new attrs: ', newAttributes)
console.log('old attrs: ', oldAttributes)
*/

// console.log('nc: ', newChildren.length)
// console.log('oc: ', oldChildren.length)
// console.log('nc: ', newEl.childNodes)
// console.log('oc: ', oldEl.childNodes)