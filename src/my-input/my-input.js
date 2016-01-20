



function MyInput(selector) {

    // component id
    MyInput.id = MyInput.id || 0;
    MyInput.id++;

    // HTML template
    var cssClass = "my-input";
    var labelId = cssClass + "-label-" + MyInput.id;
    var template = '<label for="' + labelId + '"></label><input id="' + labelId + '" type="text" /><button></button>';

    // host element
    this.host = document.querySelector(selector);

    // attach CSS class, render template
    this.host.classList.add(cssClass);
    this.host.innerHTML = template;

    // elements
    this.labelElem = this.host.querySelector('label');
    this.buttonElem = this.host.querySelector('button');
    this.inputElem = this.host.querySelector('input');

    // register 'click' event
    this.buttonElem.addEventListener('click', this.onClick.bind(this));

    // register 'keyup' event
    this.inputElem.addEventListener('keyup', this.onTextChange.bind(this));

    // register custom event 'clear'
    var clearEventName = 'clear';
    this.clearEvent = document.createEvent('CustomEvent');
    this.clearEvent.initCustomEvent(clearEventName, true, true, null);
    this.clearEvent.eventName = clearEventName;

    // register custom event 'change'
    var changeEventName = 'changeText';
    this.changeEvent = document.createEvent('CustomEvent');
    this.changeEventData = {};
    this.changeEvent.initCustomEvent(changeEventName, true, true, this.changeEventData);
    this.changeEvent.eventName = changeEventName;

}


// ----- methods -----

MyInput.prototype.clear = function() {
    // change text and fire change event
    this.text = "";
    this.onTextChange();

    // focus on input element
    this.inputElem.focus();

    // fire clear event
    this.host.dispatchEvent(this.clearEvent);
};


MyInput.prototype.onClick = function() {
    this.clear();
};


MyInput.prototype.onTextChange = function() {
    this.changeEventData.text = this.inputElem.value;
    this.host.dispatchEvent(this.changeEvent);
};




// ----- data binding -----

Object.defineProperty(MyInput.prototype, 'label', {
    get: function() {
        return this.labelElem.textContent;
    },
    set: function(label) {
        this.labelElem.textContent = label;
    }
});


Object.defineProperty(MyInput.prototype, 'clearLabel', {
    get: function() {
        return this.buttonElem.textContent;
    },
    set: function(clearLabel) {
        this.buttonElem.textContent = clearLabel;
    }
});


Object.defineProperty(MyInput.prototype, 'text', {
    get: function() {
        return this.inputElem.value;
    },
    set: function(text) {
        this.inputElem.value = text;
    }
});

