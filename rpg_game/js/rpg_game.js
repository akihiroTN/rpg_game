"use strict";
import { displayNode } from "./func.js";
var num = 0;
var pic=document.getElementById("pic");
var key = false;
var dispic = (pics) => {
  //pics.style.opacity=0.1;
  pics.style.opacity = 1.0
  var nonedisplay=setInterval(() => {
    if(pics.style.opacity >= 0){
      pics.style.opacity=pics.style.opacity-0.05;
    }
    if(pics.style.opacity <= 0){
      pics.style.opacity = 1
    }
    if(num >= 1){
      clearInterval(nonedisplay)
    }
  },1800)
}
dispic(pic);

history.pushState(null, null, location.href);
window.addEventListener('popstate', (e) => {
  history.go(1);
});
 
var ctlKey = false;
document.addEventListener('keydown', function(e){
  if(e.ctrlKey) ctlKey = true;
  if((e.which || e.keyCode) == 82 && ctlKey) e.preventDefault();
  if((e.which || e.keyCode) == 116) e.preventDefault();
});
document.addEventListener('keyup', function(e){
  if(e.ctrlKey) ctlKey = false;
});

if(localStorage.length > 0){
  const start = document.getElementById("start");
  const continuee = document.getElementById("continue");
  start.style.display = "none";
  continuee.style.display = "inline";
  document.getElementById("continue").addEventListener("click",() => {
    displayNode("title-wrapper","none");
    displayNode("select","none");
    displayNode("game-filed","flex");
    displayNode("game-wrapper","inline-block");
    var newcr=document.createElement("script");
    newcr.src='./js/field.js';
    newcr.setAttribute("type","module");
    document.body.appendChild(newcr);

  },false);

}else{
  document.getElementById("start").addEventListener("click",()=>{
    displayNode("title-wrapper","none");
    displayNode("game-wrapper","inline-block");
    var newcr=document.createElement("script");
    newcr.src='./js/select.js';
    newcr.setAttribute("type","module");
    document.body.appendChild(newcr);
    num+=1;
  },false);
}