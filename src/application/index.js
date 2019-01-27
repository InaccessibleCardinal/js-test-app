
import makeGetRequest from '../utils/makeGetRequest';
import {$id} from '../utils/dom';
import VDom from './vDom/V-Dom';

export default function application() {
    const app = $id('app');
    const vd = new VDom(app);
    const {createVirtualElement: create, update} = vd;
  
    function eventLogger(e) {
        console.log(e.target);
    }
    function mouseOverLogger(e) {
       console.log('mousing over: ', e.target);
    }
    function mouseOutLogger(e) {
       console.log('mousing out: ', e.target);   
    }

    function withEvents(eventConfig) {
        return function(vEl) {    
            events.register(vEl, eventConfig, app);
            return vEl;
        }  
    }
    

    const events = {
        register: function(vEl, eventConfig, app) {
            let {id} = vEl.props; //will be real world dom id
            for (let ev in eventConfig) {

                if (eventConfig.hasOwnProperty(ev)) {

                    let handler = function(e) {
                       
                        if (e.target.id === id) {
                            eventConfig[ev](e);
                        }
                    }
                
                    app.addEventListener(ev, handler);
                }
            }
        }
    }
   
    let people1 = [
        {name: 'ken', age: 40, uid: 'p1'},
        {name: 'jen', age: 40, uid: 'p2'},
        {name: 'sam', age: 33, uid: 'p3'}
    ];
    let people2 = [
        {name: 'ken', age: 40, uid: 'p1'},
        {name: 'jen', age: 40, uid: 'p2'},
        {name: 'sam', age: 33, uid: 'p3'},
        {name: 'jo', age: 31, uid: 'p4'},
        {name: 'jill', age: 30, uid: 'p5'}
    ];
    let peopleClass = {
        'class': 'people-list'
    };
    let e = {
        click: eventLogger,
        mouseover: mouseOverLogger,
        mouseout: mouseOutLogger
    };
    let p1List = people1.map((p) => {
        let pointerHack = {style: 'pointer-events: none;'};
        let {name, age, uid} = p;
        let domId = {id: `person-${uid}`};
        let h = create('h3', pointerHack, `Person ${uid}`);
        let n = create('p', pointerHack, `Name: ${name}`);
        let a = create('p', pointerHack, `Age: ${age}`);
        let container = create('div', domId, [h, n, a]);
        return withEvents(e)(container);
    });
    let p1 = create('div', peopleClass, p1List);

    update(p1);    
    let selectedP = p1;

    let p2List = people2.map((p) => {
        let pointerHack = {style: 'pointer-events: none;'};
        let {name, age, uid} = p;
        let domId = {id: `person-${uid}`};
        let h = create('h3', pointerHack, `Person ${uid}`);
        let n = create('p', pointerHack, `Name: ${name}`);
        let a = create('p', pointerHack, `Age: ${age}`);
        let container = create('div', domId, [h, n, a]);
        return withEvents(e)(container);
    });
    let p2 = create('div', peopleClass, p2List);

    function changeDom() {
        //console.log('selectedP: ', selectedP)
        if (selectedP === p1) {
            update(p2, app.firstChild);
            selectedP = p2;
        } else if (selectedP === p2) {
            update(p1, app.firstChild);
            selectedP = p1;
        }
        
    }

    setInterval(() => {
        setTimeout(() => changeDom(), 1000);    
    }, 2000);


}