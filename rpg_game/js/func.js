"use strict";
//それぞれの要素のdisplay設定をこの関数で実行する
export const displayNode = (id,display)=>{
  document.getElementById(id).style.display = `${display}`
}
export const disabled = (id,bool) =>{
  document.getElementById(id).disabled = bool;
}

//一文字ずつ表示されるようにsetIntervalで実行　長い文章は切り分けて表示したいので、配列で渡してindex番号順に表示させる
export const displayWord=(array,id) => {
  let s = 0;
  let num = 0;
  let word = array[num];
  const set = setInterval(() => {
    if(s<word.length){
      s++
      var slice=word.slice(0,s);
      document.getElementById(id).innerHTML=slice;
    }else{
      num += 1;
      num < array.length ? (
        s = 0,
        word = array[num]
      ):(
        console.log("終了"),
        clearInterval(set)
      );
    } 
  },150)
}

export const clearDisplay = (node) => {
   node.style.opacity = 1.0
  const nonedisplay=setInterval(() => {
    if(node.style.opacity >= 0){
      node.style.opacity=node.style.opacity-0.2;
      console.log("まだ");
      console.log(node.style.opacity);
    }
    if(node.style.opacity <= 0){
      document.body.style.backgroundImage = "url(../image/gameover/gameover.jpg)";
      document.getElementById("game-wrapper").style.display = "none";
      const createEl = document.createElement("div");
      document.body.appendChild(createEl);
      const gameOverMessage = ["ゲームオーバー!!","数秒後にタイトル画面に戻ります。"];
      createEl.id = "childel";
      displayWord(gameOverMessage,"childel");
      createEl.style.border = "solid 3px red";
      createEl.style.color = "white";
      //location.reload();
      clearInterval(nonedisplay)
    }
  },1000)
  const reload = () =>{
    location.reload();
  }
  setTimeout(reload,10000);
}

export const makeProbabilityArray = (is,isNot) => {
  const isArray = new Array(is).fill("有");
  const isNotArray = new Array(isNot).fill("無");
  const bothArray = isArray.concat(isNotArray);
  return bothArray;
}

export const changeStage = () =>{
  let fieldEl = document.getElementById("game-filed");
  let enemyEl = document.getElementById("enemy");
  let isBackgroundImage = getComputedStyle(fieldEl).backgroundImage;
  let isEnemyBackgroundImage = getComputedStyle(enemyEl).backgroundImage;
  let changeBackgroundImage;
  let changeEnemyBackgroundImage;
  if((yWalk >= 0  && yWalk <= 10) && (xWalk >= 0 && xWalk <= 10)){
    changeBackgroundImage = "../image/background/crypt.jpg";
    changeEnemyBackgroundImage = "../image/background/forest.png";
  }else if((yWalk > 10  && yWalk < 20) && (xWalk > 10 && xWalk < 20)){
    changeBackgroundImage = "../image/background/cryptroom.jpg";
    changeEnemyBackgroundImage = "../image/background/room.png";
  }else if(yWalk >= 20 &&  xWalk >= 20){
    changeBackgroundImage = "../image/background/cryptkingdom.jpg";
    changeEnemyBackgroundImage = "../image/background/block.png";
  }else{
    changeBackgroundImage = "../image/background/crypt.jpg";
    changeEnemyBackgroundImage = "../image/background/forest.png";
  }
  if(!(isBackgroundImage === changeBackgroundImage) && !(isEnemyBackgroundImage === changeEnemyBackgroundImage)){
    fieldEl.style.backgroundImage = `url(${changeBackgroundImage})`;
    enemyEl.style.backgroundImage = `url(${changeEnemyBackgroundImage})`;
  }else{
    return;
  }

}