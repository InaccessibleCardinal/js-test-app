
export function question3() {

    //Here's an object
    let o = {
        a: 42,
        b: 'stuff',
        c: 'other stuff',
        d: 0,
        e: 'more' 
    };
    /** 
    Here's some procedural code that pulls things out of the object
    and assigns them to variables:
        let a = o.a;
        let b = o.b;
        let c = {};
        for (let key in o) {
            if (key !== 'a' && key !== 'b') {
                c[key] = o[key];
            }
        }
    //Try to use ES6 techiques to accomplish the same thing in one line. 
    We'll log variables a, b and c to the console to check your work:
    */
    
    // console.log('a: ', a);
    // console.log('b: ', b);
    // console.log('c: ', c);    

}