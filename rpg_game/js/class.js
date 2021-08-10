"use strict";
import { disabled, displayNode, displayWord,clearDisplay,makeProbabilityArray} from "./func.js";
export class UserAct {
  constructor(userDetail){
    this.username = userDetail.name;
    this.encountper = userDetail.encount;
    this.winper = userDetail.win;
    this.escapeper = userDetail.escape;
    this.characternum = userDetail.usernum;
    this.level = userDetail.userLevel;
    this.walkCount = userDetail.walk;
    this.winCount  = userDetail.countWin;
    this.userHp = userDetail.Hp;
    this.encountPerArray = makeProbabilityArray(this.encountper,100-this.encountper);
    this.fightArray = makeProbabilityArray(this.winper,100-this.winper);
    this.escapeArray = makeProbabilityArray(this.escapeper,100-this.escapeper);
    this.enemyHpArray = new Array(80,70,60,40,77,67,50,55);
    this.checkUpdate = 0;
    this.resultBattle;
    this.resultEscape;
  }
  
  enemyEncount() {
    const encount=Math.floor(Math.random() * this.encountPerArray.length);
    const encountResult=this.encountPerArray[encount];
    const randWinLose = Math.floor(Math.random() * this.fightArray.length);
    const randEscape = Math.floor(Math.random() * this.escapeArray.length);
    const escapeResult = this.escapeArray[randEscape];
    const fightResult = this.fightArray[randWinLose];
    this.resultEscape = escapeResult;
    this.resultBattle = fightResult;
    this.walkCount ++;
    console.log(`encount${this.encountper}`);
    const test = this.encountPerArray.filter((n) => {
      return n === "有";
    })
    console.log(this.encountper);
    console.log(test.length);
    console.log(this.encountPerArray);
    if(encountResult==="有"){
      const picMaxNum = 8;
      const picMinNum = 1;
      const randPic = Math.floor(Math.random() * (picMaxNum - picMinNum)) + picMinNum;
      const hpNum = Math.floor(Math.random() * this.enemyHpArray.length);
      document.getElementById("enemy-img").src = `../image/enemycharacters/enemy${randPic}.png`;
      displayNode("enemy-img","inline-block");
      displayNode("enemy-hp","inline-block");
      enemyHp = this.enemyHpArray[hpNum];
      document.getElementById("enemy-hp").innerHTML =  `HP:${enemyHp}`;
      const encountMessage = ["敵が現れた!!", "戦うか逃げるかを選択してください。"];
      const createLog = document.createElement("p");
      createLog.innerHTML = `${this.walkCount}歩目`;
      document.getElementById("enemy-log").appendChild(createLog);
      const getenEncountCount = document.getElementById("enemy-log").children.length;
      const encountAverage = this.walkCount / getenEncountCount;
      document.getElementById("encount-average").innerHTML = Math.floor(encountAverage);
      displayWord(encountMessage,"display-message");
      disabled("fighting",false)
      disabled("escape",false)
      disabled("top-btn",true)
      disabled("left-btn",true)
      disabled("right-btn",true);
      disabled("bottom-btn",true);
      disabled("save-btn",true);
    }
  }
  //encountの確率をアップデート
  updateWinper(){
    const updateNum = 5;
    if(this.winper + updateNum >100){
      this.winper = 100;
      this.checkUpdate = 2;
      this.fightArray = makeProbabilityArray(this.winper,100-this.winper);
      return;
    }else if((this.characternum === 0) && (this.winCount > 0 && this.winCount % 5 === 0)){
      this.winper += 5;
      this.checkUpdate ++;
    }else if((this.characternum === 1) && (this.winCount > 0 && this.winCount % 4 === 0)){
      this.winper += 5;
      this.checkUpdate ++;
    }else if((this.characternum === 2) && (this.winCount > 0 && this.winCount % 5 === 0)){
      this.winper += 5;
      this.checkUpdate ++;
    }else if((this.characternum === 3) && (this.winCount > 0 && this.winCount % 3 === 0)){
      this.winper += 5;
      this.checkUpdate ++;
    }else{
      console.log(this.level);
      console.log(this.characternum);
      console.log(this.winCount);
      console.log(this.winper);
      return;
    }
    this.fightArray = makeProbabilityArray(this.winper,100-this.winper);
    this.level ++;
    document.getElementById("level").innerHTML = this.level;
  }

  attack(){
    console.log(this.resultBattle); 
    const test = this.fightArray.filter((n) => {
      return n === "有";
    })
    console.log(this.winper);
    console.log(test.length);
    console.log(this.fightArray);
    let enemyAttack = 0;
    let characterAttack = 0;
    if(this.resultBattle === "有"){
        while(characterAttack <= enemyAttack){
          enemyAttack = Math.floor(Math.random() * 5)+10;
          characterAttack = Math.floor(Math.random() * 10)+40;
        }
    }else{
      while(characterAttack >= enemyAttack){
        characterAttack = Math.floor(Math.random() * 5)+10;
        enemyAttack = Math.floor(Math.random() * 15)+40;
        console.log("負けロジックうごいってる");
      }
    }
    console.log(enemyAttack);
    console.log(characterAttack);
    this.userHp = this.userHp - enemyAttack;
    enemyHp = enemyHp - characterAttack;
    if(enemyHp <= 0 && enemyHp < this.userHp){
      disabled("fighting",true);
      disabled("escape",true);
      disabled("recovery",false);
      displayNode("enemy-img","none");
      displayNode("enemy-hp","none");
      this.winCount ++;
      document.getElementById("win-count").innerHTML = this.winCount;
      this.updateWinper();
      let winMessage;
      if(this.checkUpdate === 0){
         winMessage = [`敵に${characterAttack}のダメージ!`,"勝った!","薬草をGetした!","回復してください。"];
      }else if(this.checkUpdate === 1){
        winMessage = [`敵に${characterAttack}のダメージ!`,"勝った!","経験値が100たまった!!","レベルが1上がった!!","薬草をGetした!","回復してください。"];
        this.checkUpdate = 0;
        console.log(this.checkUpdate);
      }else{
        winMessage = [`敵に${characterAttack}のダメージ!`,"勝った!","経験値が100たまった!!","レベルがMAXだったのでレベルアップできなかった!",`しかし、${this.username}は無敵モードになった!!!`,"無敵回復薬を手に入れた。","回復してください。"];
        this.checkUpdate = 0;
      }
      displayWord (winMessage,"display-message");
      return;
    }else if(this.userHp <=0 && this.userHp < enemyHp){
      const loseMessage = [`${this.username}に${enemyAttack}のダメージ!`,`${this.username}は死んでしまった`]
      displayWord (loseMessage,"display-message");
      document.getElementById("character-hp").innerHTML = "HP:0";
      localStorage.clear()
      const cleaNode = document.getElementById("game-filed");
      clearDisplay(cleaNode);
      disabled("fighting",true);
      disabled("escape",true);
      disabled("recovery",true);
      return;
    }else{
      const DamageMessage =  [`${this.username}に${enemyAttack}のダメージ!`,`敵に${characterAttack}のダメージ。`];
      displayWord(DamageMessage,"display-message");
      document.getElementById("enemy-hp").innerHTML = `HP:${enemyHp}`;
      document.getElementById("character-hp").innerHTML = `HP:${this.userHp}`;
      return;
    }
  }

  escapeMessage(){
    console.log(this.resultEscape);
    const test = this.escapeArray.filter((n) => {
      return n === "有";
    })
    console.log(this.escapeper);
    console.log(test.length);
    console.log(this.escapeArray);
    if(this.resultEscape === "有"){
      const canEscapeMessage = [`${this.username}は必死に逃走!!`,"敵から逃げ切れた!" , "逃げる途中で回復薬を拾った!!","体力を回復してください。"]
      displayWord(canEscapeMessage,"display-message");
      disabled("fighting",true);
      disabled("escape",true);
      disabled("recovery",false);
      displayNode("enemy-img","none");
      displayNode("enemy-hp","none");
    }else{
      const cannotEscapeMessage = [`${this.username}はダッシュしたが足元に石が!`,"こけて敵に捕まった!","戦いをつづけるしかなくなった。"]
      displayWord(cannotEscapeMessage,"display-message");
      disabled("escape",true);
    }
  }

  heal(){
    this.userHp = 60;
    document.getElementById("character-hp").innerHTML = `HP:${userHp}`;
    const recoverMessage = [`体力が${this.userHp}に回復した!`,"歩く方向を選択してください。"];
    displayWord(recoverMessage,"display-message");
    disabled("recovery",true);
    disabled("top-btn",false)
    disabled("left-btn",false)
    disabled("right-btn",false);
    disabled("bottom-btn",false);
    disabled("save-btn",false);
  }

  saveData(x,y,walkCount){
    const enemyLog = document.getElementById("enemy-log").children;
    const logArray = [];
    for(var i=0; i<enemyLog.length; ++i){
      logArray.push(enemyLog[i].innerText)
    }
    return {
      name:this.username,
      encount:this.encountper,
      win:this.winper,
      escape:this.escapeper,
      usernum:this.characternum,
      userLevel:this.level,
      countWin:this.winCount,
      Hp:this.userHp,
      enemyLog:logArray,
      xWalk:x,
      yWalk:y,
      walk:walkCount,
    }
  }
  addWalkCount(walkCount){
    this.walkCount = walkCount;
  }
}

export class Cryptroom extends UserAct{
  constructor(userDetail){
    super(userDetail)
    this.encountper = userDetail.encount + 5 ;
    this.encountPerArray = makeProbabilityArray(this.encountper,100-this.encountper);
  }
}

export class CryptKingdom extends UserAct{
  constructor(userDetail){
    super(userDetail)
    this.encountper = userDetail.encount + 10 ;
    this.encountPerArray = makeProbabilityArray(this.encountper,100-this.encountper);
  }
}

