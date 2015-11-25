

function MyInput(selector) {
    this.template = '<div class="my-input"><input type="text" /><button>CLEAR</button></div>';

    this.parent = document.querySelector(selector);
    console.log(document.querySelector(selector));
    document.querySelector(selector).innerHTML = this.template;

    this.element = this.parent.querySelector('.my-input');
    this.button = this.element.querySelector('button');
    this.input = this.element.querySelector('input');

    this.element.querySelector('button').addEventListener('click', function() {
        this.input.value = "";
        this.input.focus();
    }.bind(this));
}


MyInput.prototype.setText = function(text) {
    this.input.value = text;
};


MyInput.prototype.getText = function() {
    return this.input.value;
};

