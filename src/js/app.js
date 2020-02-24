import {
  getResults,
  getMovieData,
  getCredits,
  getPopularMovies,
  getPopularTv,
  getPopularPeople
} from "./apiCalls/apiCalls";

import { compareArrays, removeUnwantedMedia, mergeArrays } from "./helpers";

import { showHtmlCallback } from "./htmlHandlers";

const results__home = document.querySelector(".results__home");
const results__homeMovies = document.querySelector(".results__home--movies");
const results__homeTv = document.querySelector(".results__home--tv");
const results__output = document.querySelector(".results__output");
const results__info = document.querySelector(".results__info");
const results__header = document.querySelector(".results__header");
const results__taggedPeople = document.querySelector(".results__taggedPeople");
const searchForm = document.querySelector(".searchbar__search");
const searchInput = document.querySelector(".search__input");
const navMovies = document.querySelector("#moviesButton");
const navTv = document.querySelector("#tvButton");
const navPeople = document.querySelector("#peopleButton");
const navLang = document.querySelector("#langButton");

const state = {
  userInput: "",
  results: [],
  comparedResults: [],
  comparedResultsThreePeople: [],
  taggedPeople: [],
  credits: new Map()
  // credits: {
  //   id: { cast: [{}, {}], crew: [{}, {}] }, // Get this data from API call and save it as a new K:V pair
  //   id: { cast: [{}, {}], crew: [{}, {}] },
  // },
  // cast: [{id: 34567, movie: little women, role: laurie}, {id: 2345678, movie: call me by your name, role: elio}]
};

///////////////// GETTING DATA FUNCTIONS /////////////////

///////////////// STATE MANAGING FUNCTIONS /////////////////

const showMovieData = async movieId => {
  state.taggedPeople = [];
  tagPeople("");
  state.results = await getMovieData(movieId);
};

// Stores popular movies after using popular movies api, calls showHtml() to show this info on UI
const showPopularMovies = async type => {
  state.taggedPeople = [];
  tagPeople("");
  results__info.style.display = "none";
  state.results = await getPopularMovies();
  if (type === "home") {
    showHtml("input not needed", "popMoviesHome");
  } else {
    showHtml("input not needed", "popular_movies");
  }
};

const showPopularTv = async type => {
  state.taggedPeople = [];
  tagPeople("");
  results__info.style.display = "none";

  state.results = await getPopularTv();

  if (type === "home") {
    showHtml("input not needed", "popTvHome");
  } else {
    showHtml("input not needed", "popular_tv");
  }
};

const showPopularPeople = async () => {
  state.taggedPeople = [];
  tagPeople("");
  results__info.style.display = "none";

  state.results = await getPopularPeople();
  showHtml("input not needed", "popular_people");
};

// Saves the credits for the chosen person into the state
const storeCredits = () => {
  state.taggedPeople.forEach(async person => {
    if (state.credits.get(person.id)) {
      return;
    } else {
      const response = await getCredits(person.id);

      //state.credits.push() - doesnt work as it creates a new array value each time rather that assigning K:V pairs
      state.credits.set(person.id, response);
      // state = {
      //   people: [{id:something}]
      //   credits: {
      //     person.id: response,                     //
      //     4598345798: { cast: [{}, {}], crew: [{}, {}] },  // result - what it WILL look like
      //   }
      // }

      // This will change the results__output div to show the movies that both the people from state.taggedPeople are in
      if (state.taggedPeople.length > 1) {
        compareCredits();
      }
    }
  });
};

// Compare's the credits of the people in the state.taggedPeople array
const compareCredits = () => {
  // Takes an object and changes its values into an array so we can loop over the values
  // creditArray is an array of objects - [{cast: [], crew: [], id: 3453534}, {}]. Each object is a person
  const creditArray = Array.from(state.credits.values());

  // New array that will hold smaller arrays of the films the people have been in
  const filmArray = [];

  if (state.taggedPeople.length === 2) {
    // Loop over the new array that holds the credits
    creditArray.forEach(element => {
      let tempArray = mergeArrays(element.cast, element.crew);
      filmArray.push(tempArray);
    });

    const outputArray = compareArrays(filmArray[0], filmArray[1]);
    state.comparedResults = outputArray;
    showHtml("input not needed", "compared_search");
  } else if (state.taggedPeople.length === 3) {
    // Taking the compared results of the first 2 people
    filmArray.push(state.comparedResults);
    // Taking the third person
    const mergedArray = mergeArrays(
      creditArray[creditArray.length - 1].cast,
      creditArray[creditArray.length - 1].crew
    );
    filmArray.push(mergedArray);
    const outputArray = compareArrays(filmArray[1], filmArray[0]);
    state.comparedResultsThreePeople = outputArray;
    showHtml("input not needed", "compared_search_3");
  }
};

// Gets the results of a search and stores in the state
const showResults = async input => {
  //
  if (input === "" && state.taggedPeople.length > 1) {
    showHtml("input not needed", "compared_search");
  } else if (input === "") {
    state.results = [];
    showHtml(input, "standard_search");
  } else {
    let results;
    if (state.taggedPeople.length > 0) {
      results = await getResults(input, "person");
    } else {
      results = await getResults(input, "multi");
    }
    state.results = results;
    // showHtml is called inside this function as
    // it has to be called after getResults has finished
    showHtml(input, "standard_search");
  }
};

// Checks that the first result in state.results is a person so they can be added to tags
// Then adds them to state.taggedPeople
const addFirstPerson = () => {
  if (state.taggedPeople.length === 0) {
    if (state.results[0].media_type === "person") {
      if (state.taggedPeople.includes(state.results[0])) {
        return;
      } else {
        state.taggedPeople.push(state.results[0]);
      }
    } else if (!state.results[0].media_type) {
      state.taggedPeople.push(clickedPerson);
    }
  } else {
    if (state.taggedPeople.includes(state.results[0])) {
      return;
    } else {
      state.taggedPeople.push(state.results[0]);
    }
  }
};

const addPerson = clickedPerson => {
  clearSearchInput();
  if (state.taggedPeople.length === 0) {
    if (state.results[0].media_type === "person") {
      if (state.taggedPeople.includes(clickedPerson)) {
        return;
      } else {
        state.taggedPeople.push(clickedPerson);
      }
    } else if (!clickedPerson.media_type) {
      state.taggedPeople.push(clickedPerson);
    }
  } else {
    if (state.taggedPeople.includes(clickedPerson)) {
      return;
    } else {
      state.taggedPeople.push(clickedPerson);
    }
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////

// The single function for any type of search html that is displayed to the user
const showHtml = (input, type) => {
  let html = "";

  if (input === "input not needed" && type === "popMoviesHome") {
    html += `<div class = "results__title"><p>Popular Movies</p></div>`;
    state.results.forEach(
      result => (html += showHtmlCallback(result, "popMoviesHome"))
    );
    results__homeMovies.innerHTML = html;
  } else if (input === "input not needed" && type === "popTvHome") {
    html += `<div class = "results__title"><p>Popular TV</p></div>`;
    state.results.forEach(
      result => (html += showHtmlCallback(result, "popTvHome"))
    );
    results__homeTv.innerHTML = html;
  } else if (input === "") {
    results__output.innerHTML = html;
  } else {
    // console.log(state.results);

    if (type === "standard_search") {
      // Going through stored results from storeResults()
      if (state.taggedPeople.length > 0) {
        state.results.forEach(result => {
          html += showHtmlCallback(result, "person");
          results__output.innerHTML = html;
        });
        const nodes = document.querySelectorAll(".results__card--tag");
        nodes.forEach(
          node =>
            (node.onclick = () => {
              const desiredResult = state.results.filter(
                result => result.id == node.id
              );

              results__info.style.display = "flex";
              addPerson(desiredResult[0]);
              tagPeople();
              storeCredits();
            })
        );
      } else {
        state.results.forEach(result => {
          html += showHtmlCallback(result);
          results__output.innerHTML = html;
        });
        const nodes = document.querySelectorAll(".results__card--tag");

        nodes.forEach(
          node =>
            (node.onclick = () => {
              const desiredResult = state.results.filter(
                result => result.id == node.id
              );

              results__info.style.display = "flex";
              addPerson(desiredResult[0]);
              tagPeople();
              storeCredits();
            })
        );
      }
      // cutting out the graham norton show, close up w the hollywood reporter, the academy awards, saturday night live etc
    } else if (type === "compared_search") {
      state.comparedResults.forEach(result => {
        const filteredResult = removeUnwantedMedia(result);
        if (filteredResult) {
          html += showHtmlCallback(filteredResult);
        } else return;
      });
      results__output.innerHTML = html;
    } else if (type === "compared_search_3") {
      state.comparedResultsThreePeople.forEach(result => {
        const filteredResult = removeUnwantedMedia(result);
        if (filteredResult) {
          html += showHtmlCallback(filteredResult);
        } else return;
      });
      results__output.innerHTML = html;
    } else if (type === "popular_movies") {
      html += `<div class = "results__title"><p>Popular Movies</p></div>`;
      state.results.forEach(
        result => (html += showHtmlCallback(result, "popular_movies"))
      );
      results__output.innerHTML = html;
    } else if (type === "popular_tv") {
      html += `<div class = "results__title"><p>Popular TV</p></div>`;
      state.results.forEach(
        result => (html += showHtmlCallback(result, "popular_tv"))
      );
      results__output.innerHTML = html;
    } else if (type === "popular_people") {
      html += `<div class = "results__title"><p>Popular People</p></div>`;
      state.results.forEach(result => {
        html += showHtmlCallback(result, "popular_people");
        results__output.innerHTML = html;
      });
      const nodes = document.querySelectorAll(".results__card--tag");

      nodes.forEach(
        node =>
          (node.onclick = () => {
            const desiredResult = state.results.filter(
              result => result.id == node.id
            );

            results__info.style.display = "flex";
            addPerson(desiredResult[0]);
            tagPeople();
            storeCredits();
          })
      );
    }
  }
};

const tagPeople = input => {
  let html = "";
  if (input === "") {
    results__taggedPeople.innerHTML = html;
    results__header.innerHTML = html;
  } else {
    renderResultsHeader();
    renderTaggedPeople();
    const clearTaggedPeopleButton = document.querySelector(
      ".results__header--clear"
    );
    if (clearTaggedPeopleButton) {
      clearTaggedPeopleButton.onclick = () => {
        clearState();
        results__info.style.display = "none";
        renderResultsHeader("clear");
        renderTaggedPeople();
      };
    }
  }
};

///////////////// HELPERS /////////////////

const clearState = () => {
  state.userInput = "";
  state.taggedPeople = [];
  state.comparedResults = [];
  state.comparedResultsThreePeople = [];
  state.credits = new Map();
};

const renderResultsHeader = type => {
  if (type === "clear") {
    results__header.innerHTML = "";
  } else {
    results__header.innerHTML = `
    <div class="results__header--title">Tagged</div>
    <button class="results__header--clear">clear</button>`;
  }
};

const renderTaggedPeople = () => {
  let html = "";
  results__taggedPeople.innerHTML = html;
  // results__header.insertAdjacentHTML("afterend", html);
  let resultHtml;

  resultHtml = `<a href="#" class='results__people'>`;

  state.taggedPeople.forEach(person => {
    resultHtml += `<p>${person.name}</p>`;
  });

  resultHtml += `</a>`;
  if (state.taggedPeople.length === 0) {
    resultHtml = "";
  }
  html += resultHtml;

  results__taggedPeople.innerHTML = html;
};

const checkTabPress = e => {
  if (e.which === 9 || e.keyCode === 9) {
    results__info.style.display = "flex";

    e.preventDefault();
    addFirstPerson();
    tagPeople();
    clearSearchInput();
    storeCredits();
  }
};

const clearSearchInput = () => {
  searchInput.value = "";
};

const controlSearch = () => {
  if (state.userInput === "") {
    return;
  }
  showResults(state.userInput);
};

const handleChange = e => {
  state.userInput = e.target.value;
  showResults(state.userInput);
};

///////////////// EVENT HANDLERS ///////////////////
searchForm.onsubmit = e => {
  e.preventDefault();
  controlSearch();
  document.activeElement.blur();
  if (searchInput.value === "") {
    clearSearchInput();
  }
};

//the same
// searchForm.addEventListener("submit", e => {
//   e.preventDefault();
//   controlSearch(e);
// });

searchInput.oninput = e => {
  if (state.taggedPeople.length > 0) {
    results__info.style.display = "flex";
  } else {
    results__info.style.display = "none";
  }
  handleChange(e);
};

searchInput.onkeydown = e => {
  results__home.innerHTML = "";
  checkTabPress(e);
};

navMovies.onclick = () => {
  results__home.innerHTML = "";
  clearState();
  showPopularMovies();
};

navTv.onclick = () => {
  results__home.innerHTML = "";
  clearState();
  showPopularTv();
};

navPeople.onclick = () => {
  results__home.innerHTML = "";
  clearState();
  showPopularPeople();
};

navLang.onclick = () => {
  clearState();
  // searchInput;
};

// clearButton.onclick = () => {
//   tagPeople("");
//

///////////////////////////////////////////////////////

const initLandingPage = () => {
  // adding home sets up the html for homepage
  showPopularMovies("home");
  showPopularTv("home");
};

console.log(state);
initLandingPage();
