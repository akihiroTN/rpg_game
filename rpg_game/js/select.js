"use strict";
import { displayNode,displayWord } from "./func.js";
var selectdisplay=document.getElementById("game-wrapper");
var words1 = "あなたのキャラクターを決めます。";
var word2 = "キャラクターを選んでください。";
var arraySelect = [words1,word2];
const display = selectdisplay.style.display;
if(display === "inline-block"){
  //選択画面の文字を表示する
  displayWord(arraySelect,"select-message")
  //押されたid名から番号を取得して次の画面に画像を表示それぞれのパラメーターを生成して代入
  function getVal(){
    var id=this.id;
    encountper=Math.floor(Math.random()*10)+20;
    winper=Math.floor(Math.random()*11)+55;
    escapeper=Math.floor(Math.random()*11)+20;
    characternum=parseInt(id.replace(/[^0-9]/g,""));
    document.getElementById("charactername").querySelector("img").src = `./image/characters/charanter${characternum+1}.png`;
    displayNode("select","none")
    displayNode("charactername","inline-block")
    var newcr=document.createElement("script");
    newcr.src='./js/named.js';
    newcr.setAttribute("type","module");
    document.body.appendChild(newcr);
  }

  var characterarea=document.getElementById("character-area");
  for(var i=0;i<characterarea.querySelectorAll("input").length;++i){
    ((i)=>{
      //getval関数をそれぞれのaddEventlistenrに持たせる
      document.getElementById(`selected${i}`).addEventListener("click",getVal,false);
    })(i)
  }

}

