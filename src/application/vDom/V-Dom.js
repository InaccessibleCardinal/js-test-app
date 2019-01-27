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

export default class VDom {

    constructor(parent) { //parent instanceof HTMLElement
        if (parent instanceof HTMLElement) {
            this.parent = parent;
        } else {
            throw new Error(`VDom must be called with an instance of HTMLElement`);
        }
        this.createVirtualElement = this.createVirtualElement.bind(this);
        this.update = this.update.bind(this);
        this.buildDom = this.buildDom.bind(this);
        this.recurseOnChildren = this.recurseOnChildren.bind(this);
        this.createRealElement = this.createRealElement.bind(this);
        this.append = this.append.bind(this);
        this.setAttributes = this.setAttributes.bind(this);
    }

    createVirtualElement(tagName, props, children) { 
        return {
            type: tagName,
            props,
            children
        };
    }

    genPropsFromAttrs(attrs) {
        let attrsObj = {};
        let l = attrs.length;
        for (let i = 0; i < l; ++i) {
            attrsObj[attrs[i].nodeName] = attrs[i].nodeValue; 
        }
        return attrsObj;
    }

    arePropsAndAttrsSame(newProps, oldAttrs) {
       
        let propsIdentical = true;
        let oldProps = this.genPropsFromAttrs(oldAttrs);
        for (let p in newProps) {
            if (newProps.hasOwnProperty(p)) {
                if (newProps[p] !== oldProps[p]) {
                    propsIdentical = false;
                }
            }
        }
        for (let p in oldProps) {
            if (oldProps.hasOwnProperty(p)) {
                if (newProps[p] !== oldProps[p]) {
                    propsIdentical = false;
                }
            }
        }
        return propsIdentical;
    }

    update(newT, oldT, parent = this.parent) {
  
        if (newT && !oldT) {
            //new element to parent
            parent.appendChild(this.buildDom(newT));
        
        } else if (!newT && oldT) {
            //new tree eliminates some old elements
            parent.removeChild(oldT);

        } else {
            let newType, newProps, newChildren, oldType, oldAttrs, oldChildren;
            if (newT) {
                newType = newT.type
                newProps = newT.props
                newChildren = newT.children;
            }
            if (oldT) {
                oldType = oldT.tagName;
                oldChildren = oldT.children;
                oldAttrs = oldT.attributes;                
            }
            
            if (newType && oldType && !equalIgnoreCase(newType, oldType)) {
                //new tagName -> blow out whatever was in parent before
                parent.replaceChild(this.buildDom(newT), oldT); 

            } else if (newProps && !oldAttrs || !newProps && oldAttrs) {
                //if dom attrs have changed at all, just blowing out old element for now
                parent.replaceChild(this.buildDom(newT), oldT); 

            } else if (newProps && oldAttrs) {

                if (!this.arePropsAndAttrsSame(newProps, oldAttrs)) {
                    //if dom attrs have changed at all, just blowing out old element for now
                    parent.replaceChild(this.buildDom(newT), oldT);
                }
            }

            if (newChildren && oldChildren && newChildren.length && oldChildren.length) {
                this.recurseOnChildren(oldChildren, newChildren, oldT);
            }
            
        }
    }

    recurseOnChildren(oldChildren, newChildren, parent) {

        let len1 = newChildren.length;
        let len2 = oldChildren.length;        

        for (let i = 0; i < len1 + len2; ++i) {
            let newChild = newChildren[i];
            let oldChild = oldChildren[i];
           
            if (newChild && isTextContainerTypeNode(newChild)) {
                //text content changed
                let newDomChild = this.buildDom(newChild);
                if (oldChild && oldChild.textContent) {
                    
                    if (!hasEqualTextWithTypeCoerced(newChild.children, oldChild.textContent)) {
                        parent.replaceChild(newDomChild, oldChild);
                    }
                } else if (!oldChild) {
                    parent.appendChild(newDomChild);
                } 
            }

            if (!newChild && !oldChild) { 
                //if all new updates processed, blow out remaining
                let j = parent.children.length;
                while (j > len1) {
                    parent.removeChild(parent.lastChild);
                    j -= 1;
                }
            }
            
            this.update(newChild, oldChild, parent);
            
        }
    }
    //$DOM
    buildDom(vEl) {
        
        let {type, props, children} = vEl;
        let el = this.createRealElement(type);
        if (props) {
            this.setAttributes(props, el);
        }
        if (getType(children) === ARRAY) {
            this.append(children.map((c) => this.buildDom(c)), el);
        } else if ([NUMBER, STRING].indexOf(getType(children)) > -1) {
            el.innerHTML = children;
        } else {
            throw new Error('vEl.children must be an array of virtual elements or a string/number');
        }
        return el;
    }
    //$DOM
    createRealElement(tagName) {
        return document.createElement(tagName);
    }
    //$DOM
    append(children, element) {
        if (getType(children) === ARRAY) {
            children.forEach((c) => {
                element.appendChild(c);
            });
        } else {
            throw new Error('append requires an array of children');
        }

    }
    //$DOM
    setAttributes(props, el) {
        for (let prop in props) {
            if (props.hasOwnProperty(prop)) {
                el.setAttribute(prop, props[prop]);
            } 
        }
    }
}

//utils
function equalIgnoreCase(a, b) {
    if (a && b) {
        return a.toLowerCase() === b.toLowerCase();
    } else {
        return false;
    } 
}

function isTextContainerTypeNode(vEl) {
    return ['number', 'string'].indexOf(typeof vEl.children) > -1;
}

function hasEqualTextWithTypeCoerced(n, t) {
    return n.toString() === t.toString();
}