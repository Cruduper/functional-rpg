// Code courtesy of @travisty12
// This function stores an individual plant’s state.

const storePlantState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {
      ...newState
    };
    return newState;
  };
};

// This is a function factory, whose innermost return function gets passed into the return function of storePlantState, and becomes the stateChangeFunction. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

const changePlantState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    });
  };
};

// This function stores the list of plants.

const storeListState = () => {
  let currentState = [];
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = [...newState];
    return newState;
  };
};

// This is a function factory, whose return function gets passed into the return function of storeListState, and becomes the stateChangeFunction.

const changeListState = (plant) => {
  return (state) => ([
    ...state,
    plant
  ]);
};

// We create four functions using our function factory. We could easily create many more.

// const feed = changePlantState("soil")(1);
const blueFood = changePlantState("soil")(5);

// const hydrate = changePlantState("water")(1);
// const superWater = changePlantState("water")(5);

$(document).ready(function () {

  const listControl = storeListState();

  $('#new-plant').click(function () {
    const plantControl = storePlantState();
    const addPlant = changeListState(plantControl);
    const newList = listControl(addPlant);
    $('#output').append(`
    <div>
      <p id="soil-value-${newList.length - 1}">Soil: 0</p>
      <button id="feed-${newList.length - 1}" class="feed">Feed</button>
    </div>
  `);
  });

  // This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.

  $('body').on('click', '.feed', function () {
    const id = parseInt(this.id.slice(5));
    const stateControl = listControl()[id];
    const newState = stateControl(blueFood);
    $(`#soil-value-${id}`).text(`Soil: ${newState.soil}`);
  });
  // This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.
  $('#show-state').click(function () {
    const id = parseInt(this.id.slice(5));
    const stateControl = listControl()[id];
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = stateControl();
    $(`#soil-value-${id}`).text(`Soil: ${currentState.soil}`);
  });
});





