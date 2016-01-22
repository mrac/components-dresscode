



function MyInput(selector) {

    // PUBLIC STATIC - component id
    MyInput.id = MyInput.id || 0;
    MyInput.id++;

    // PRIVATE STATIC - CSS class, HTML template
    var cssClass = "my-input";
    var labelId = cssClass + "-label-" + MyInput.id;
    var template = '<label for="' + labelId + '"></label><input id="' + labelId + '" type="text" /><button></button>';

    // PUBLIC - host element
    this.host = document.querySelector(selector);

    // attach CSS class, render template
    this.host.classList.add(cssClass);
    this.host.innerHTML = template;

    // PRIVATE - elements
    this._labelElem = this.host.querySelector('label');
    this._buttonElem = this.host.querySelector('button');
    this._inputElem = this.host.querySelector('input');

    // register 'click' event
    this._buttonElem.addEventListener('click', this.onButtonClick.bind(this));

    // register 'keyup' event
    this._inputElem.addEventListener('keyup', this.onTextChange.bind(this));

    // register custom event 'clear'
    var clearEventName = 'clear';
    this._clearEvent = document.createEvent('CustomEvent');
    this._clearEvent.initCustomEvent(clearEventName, true, true, null);
    this._clearEvent.eventName = clearEventName;

    // register custom event 'change'
    var changeEventName = 'changeText';
    this._changeEvent = document.createEvent('CustomEvent');
    this._changeEventData = {};
    this._changeEvent.initCustomEvent(changeEventName, true, true, this._changeEventData);
    this._changeEvent.eventName = changeEventName;

    // read static attribute string values
    var attrs = {};
    attrs.label = this.host.getAttribute('label');
    attrs.text = this.host.getAttribute('text');
    attrs.clearLabel = this.host.getAttribute('clearLabel');

    // initialize dynamic properties by static attribute string values
    // delay via setTimeout - for all external bindings to work already
    setTimeout(function() {
        if(attrs.label) {
            this.label = attrs.label;
        }
        if(attrs.text) {
            this.text = attrs.text;
            this.onTextChange();
        }
        if(attrs.clearLabel) {
            this.clearLabel = attrs.clearLabel;
        }
    }.bind(this), 0);

}


// ----- PUBLIC - methods -----

MyInput.prototype.clear = function() {
    // change text and fire change event
    this.text = "";
    this.onTextChange();

    // focus on input element
    this._inputElem.focus();

    // fire clear event
    this.host.dispatchEvent(this._clearEvent);
};


MyInput.prototype.onButtonClick = function() {
    this.clear();
};


MyInput.prototype.onTextChange = function() {
    this._changeEventData.text = this._inputElem.value;
    this.host.dispatchEvent(this._changeEvent);
};




// ----- PUBLIC - properties and data binding -----

Object.defineProperty(MyInput.prototype, 'label', {
    get: function() {
        return this._labelElem.textContent;
    },
    set: function(label) {
        this._labelElem.textContent = label;
    }
});


Object.defineProperty(MyInput.prototype, 'clearLabel', {
    get: function() {
        return this._buttonElem.textContent;
    },
    set: function(clearLabel) {
        this._buttonElem.textContent = clearLabel;
    }
});


Object.defineProperty(MyInput.prototype, 'text', {
    get: function() {
        return this._inputElem.value;
    },
    set: function(text) {
        this._inputElem.value = text;
    }
});

