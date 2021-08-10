"use strict";
import { CryptKingdom, Cryptroom, UserAct } from "./class.js";
import { changeStage } from "./func.js";
const display = document.getElementById("game-filed").style.display;
if(display === "flex"){
  let userDetail;
  if(localStorage.length > 0){
    const data = JSON.parse(localStorage.getItem("Data"))
    console.log(data);
    userDetail = {
      name:data.name,
      encount:data.encount,
      win:data.win,
      escape:data.escape,
      usernum:data.usernum,
      userLevel:data.userLevel,
      countWin:data.countWin,
      walk:data.walk,
      Hp:data.Hp,
      log:data.enemyLog,
      xWalk:data.xWalk,
      yWalk:data.yWalk,
      level:data.userLevel,
      countwin:data.countWin,
    }
    console.log(userDetail.log.length);
    console.log(userDetail.log[0]);
    const image=document.getElementById("character-img");
    const picnumber = userDetail.usernum;
    const parentEl = document.getElementById("enemy-log");
    image.src=`../image/characters/charanter${picnumber+1}.png`;
    document.getElementById("character-hp").innerHTML = `HP:${userDetail.Hp}`;
    for(var i= 0; i<userDetail.log.length;++i){
      const createEl = document.createElement("p");
      createEl.innerHTML = `${userDetail.log[i]}`;
      //appendchildする
      parentEl.appendChild(createEl);
    }
    xWalk = userDetail.xWalk;
    yWalk = userDetail.yWalk;
    level = userDetail.level;
    winCount = userDetail.countWin;
    document.getElementById("y-walk").innerHTML = yWalk;
    document.getElementById("x-walk").innerHTML = xWalk;
    document.getElementById("win-count").innerHTML = winCount;
    document.getElementById("level").innerHTML = level;
    const getenEncountCount = document.getElementById("enemy-log").children.length;
    const averageCount =  Math.floor(walkCount / getenEncountCount);
    walkCount = userDetail.walk;
    if(isNaN(averageCount)){ 
      document.getElementById("encount-average").innerHTML = 0;
    }else{
      document.getElementById("encount-average").innerHTML = Math.floor(walkCount / getenEncountCount);
    }

    changeStage();
  }else{
    userDetail =
    {
      name:username,
      encount:encountper,
      win:winper,
      escape:escapeper,
      usernum:characternum,
      userLevel:level,
      countWin:winCount,
      walk:walkCount,
      Hp:userHp
    };
  }
  console.log(userDetail);
  const userInfo = new UserAct(userDetail);
  const cryptRoomEncount  = new Cryptroom(userDetail);
  const cryptKingromEncount = new CryptKingdom(userDetail);
  const btnInputEl = document.getElementById("all-btn").querySelectorAll("input");
  console.log(btnInputEl.length);
  for(var i = 0; i<btnInputEl.length; ++i){
    console.log(btnInputEl[i].id);
    console.log(i);
    ((i) => {
      document.getElementById(btnInputEl[i].id).addEventListener("click",()=>{
        const lastword = document.getElementById("display-message").innerText;
        if(lastword[lastword.length-1] === "。" || lastword.length === 0){
          if(i===0){
            yWalk ++
            document.getElementById("y-walk").innerHTML = yWalk;
          }else if(i === 1){
            xWalk --
            document.getElementById("x-walk").innerHTML = xWalk;
          }else if(i === 2){
            xWalk ++
            document.getElementById("x-walk").innerHTML = xWalk;
          }else{
            yWalk --
            document.getElementById("y-walk").innerHTML = yWalk;
          }

          //ステージ変更の判定
          if((yWalk >= 0  && yWalk <= 10) && (xWalk >= 0 && xWalk <= 10)){
            userInfo.addWalkCount(walkCount);
            userInfo.enemyEncount();
          }else if((yWalk > 10  && yWalk < 20) && (xWalk > 10 && xWalk < 20)){
            cryptRoomEncount.addWalkCount(walkCount);
            cryptRoomEncount.enemyEncount();
          }else if(yWalk >= 20 &&  xWalk >= 20){
            cryptKingromEncount.addWalkCount(walkCount);
            cryptKingromEncount.enemyEncount();
          }else{
            userInfo.addWalkCount(walkCount);
            userInfo.enemyEncount();
          }
          changeStage();
        }else{
          alert("メッセージを最後まで読んでください。");
        }
        walkCount ++
      },false);
    })(i)
  }
  document.getElementById("fighting").addEventListener("click",() => {
    const lastword = document.getElementById("display-message").innerText;
    if(lastword[lastword.length-1] === "。"){
     userInfo.attack();
    }else{
      alert("メッセージを最後まで読んでください");
    }
  })
  document.getElementById("recovery").addEventListener("click",() => {
    const lastword = document.getElementById("display-message").innerText;
    if(lastword[lastword.length-1] === "。" || lastword.length === 0){
      userInfo.heal();
    }else{
      alert("メッセージを最後まで読んでください。");
    }
  },false);
  document.getElementById("escape").addEventListener("click",() => {
    const lastword = document.getElementById("display-message").innerText;
    if(lastword[lastword.length-1] === "。"){
      userInfo.escapeMessage();
    }else{
      alert("メッセージを最後まで読んでください。");
    }
  },false)

  document.getElementById("save-btn").addEventListener("click",() => {
    const saveData = userInfo.saveData(xWalk,yWalk,walkCount);
    if(localStorage.length > 0){
      localStorage.clear();
    }
    localStorage.setItem("Data",JSON.stringify(saveData));
    location.reload();
  },false);
}
