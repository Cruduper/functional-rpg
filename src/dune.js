const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {
      ...newState
    };
    return newState;
  };
};

// const playerStateControl = storeState();
// const enemyStateControl = storeState();



function characterCreation(house){
  return function(strength){
    return function (mind) {
      return function (cunning) {
        return function (spice) {
          return function (maxHp){
            return function(hp){
              return (state) => ({
                ...state,
                ["house"]: state["house"] = house,
                ["strength"]: state["strength"] = strength,
                ["mind"]: state["mind"] = mind,
                ["cunning"]: state["cunning"] = cunning,
                ["spice"]: state["spice"] = spice,
                ["maxHp"]: state["maxHp"] = maxHp,
                ["hp"]: state["hp"] = hp,
                ["level"]: state["level"] = 1
              });
            };
          };
        };
      };
    };
  };
}

// const changeState = (prop) => {
//   return (value) => {
//     return (state) => ({
//       ...state,
//       [prop]: state[prop] + value
//     });
//   };
// };

const levelUp = () => {
  return (state) => ({
    ...state,
    ["strength"]: Math.ceil(state["strength"] * 1.10),
    ["mind"]: Math.ceil(state["mind"] * 1.10),
    ["cunning"]: Math.ceil(state["cunning"] * 1.10),
    ["spice"]: state["spice"] = 0,
    ["maxHp"]: Math.ceil(state["maxHp"] * 1.10),
    ["hp"]: Math.ceil(state["maxHp"] * 1.10),
    ["level"] : state["level"] + 1
  });
};

//[prop]: (state[prop] || 0) + value
                                                    //(strength)(mind)(cunning)(spice)(maxHp)(hp)
const harkonnenCreation = characterCreation("Harkonnen")(10)(5)(13)(0)(20)(20);
const atreidesCreation = characterCreation("Atreides")(10)(10)(10)(0)(15)(15);
const beneGessCreation = characterCreation("Bene Gesserit")(8)(15)(15)(0)(10)(10);
const fremenCreation = characterCreation("Fremen")(12)(7)(7)(0)(15)(15);

function displayStats(playerState, enemyState = null){
  $("#house").text(`House: ${playerState.house}`);
  $("#strength").text(`Strength ${playerState.strength}`);
  $("#mind").text(`Mind: ${playerState.mind}`);
  $("#spice").text(`spice: ${playerState.spice}`);
  $("#level").text(`level: ${playerState.level}`);
  $("#hp").text(`${playerState.hp} / ${playerState.maxHp} hp`);
  if (enemyState != null){
    $("#eHouse").text(`House: ${enemyState.house}`);
    $("#eStrength").text(`Strength ${enemyState.strength}`);
    $("#eMind").text(`Mind: ${enemyState.mind}`);
    $("#eSpice").text(`spice: ${enemyState.spice}`);
    $("#eLevel").text(`level: ${enemyState.level}`);
    $("#eHp").text(`${enemyState.hp} / ${enemyState.maxHp} hp`);
  }
}
function createEnemy(){
  var enemyTypes = [harkonnenCreation, atreidesCreation, beneGessCreation, fremenCreation];
  var randomNum = Math.floor(Math.random() * enemyTypes.length);
  return enemyTypes[randomNum];
}

// $('select').on('change', function() {
//   alert( this.value );
// });



$(document).ready(function () {
  const enemyStateControl = storeState();
  const playerStateControl = storeState();
  var playerState = {};
  var enemyState = {};
  $('select#playerClass').on('change', function () {
    const inputClass = $("select#playerClass option:selected").val();
    if (inputClass === "Harkonnen") {
      playerState = playerStateControl(harkonnenCreation);
      console.log(playerState);
    }
    else if(inputClass === "Atreides"){
      playerState = playerStateControl(atreidesCreation);
      console.log(playerState);
    }
    else if(inputClass === "Benegesserit"){
      playerState = playerStateControl(beneGessCreation);
      console.log(playerState);
    }
    else if(inputClass === "Fremen"){
      playerState = playerStateControl(fremenCreation);
      console.log(playerState);
    }
    // enemyState = enemyStateControl(createEnemy());
    // console.log(enemyState);
    if (inputClass === "Default"){
      $("#stats").hide();
    }
    else{
      displayStats(playerState);
      $("#stats").show();
    }
  });

  $("form#playerForm").on('submit', function(){
    event.preventDefault();
    $("#playerForm").hide();
    enemyState = enemyStateControl(createEnemy());
    displayStats(playerState, enemyState);
    if(playerState.house === enemyState.house){
      alert('Betrayal!');
    }
  });
  
  $(".levelUp").on('click', function(){
    const leveler = levelUp();
    playerState = playerStateControl(leveler);
    displayStats(playerState);
  });
});

// nobles
// fremen
// beneGes

// attributes:
// strength
// cunning
// mind
// spice(xp)
// hp

// battle stuff:
// attack - 5 dmg
// dodge - negate incoming dmg
// ***** special ability - 10 dmg - uses mind, and depletes mind attribute each battle(at end of battle, refresh mind)


// **** special ability - on button press, charge = true, if charge = true, 0 dmg, display "charging ability"

// level system:
// level up with spice;
// stats would go up
// spice level = 0


// house stuff:
// harkonnen = cunning up, highest hp strength avg, mind low, 
// atreides = avg base stat, avg
// beneGes = mind up, cunning up. low hp
// fremen = highest strength, lowest cunning, avg mind, slightly higher hp, need 1.5x more spice to level


// special ability ideas:
// harkonnen = backstab - basic knife fight
// atreides = sword dance - basic sword fight
// beneGes = the voice(causes opponent to damage themselves)
// fremen = sandworm(super powerful, but takes two turns to charge, also does dmg to user)


// function characterCreation(strength)(mind)(cunning)(spice)(hp)




// {
//   ...state,
//   [strength] : state.strength = strengthVar;
//   mind : state.mind = mindVar;
//   [
// }

// const changeState = (prop) => {
//   return (value) => {
//     return (state) => ({
//       ...state,
//       [prop] : (state[prop] || 0) + value
//     })
//   }
// }