// ヘッダー
// window.addEventListener('load',function(){
//   document.getElementById('percent').style.width = '100%';
// });
  $(window).on('load',function(){
    $('#percent').animate({
      width:'100%'
    },500);
});
  setTimeout(function(){
    $('#percent').animate({
      opacity:'0'
    });
    $('#loadUp').animate({
     top:'-50%'
    },100)
    $('#loadDown').animate({
      bottom:'-50%'
     },100)
  },500);


$(function(){
  $('#startButton').on('click',function(){
    $(this).addClass('hidden');
    $('#backScreen').addClass('hidden');
    $('#gameMask').css('display','block' );
    $('#gameMask').animate({
      opacity:1
    },)
  })
})


// 戦闘プログラム
const damageRange = {attack:.3,defense:.2,magic:.3};

const playerData = [{
  name:'soldier',
  hp:100,
  maxHp:100,
  attack:40,
  defence:20,
  magicalPower:20,
  speed:20,
  avoidance:10,
},

{
  name:'ranger',
  hp:100,
  maxHp:100,
  attack:23,
  defence:24,
  magicalPower:23,
  speed:30,
  avoidance:20,
},

{
  name:'wizard',
  hp:100,
  maxHp:100,
  attack:20,
  defence:20,
  magicalPower:40,
  speed:25,
  avoidance:10,
}
];
playerData['maxHp']=playerData['hp'];

console.log(playerData[0]);

let player1Data,
    player2Data;

let characterSelectSoldier = `<img src="picture/騎士.jpg" alt="">`,
    characterSelectRanger = `<img src="picture/弓使い.jpg" alt="">`,
    characterSelectWizard = `<img src="picture/魔法使い.jpg" alt="">`,
    characterSelectSoldier2 = `<img src="picture/騎士2.jpg" alt="">`,
    characterSelectRanger2 = `<img src="picture/弓使い2.jpg" alt="">`,
    characterSelectWizard2 = `<img src="picture/魔法使い2.jpg" alt="">`;

let player1SelectAction = false,
    player1SelectActionAttack = false,
    player1SelectActionCounter = false,
    player1SelectActionMagic = false,
    player1SelectActionKill = false,
    player1Decision = false,
    player2SelectAction = false,
    player2SelectActionAttack = false,
    player2SelectActionCounter = false,
    player2SelectActionMagic = false,
    player2SelectActionKill = false,
    player2Decision = false,
    damage,
    hpGauge1,
    hpGauge2,
    player1AttackCount = 0,
    player1CounterCount = 0,
    player1MagicCount = 0,
    player1KillCount = 0,
    player2AttackCount = 0,
    player2CounterCount = 0,
    player2MagicCount = 0;
    player2KillCount = 0;

function characterSelectName(selectName , selectNameType ,playerNumber ){
  document.getElementById(selectName).addEventListener('click',function(){
  document.getElementById(playerNumber +'Picture').insertAdjacentHTML('afterbegin' , selectNameType);
  if(selectName == 'Soldier'){
    document.getElementById('characterSelect').classList.add('hidden');
    player1Data = playerData[0];
  }else if(selectName == 'Ranger'){
    document.getElementById('characterSelect').classList.add('hidden');
    player1Data = playerData[1];
  }else if(selectName == 'Wizard'){
    document.getElementById('characterSelect').classList.add('hidden');
    player1Data = playerData[2];
  };
  
  if(selectName == 'Soldier2'){
    document.getElementById('characterSelect2').classList.add('hidden');
    player2Data = playerData[0];
  }else if(selectName == 'Ranger2'){
    document.getElementById('characterSelect2').classList.add('hidden');
    player2Data = playerData[1];
  }else if(selectName == 'Wizard2'){
    document.getElementById('characterSelect2').classList.add('hidden');
    player2Data = playerData[2];
  };
  
  });
}

// ログファンクション
let logIndex = 0;
function insertLog1 (texts){
  const logsElement = document.getElementById('gameLog'),
        createLog = document.createElement('p');
  logIndex++;
  createLog.innerHTML = logIndex +': '+'Player1 '+ texts;
  logsElement.insertBefore(createLog, logsElement.firstChild);
};
function insertLog2 (texts){
  const logsElement = document.getElementById('gameLog'),
        createLog = document.createElement('p');
  logIndex++;
  createLog.innerHTML = logIndex +': '+'Player2 '+ texts;
  logsElement.insertBefore(createLog, logsElement.firstChild);
};
function insertLog (texts){
  const logsElement = document.getElementById('gameLog'),
        createLog = document.createElement('p');
  logIndex++;
  createLog.innerHTML = logIndex +': '+ texts;
  logsElement.insertBefore(createLog, logsElement.firstChild);
};

// キーボード専用ファンクション
function characterSelectNameButton(selectName , selectNameType ,playerNumber ){

  document.getElementById(playerNumber +'Picture').insertAdjacentHTML('afterbegin' , selectNameType);
  if(selectName == 'Soldier'){
    document.getElementById('characterSelect').classList.add('hidden');
    player1Data = playerData[0];
  }else if(selectName == 'Ranger'){
    document.getElementById('characterSelect').classList.add('hidden');
    player1Data = playerData[1];
  }else if(selectName == 'Wizard'){
    document.getElementById('characterSelect').classList.add('hidden');
    player1Data = playerData[2];
  };
  
  if(selectName == 'Soldier2'){
    document.getElementById('characterSelect2').classList.add('hidden');
    player2Data = playerData[0];
  }else if(selectName == 'Ranger2'){
    document.getElementById('characterSelect2').classList.add('hidden');
    player2Data = playerData[1];
  }else if(selectName == 'Wizard2'){
    document.getElementById('characterSelect2').classList.add('hidden');
    player2Data = playerData[2];
  };
  
  };


function damageCalculation(attack ,defense){
  maxDamage = attack * (1 + damageRange);
  minDamage = attack * (1 - damageRange);
  attackDamage = Math.floor(Math.random) * (maxDamage - minDamage) + minDamage;
}

function draw(player1SelectAction,player2SelectAction,action){
  if( player1SelectAction && player2SelectAction){
    damage = player1Data[action]-player2Data[action];
    if(damage <= 0){
      damage = damage * -1;
    }
    
    if(player1Data[action] > player2Data[action]){
      hpGauge2 = player2Data['hp'] - damage;
      player2Data['hp'] = hpGauge2;
      insertLog('Player2に'+damage+'のダメージ');
    }else if(player2Data[action] > player1Data[action]){
      hpGauge1 = player1Data['hp'] - damage;
      player1Data['hp'] = hpGauge1;
      insertLog('Player1に'+damage+'のダメージ');
    }
      document.getElementById('hpGauge1').style.width = hpGauge1 + '%';
      document.getElementById('hpGauge2').style.width = hpGauge2 + '%';
      damage == 0;
  }
}
function winOrLose( player1SelectAction, player2SelectAction , action){
  if( player1SelectAction && player2SelectAction){
    damage = player2Data[action]
    hpGauge1 = player1Data['hp'] - damage;
    player1Data['hp'] = hpGauge1;
    document.getElementById('hpGauge1').style.width = hpGauge1 + '%';
    document.getElementById('hpGauge2').style.width = hpGauge2 + '%';
    insertLog('Player1に'+damage+'のダメージ');
    damage == 0;
    }else if(player2SelectActionKill && player1SelectAction ){
    damage = 30;
    hpGauge1 = player1Data['hp'] - damage;
    player1Data['hp'] = hpGauge1;
    document.getElementById('hpGauge1').style.width = hpGauge1 + '%';
    document.getElementById('hpGauge2').style.width = hpGauge2 + '%';
    insertLog('Player1に'+damage+'のダメージ');
    damage == 0;
    }
}
function winOrLose2( player1SelectAction, player2SelectAction , action){
  if( player1SelectAction && player2SelectAction){
    damage = player1Data[action]
    hpGauge2 = player2Data['hp'] - damage;
    player2Data['hp'] = hpGauge2;
    document.getElementById('hpGauge1').style.width = hpGauge1 + '%';
    document.getElementById('hpGauge2').style.width = hpGauge2 + '%';
    insertLog('Player2に'+damage+'のダメージ');
    damage == 0;
  }else if(player1SelectActionKill && player2SelectAction ){
    damage = 30;
    hpGauge2 = player2Data['hp'] - damage;
    player2Data['hp'] = hpGauge2;
    document.getElementById('hpGauge1').style.width = hpGauge1 + '%';
    document.getElementById('hpGauge2').style.width = hpGauge2 + '%';
    insertLog('Player2に'+damage+'のダメージ');
    damage == 0;
    }
}

characterSelectName('Soldier' , characterSelectSoldier , 'player1');
characterSelectName('Ranger' , characterSelectRanger , 'player1');
characterSelectName('Wizard' , characterSelectWizard , 'player1');
characterSelectName('Soldier2' , characterSelectSoldier2 , 'player2');
characterSelectName('Ranger2' , characterSelectRanger2 , 'player2');
characterSelectName('Wizard2' , characterSelectWizard2 , 'player2');

// ルール説明
document.getElementById('stickmanBattleRuleButton').addEventListener('click' , function(){
  document.getElementById('stickmanBattleRule').classList.toggle('show');
  document.getElementById('stickmanBattleRuleButton').classList.toggle('show');
});


document.getElementById('attack').addEventListener('click',function(){
  if(player1AttackCount == 0){
  player1SelectAction = true;
  player1SelectActionAttack = true;
  player1Decision = true;
  player1AttackCount += 1;
  if(player1CounterCount == 1 || player1MagicCount == 1){
    player1CounterCount = 0;
    player1MagicCount = 0;
    player1SelectActionCounter = false;
    player1SelectActionMagic = false;
    player1SelectAction = false;
  }
  }else if(player1AttackCount == 1){
    insertLog1('同じ技は使えません');
  }
  });
document.getElementById('counter').addEventListener('click',function(){
  if(player1CounterCount == 0){
    player1SelectAction = true;
    player1SelectActionCounter = true;
    player1Decision = true;
    player1CounterCount += 1;
    if(player1AttackCount == 1 || player1MagicCount == 1){
      player1AttackCount = 0;
      player1MagicCount = 0;
      player1SelectActionAttack = false;
      player1SelectActionMagic = false;
      player1SelectAction = false;
    }
    }else if(player1CounterCount == 1){
      insertLog1('同じ技は使えません')
    }
  });
document.getElementById('magic').addEventListener('click',function(){
  if(player1MagicCount == 0){
    player1SelectAction = true;
    player1SelectActionMagic = true;
    player1Decision = true;
    player1MagicCount += 1;
    if(player1CounterCount == 1 || player1AttackCount == 1){
      player1CounterCount = 0;
      player1AttackCount = 0;
      player1SelectActionCounter = false;
      player1SelectActionAttack = false;
      player1SelectAction = false;
    }
    }else if(player1MagicCount == 1){
      insertLog1('同じ技は使えません')
    }
  });
document.getElementById('kill').addEventListener('click',function(){
  if(player1KillCount == 0){
    player1SelectAction = true;
    player1SelectActionKill = true;
    player1Decision = true;
    player1KillCount += 1;
    if(player1CounterCount == 1 || player1AttackCount == 1 || player1MagicCount == 1){
      player1CounterCount = 0;
      player1AttackCount = 0;
      player1MagicCount = 0;
      player1SelectActionCounter = false;
      player1SelectActionAttack = false;
      player1SelectActionMagic = false;
      player1SelectAction = false;
    }
    }else if(player1KillCount == 1){
      insertLog1('同じ技は使えません')
      player1SelectActionKill = false;
    }
  });
  
document.getElementById('attack2').addEventListener('click',function(){
  if(player2AttackCount == 0){
    player2SelectAction = true;
    player2SelectActionAttack = true;
    player2Decision = true;
    player2AttackCount += 1;
    if(player2CounterCount == 1 || player2MagicCount == 1){
      player2CounterCount = 0;
      player2MagicCount = 0;
      player2SelectActionCounter = false;
      player2SelectActionMagic = false;
      player2SelectAction = false;
    }
    }else if(player2AttackCount == 1){
      insertLog2('同じ技は使えません')
    }
  });
document.getElementById('counter2').addEventListener('click',function(){
  if(player2CounterCount == 0){
    player2SelectAction = true;
    player2SelectActionCounter = true;
    player2Decision = true;
    player2CounterCount += 1;
    if(player2AttackCount == 1 || player2MagicCount == 1){
      player2AttackCount = 0;
      player2MagicCount = 0;
      player2SelectActionAttack = false;
      player2SelectActionMagic = false;
      player2SelectAction = false;
    }
    }else if(player2CounterCount == 1){
      insertLog2('同じ技は使えません')
    }
  });
document.getElementById('magic2').addEventListener('click',function(){
  if(player2MagicCount == 0){
    player2SelectAction = true;
    player2SelectActionMagic = true;
    player2Decision = true;
    player2MagicCount += 1;
    if(player2CounterCount == 1 || player2AttackCount == 1){
      player2CounterCount = 0;
      player2AttackCount = 0;
      player2SelectActionCounter = false;
      player2SelectActionAttack = false;
      player2SelectAction = false;
    }
    }else if(player2MagicCount == 1){
      insertLog2('同じ技は使えません')

    }
  });
  document.getElementById('kill2').addEventListener('click',function(){
    if(player2KillCount == 0){
      player2SelectActionKill = true;
      player2SelectAction = true;
      player2Decision = true;
      player2KillCount += 1;
      if(player2CounterCount == 1 || player2AttackCount == 1 || player2MagicCount == 1){
        player2CounterCount = 0;
        player2AttackCount = 0;
        player2MagicCount = 0;
        player2SelectActionCounter = false;
        player2SelectActionAttack = false;
        player2SelectActionMagic = false;
        player2SelectAction = false;
      }
      }else if(player2KillCount == 1){
        insertLog2('同じ技は使えません')
        player2SelectActionKill = false;
      }
    });

    // characterSelectName('Soldier' , characterSelectSoldier , 'player1');
    // characterSelectName('Ranger' , characterSelectRanger , 'player1');
    // characterSelectName('Wizard' , characterSelectWizard , 'player1');
    // characterSelectName('Soldier2' , characterSelectSoldier2 , 'player2');
    // characterSelectName('Ranger2' , characterSelectRanger2 , 'player2');
    // characterSelectName('Wizard2' , characterSelectWizard2 , 'player2');
    
    document.addEventListener('keydown',
    event => {
      if (event.key === 'q' ) {
        characterSelectNameButton('Soldier' , characterSelectSoldier , 'player1')
      }
      if (event.key === 'w' ) {
        characterSelectNameButton('Ranger' , characterSelectRanger , 'player1')
      }
      if (event.key === 'e' ) {
        characterSelectNameButton('Wizard' , characterSelectWizard , 'player1')
      }
      if (event.key === 't' ) {
        characterSelectNameButton('Soldier2' , characterSelectSoldier2 , 'player2')
      }
      if (event.key === 'y' ) {
        characterSelectNameButton('Ranger2' , characterSelectRanger2 , 'player2');
      }
      if (event.key === 'u' ) {
        characterSelectNameButton('Wizard2' , characterSelectWizard2 , 'player2')
      }

        if (event.key === 'a' ) {
          if(player1AttackCount == 0){
            player1SelectAction = true;
            player1SelectActionAttack = true;
            player1Decision = true;
            player1AttackCount += 1;
            if(player1CounterCount == 1 || player1MagicCount == 1){
              player1CounterCount = 0;
              player1MagicCount = 0;
              player1SelectActionCounter = false;
              player1SelectActionMagic = false;
              player1SelectAction = false;
            }
            }else if(player1AttackCount == 1){
              insertLog1('同じ技は使えません');
            }
        }
        if (event.key === 's' ) {
          if(player1CounterCount == 0){
            player1SelectAction = true;
            player1SelectActionCounter = true;
            player1Decision = true;
            player1CounterCount += 1;
            if(player1AttackCount == 1 || player1MagicCount == 1){
              player1AttackCount = 0;
              player1MagicCount = 0;
              player1SelectActionAttack = false;
              player1SelectActionMagic = false;
              player1SelectAction = false;
            }
            }else if(player1CounterCount == 1){
              insertLog1('同じ技は使えません');
            }
        }
        if (event.key === 'z' ) {
          if(player1MagicCount == 0){
            player1SelectAction = true;
            player1SelectActionMagic = true;
            player1Decision = true;
            player1MagicCount += 1;
            if(player1CounterCount == 1 || player1AttackCount == 1){
              player1CounterCount = 0;
              player1AttackCount = 0;
              player1SelectActionCounter = false;
              player1SelectActionAttack = false;
              player1SelectAction = false;
            }
            }else if(player1MagicCount == 1){
              insertLog1('同じ技は使えません');
            }
        }
        if (event.key === 'x' ) {
          if(player1KillCount == 0){
            player1SelectAction = true;
            player1SelectActionKill = true;
            player1Decision = true;
            player1KillCount += 1;
            if(player1CounterCount == 1 || player1AttackCount == 1 || player1MagicCount == 1){
              player1CounterCount = 0;
              player1AttackCount = 0;
              player1MagicCount == 0;
              player1SelectActionCounter = false;
              player1SelectActionAttack = false;
              player1SelectActionMagic = false;
              player1SelectAction = false;
            }
            }else if(player1KillCount == 1){
              insertLog1('同じ技は使えません');
              player1SelectActionKill = false;
            }
        }
        if (event.key === 'o' ) {
          if(player2AttackCount == 0){
            player2SelectAction = true;
            player2SelectActionAttack = true;
            player2Decision = true;
            player2AttackCount += 1;
            if(player2CounterCount == 1 || player2MagicCount == 1){
              player2CounterCount = 0;
              player2MagicCount = 0;
              player2SelectActionCounter = false;
              player2SelectActionMagic = false;
              player2SelectAction = false;
            }
            }else if(player2AttackCount == 1){
              insertLog2('同じ技は使えません');
            }
        }
        if (event.key === 'p' ) {
          if(player2CounterCount == 0){
            player2SelectAction = true;
            player2SelectActionCounter = true;
            player2Decision = true;
            player2CounterCount += 1;
            if(player2AttackCount == 1 || player2MagicCount == 1){
              player2AttackCount = 0;
              player2MagicCount = 0;
              player2SelectActionAttack = false;
              player2SelectActionMagic = false;
              player2SelectAction = false;
            }
            }else if(player2CounterCount == 1){
              insertLog2('同じ技は使えません');
            }
        }
        if (event.key === 'k' ) {
          if(player2MagicCount == 0){
            player2SelectAction = true;
            player2SelectActionMagic = true;
            player2Decision = true;
            player2MagicCount += 1;
            if(player2CounterCount == 1 || player2AttackCount == 1){
              player2CounterCount = 0;
              player2AttackCount = 0;
              player2SelectActionCounter = false;
              player2SelectActionAttack = false;
              player2SelectAction = false;
            }
            }else if(player2MagicCount == 1){
              insertLog2('同じ技は使えません');
            }
        }
        if (event.key === 'l' ) {
          if(player2KillCount == 0){
            player2SelectActionKill = true;
            player2SelectAction = true;
            player2Decision = true;
            player2KillCount += 1;
            if(player2CounterCount == 1 || player2AttackCount == 1 || player2MagicCount == 1){
              player2CounterCount = 0;
              player2AttackCount = 0;
              player2MagicCount = 0;
              player2SelectActionCounter = false;
              player2SelectActionAttack = false;
              player2SelectActionMagic = false;
              player2SelectAction = false;
            }
            }else if(player2KillCount == 1){
              insertLog2('同じ技は使えません');
              player2SelectActionKill = false;
            }
        }
        if (event.key === 'f' ) {
          if(player1Decision && player2Decision ){
            draw(player1SelectActionAttack,player2SelectActionAttack,'attack');
            draw(player1SelectActionCounter,player2SelectActionCounter,'defence');
            draw(player1SelectActionMagic,player2SelectActionMagic,'magicalPower');
          
            winOrLose(player1SelectActionAttack, player2SelectActionCounter, 'defence')
            winOrLose(player1SelectActionCounter, player2SelectActionMagic, 'magicalPower')
            winOrLose(player1SelectActionMagic, player2SelectActionAttack, 'attack')
          
            winOrLose2(player1SelectActionAttack, player2SelectActionMagic, 'attack')
            winOrLose2(player1SelectActionCounter, player2SelectActionAttack, 'defence')
            winOrLose2(player1SelectActionMagic, player2SelectActionCounter, 'magicalPower')
          
            player1SelectAction = false;
            player1SelectActionAttack = false;
            player1SelectActionCounter = false;
            player1SelectActionMagic = false;
            player1SelectActionKill = false;
            player1Decision = false;
            player2SelectAction = false;
            player2SelectActionAttack = false;
            player2SelectActionCounter = false;
            player2SelectActionMagic = false;
            player2SelectActionKill = false;
            player2Decision = false;
          
            if( hpGauge1 <= 0){
              document.getElementById('hpGauge1').style.width = 0 + '%';
              document.getElementById('lose1').style.opacity = 1;
              document.getElementById('win2').style.opacity = 1;
            }else if( hpGauge2 <= 0){
              document.getElementById('hpGauge2').style.width = 0 + '%';
              document.getElementById('lose2').style.opacity = 1;
              document.getElementById('win1').style.opacity = 1;
            }
            }else{
            alert('コマンドを入力してください')
            }
        }
    });




  document.getElementById('senntou').addEventListener('click',function(){
  if(player1Decision && player2Decision ){
  draw(player1SelectActionAttack,player2SelectActionAttack,'attack');
  draw(player1SelectActionCounter,player2SelectActionCounter,'defence');
  draw(player1SelectActionMagic,player2SelectActionMagic,'magicalPower');

  winOrLose(player1SelectActionAttack, player2SelectActionCounter, 'defence')
  winOrLose(player1SelectActionCounter, player2SelectActionMagic, 'magicalPower')
  winOrLose(player1SelectActionMagic, player2SelectActionAttack, 'attack')

  winOrLose2(player1SelectActionAttack, player2SelectActionMagic, 'attack')
  winOrLose2(player1SelectActionCounter, player2SelectActionAttack, 'defence')
  winOrLose2(player1SelectActionMagic, player2SelectActionCounter, 'magicalPower')

  player1SelectAction = false;
  player1SelectActionAttack = false;
  player1SelectActionCounter = false;
  player1SelectActionMagic = false;
  player1SelectActionKill = false;
  player1Decision = false;
  player2SelectAction = false;
  player2SelectActionAttack = false;
  player2SelectActionCounter = false;
  player2SelectActionMagic = false;
  player2SelectActionKill = false;
  player2Decision = false;

  if( hpGauge1 <= 0){
    document.getElementById('hpGauge1').style.width = 0 + '%';
    document.getElementById('lose2').style.opacity = 1;
    document.getElementById('win2').style.opacity = 1;
  }else if( hpGauge2 <= 0){
    document.getElementById('hpGauge2').style.width = 0 + '%';
    document.getElementById('lose1').style.opacity = 1;
    document.getElementById('win1').style.opacity = 1;
  }
  }else{
  alert('コマンドを入力してください')
  }
  });
  
  







