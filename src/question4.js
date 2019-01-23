

export function question4() {

    /**
    Here's a 'module'...but it's not really. We'd like the _privateValues to
    be private and right now they aren't. Turn this code into a module so that 
    only myModule.getPublicValue() is exposed and the _privateVariables are 
    not available outside of myModule.   
    */
   
    let myModule = {
        _privateValue1: 1,
        _privateValue2: 2,
        getPublicValue: function() {
            return this._privateValue1 + this._privateValue2;
        }
    }

    //Test it:
    // console.log('private: ', myModule._privateValue1); //expect 'undefined'
    // console.log('private: ', myModule._privateValue2); //expect 'undefined'
    // console.log('public: ', myModule.getPublicValue()); //expect 3

}