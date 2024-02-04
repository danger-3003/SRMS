var name=localStorage.getItem('user-name');
var email=localStorage.getItem('user-email');
document.getElementById('name').innerText=name;
document.getElementById('email').innerText=email;

var slideUp = { delay:1,easing:"ease-in-out",interval:0,scale:0.95,resert:true};

ScrollReveal().reveal('.slide-up', slideUp);