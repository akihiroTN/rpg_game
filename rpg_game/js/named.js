"use strict";
import { displayNode,displayWord } from "./func.js";
const arrayName = ["全角カタカナでユーザー名を入力してください。"];
var charactername=document.getElementById("charactername");
const display = charactername.style.display;
if(display === "inline-block"){
  displayWord(arrayName,"name-message");
  //決定ボタンが押されたら確認画面へ進むための処理とバリデーション
  //不要なボタンをdisplay:noneにしてユーザー名を確認する処理
  document.getElementById("predesideusername").addEventListener("click",()=>{
    const inputName=document.getElementById("named").value;
    const arrayCheckname=[`${inputName}で宜しいですか?`]
    const nameMessage=document.getElementById("name-message").innerText;
    const lastword=nameMessage[nameMessage.length-1];
    console.log(nameMessage.length);
    if(inputName.match(/^[ァ-ヴー]+$/g)){
      if(lastword === "。"){
        displayWord(arrayCheckname,"name-message")
        displayNode("predesideusername","none");
        displayNode("desideusername","inline-block");
        displayNode("cancelusername","inline-block")
      }else{
        alert("メッセージを最後まで読んでください");
      }
    }else{
      if(lastword === "。"){
        displayWord(arrayName,"name-message");
      }else{
        alert("メッセージを最後まで読んでください");
      }
    }
  },false);
  //確認画面で決定が押された時の処理で、ここでscriptで宣言されている変数にusernameを代入
  document.getElementById("desideusername").addEventListener("click",()=>{
    username=document.getElementById("named").value;
    const image=document.getElementById("character-img");
    displayNode("charactername","none");
    displayNode("game-filed","flex");
    var newcr = document.createElement("script");
    newcr.src = './js/field.js';
    newcr.setAttribute("type","module");
    const picnumber=characternum+1
    image.src=`../image/characters/charanter${picnumber}.png`;
    document.getElementById("character-hp").innerHTML = `HP:${userHp}`;
    document.body.appendChild(newcr);
  },false);

  //キャンセルが押された時の処理で、全てのメッセージが出力され切ってから、キャンセルボタンが押せるようにしてる
  //キャンセルが押されたら、不要な要素を全てnoneにして、また、最初の入力画面で出力される文字を表示させる
  document.getElementById("cancelusername").addEventListener("click",() => {
    let inputName = document.getElementById("named");
    let nameMessage = document.getElementById("name-message").innerText;
    const lastword = nameMessage[nameMessage.length-1];
    console.log(inputName);
    if(lastword === "?"){
      inputName.value="";
      displayWord(arrayName,"name-message");
      displayNode("predesideusername","inline-block");
      displayNode("desideusername","none");
      displayNode("cancelusername","none")
    }else{
      alert("メッセージを最後まで読んでください");
      return;
    }
  },false);
}
