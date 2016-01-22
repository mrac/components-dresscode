
// register & configure elements

// this component is configured in HTML via attributes
var fatherSurname = new MyInput('#fatherSurname');

// this component will be configured via properties - dynamically, all type of values possible
var motherSurname = new MyInput('#motherSurname');
motherSurname.label = "Mother Surname";
motherSurname.clearLabel = "CLEAR";


// set up external bindings
// two-way data binding also possible here

fatherSurname.host.addEventListener('clear', function() {
    console.log('clear father surname');
});

motherSurname.host.addEventListener('clear', function() {
    console.log('clear mother surname');
});


fatherSurname.host.addEventListener('textChange', function(ev) {
    motherSurname.text = ev.detail.text;
});

motherSurname.host.addEventListener('textChange', function(ev) {
    fatherSurname.text = ev.detail.text;
});

