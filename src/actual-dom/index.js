const OBJECT = '[object Object]';
const ARRAY = '[object Array]';
const STRING = '[object String]';
const NUMBER = '[object Number]';
const FUNCTION = '[object Function]';
const NULL = '[object Null]';
const UNDEFINED = '[object Undefined]';
const PROMISE = '[object Promise]';
function getType(o) {
    return Object.prototype.toString.call(o);
}

export default function main() {
    let app = $id('app');
    let l1 = [
        {name: 'ken', id: 'p1'},
        {name: 'jen', id: 'p2'},
        {name: 'jo', id: 'p3'},
        {name: 'sam', id: 'p4'},
        {name: 'jill', id: 'p6'},
    ];
    let l2 = [
        {name: 'benny', id: 'p7'},
        {name: 'jen', id: 'p2'},
        {name: 'jimmy', id: 'p5'},
        {name: 'sam', id: 'p4'},
        {name: 'jill', id: 'p6'},
        {name: 'dan', id: 'p8'}
    ];
    let list1 = l1.map((p) => create('li', null, p.name));
    let list2 = l2.map((p) => create('li', null, p.name));

    let ul1 = create('ul', {'class': 'headline'}, list1);
    update(ul1);
    
    let ul2 = create('ul', {'class': 'headline'}, list2);
    
    let b = create('button', null, 'change');
    b.addEventListener('click', function() {
        update(ul2, ul1);
    });
    document.body.appendChild(b)

    function $id(id) {
        return document.getElementById(id);
    }

    function create(nodeName, attrs, children) {
        let el = document.createElement(nodeName);
        if (children) {

            if ([STRING, NUMBER].indexOf(getType(children)) > -1) {
                el.innerHTML = children;
            } else if (getType(children) === ARRAY) {
                children.forEach((c) => el.appendChild(c));
            } 
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

    let Q = [];
    function update(newEl, oldEl, parent = app, index = 0) {
        
        if (newEl && !oldEl) {

            parent.appendChild(newEl);
            return void 0;

        } else if (!newEl && oldEl) {

            parent.removeChild(oldEl);
            return void 0;

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
                return void 0;

            } else if (differentAttrs(newAttributes, oldAttributes)) {

                setTimeout(() => parent.replaceChild(newEl, oldEl), 0);
                return void 0;

            } else if (differentChildren(newChildren, oldChildren)) {

                setTimeout(() => parent.replaceChild(newEl, oldEl), 0);
                return void 0;

            } else {

                if (newChildren.length === 0 || oldChildren.length === 0) {
                    console.log('index: ', index)
                    // console.log('newEl innerHTML differs: ', newEl.innerHTML !== oldEl.innerHTML)
                    // console.log('oldEl: ', oldEl)
                    // console.log('parent: ', parent)
                    if (newEl.innerHTML !== oldEl.innerHTML) {
                        Q.push({
                            parent, 
                            fresh: newEl, 
                            stale: parent.children[index]
                        });
                        //lol dont do this
                        setTimeout(() => {
                            // Q.forEach((change) => {
                            //     let {parent, fresh, stale} = change;
                            //     parent.replaceChild(fresh, stale);
                            // });
                            parent.replaceChild(newEl, parent.children[index])
                        }, 0);
                    }

                }

                repeatOnChildren(newChildren, oldChildren, oldEl);
                console.log('Q: ', Q)
            }
        }

    }

    function differentChildren(newChildren, oldChildren) {
        let difference = false;
       
        if (isDefined(newChildren) || isDefined(oldChildren)) {
          
           if (!(isDefined(newChildren) && isDefined(oldChildren))) {
               difference = true;
           }

        }
        return difference;
    }

    function repeatOnChildren(newChildren, oldChildren, parent) {
        let l1 = newChildren.length, l2 = oldChildren.length;
        for (let i = 0; i < l1 || i < l2; ++i) {
            update(newChildren[i], oldChildren[i], parent, i);
        }   
    }

    function differentAttrs(newAttributes, oldAttributes) {
        let difference = false;

        if (isDefined(newAttributes) || isDefined(oldAttributes)) {

            let newA = genAttrsObj(newAttributes);
            let oldA = genAttrsObj(oldAttributes);
            
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

    function isDefined(o) {
        return o !== null && o !== undefined;
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
