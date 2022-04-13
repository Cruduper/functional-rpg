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
          return function (hp) {
            return (state) => ({
              ...state,
              ["house"]: state["house"] = house,
              ["strength"]: state["strength"] = strength,
              ["mind"]: state["mind"] = mind,
              ["cunning"]: state["cunning"] = cunning,
              ["spice"]: state["spice"] = spice,
              ["hp"]: state["hp"] = hp
            });
          };
        };
      };
    };
  };
}

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: state[prop] * 1.10;
    });
  };
};

const harkonnenCreation = characterCreation("Harkonnen")(10)(5)(13)(0)(20);
const atreidesCreation = characterCreation("Atreides")(10)(10)(10)(0)(15);
const beneGessCreation = characterCreation("Bene Gesserit")(8)(15)(15)(0)(10);
const fremenCreation = characterCreation("Fremen")(12)(7)(7)(0)(15);


$(document).ready(function () {
  // const enemyStateControl = storeState();

  $('form#playerForm').on('submit', function () {
    event.preventDefault();
    console.log("we in here");
    const inputClass = $("select#playerClass option:selected").val();
    const playerStateControl = storeState();
    var playerState = {};
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
    else{
      playerState = playerStateControl(fremenCreation);
      console.log(playerState);
    }
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