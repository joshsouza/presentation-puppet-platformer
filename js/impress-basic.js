/*
    --------License stuff--------------
    The MIT License (MIT)

    Copyright (c) <year> <copyright holders>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

    --------About me stuff--------------
    Author: Josh Souza
    Email: development@pureinsomnia.com
    Date: 2013-08-01
    Summary: This code takes care of a basic layout for a slide deck, eliminating the need to put in custom data-positions for impress.js
  */
var x_block=document.getElementById('x_block');
var eventActions = {
	'show_x': function(){
		x_block.style.display="block"
	}
	,'hide_x': function(){
		x_block.style.display="none"
	}
	,'x_running': function(){
		x_block.src="images/megaman/Running_bare.gif"
	}
	,'x_upgrade_1': function(){
		x_block.src="images/megaman/Running_legs.gif"
	}
	,'x_upgrade_2': function(){
		x_block.src="images/megaman/Running_leg_chest.gif"
	}
	,'x_upgrade_3': function(){
		x_block.src="images/megaman/Running_leg_chest_head.gif"
	}
	,'x_upgrade_4': function(){
		x_block.src="images/megaman/Running_full.gif"
	}
}
window.addEventListener('impress:stepleave',function(e){
	var classes=e.srcElement.classList;
	for (var i in classes){
		if (eventActions.hasOwnProperty(classes[i])){
			eventActions[classes[i]].call()
		}
	}
})
window.addEventListener('impress:stepenter',function(e){
	$(".animated").each(function(a,b,c,d){
		var src=b.src;
		$(b).attr('src',src)
	})
})
var slides=document.getElementsByClassName('step');
var length = slides.length,
	element = null,
	gap=1200,
	xpos=0,
	xgap=gap,
	ypos=0,
	ygap=0,
	zpos=0,
	zgap=0,
	lastXRot=0,
	lastYRot=0,
	lastZRot=0;

for (var i = 0; i < length; i++) {
	element = slides[i];
	if(element.getAttribute("data-rotate-x")||element.getAttribute("data-rotate-y")||element.getAttribute("data-rotate-z")){
		xgap=0;
		ygap=0;
		zgap=0;
	}else{
		xgap=gap;
		ygap=0;
		zgap=0;
	}
	if(element.getAttribute("keep-gap")){
		xgap=gap;
		ygap=-gap;
		zgap=0;
	}
	if(element.getAttribute("data-rotate-x")){
		rad=parseInt(element.getAttribute("data-rotate-x"));
		zgap=zgap-gap*Math.round(Math.cos(rad*(Math.PI/180)));
		ygap=ygap+gap*Math.round(Math.sin(rad*(Math.PI/180)));
	};
	if(element.getAttribute("data-rotate-y")){
		rad=parseInt(element.getAttribute("data-rotate-y"));
		xgap=xgap+gap*Math.round(Math.cos(rad*(Math.PI/180)));
		zgap=zgap-gap*Math.round(Math.sin(rad*(Math.PI/180)));
	};
	if(element.getAttribute("data-rotate-z")){
		rad=parseInt(element.getAttribute("data-rotate-z"));
		xgap=xgap+gap*Math.round(Math.cos(rad*(Math.PI/180)));
		ygap=ygap+gap*Math.round(Math.sin(rad*(Math.PI/180)));
	};

	if(!element.getAttribute('data-x')){
		xpos+=xgap;
		element.setAttribute('data-x',xpos);
	}else{
		xpos=parseInt(element.getAttribute('data-x'));
	}
	if(!element.getAttribute('data-y')){
		ypos+=ygap;
		element.setAttribute('data-y',ypos);
	}else{
		ypos=parseInt(element.getAttribute('data-y'));
	}
	if(!element.getAttribute('data-z')){
		zpos+=zgap;
		element.setAttribute('data-z',zpos);
	}else{
		zpos=parseInt(element.getAttribute('data-z'));
	}
}