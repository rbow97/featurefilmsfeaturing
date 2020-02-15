const key = "35596d0ce1799b9e4c7617c1698f94dd";
const results__output = document.querySelector(".results__output");
const results__info = document.querySelector(".results__info");
const results = document.querySelector(".results");
const searchForm = document.querySelector(".search");
const searchInput = document.querySelector(".search__input");
const navMovies = document.querySelector("#moviesButton");
const navTv = document.querySelector("#tvButton");
const navPeople = document.querySelector("#peopleButton");
const navLang = document.querySelector("#langButton");

const state = {
  userInput: "",
  results: [],
  comparedResults: [],
  people: [],
  // credits: {
  //   id: { cast: [{}, {}], crew: [{}, {}] }, // Get this data from API call and save it as a new K:V pair
  //   id: { cast: [{}, {}], crew: [{}, {}] },
  // },
  credits: {},
  moviesInTogether: []
};

///////////////// GETTING DATA FUNCTIONS /////////////////

// Not used now. Maybe later for getting individual movie data per person
const getMovieData = async ID => {
  const response = await axios
    .get(`https://api.themoviedb.org/3/movie/${ID}?api_key=${key}`)
    .catch(error => {
      console.log(error);
    });
  return response.data;
};

// Multi-search. Gets any search result - people/tv/movie
const getResults = async input => {
  const response = await axios
    .get(
      `https://api.themoviedb.org/3/search/multi?query=${input}&api_key=${key}`
    )
    .catch(error => {
      console.log(error);
    });
  return response.data.results;
};

// Gets the credit info for a person
const getCredits = async personId => {
  const response = await axios
    .get(
      `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${key}&language=en-US`
    )
    .catch(error => {
      console.log(error);
    });
  return response.data;
};

// Gets current popular movies
const getPopularMovies = async () => {
  const response = await axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
    )
    .catch(error => {
      console.log(error);
    });
  return response.data.results;
};

// Gets popular tv shows
const getPopularTv = async () => {
  const response = await axios
    .get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`
    )
    .catch(error => {
      console.log(error);
    });
  return response.data.results;
};

// Get popular people
const getPopularPeople = async () => {
  const response = await axios
    .get(
      `https://api.themoviedb.org/3/person/popular?api_key=${key}&language=en-US&page=1`
    )
    .catch(error => {
      console.log("error");
    });
  return response.data.results;
};

///////////////// STATE MANAGING FUNCTIONS /////////////////

// Stores popular movies after using popular movies api, calls showHtml()
const storePopularMovies = async () => {
  state.people = [];
  tagPeople("");
  results__info.style.display = "none";

  state.results = await getPopularMovies();
  showHtml("input not needed", "popular_movies");
};

const showPopularTv = async () => {
  state.people = [];
  tagPeople("");
  results__info.style.display = "none";

  state.results = await getPopularTv();
  showHtml("input not needed", "popular_tv");
};

const showPopularPeople = async () => {
  state.people = [];
  tagPeople("");
  results__info.style.display = "none";

  state.results = await getPopularPeople();
  showHtml("input not needed", "popular_people");
};

// Saves the credits for the chosen person into the state
const storeCredits = () => {
  state.people.forEach(async person => {
    const response = await getCredits(person.id);

    //state.credits.push() - doesnt work as it creates a new array value each time rather that assigning K:V pairs
    state.credits[person.id] = response;
    // state = {
    //   people: [{id:something}]
    //   credits: {
    //     person.id: response,                     //
    //     4598345798: { cast: [{}, {}], crew: [{}, {}] },  // result - what it WILL look like
    //   }
    // }

    // This will change the results__output div to show the movies that both the people from state.people are in
    if (state.people.length > 1) {
      compareCredits();
    }
  });
};

// Compare's the credits of the people in the state.people array
const compareCredits = () => {
  // Takes an object and changes it's values into an array so we can loop over the values
  const creditArray = Object.values(state.credits);
  console.log(creditArray);

  // New array that will hold smaller arrays of the films the people have been in
  const filmArray = [];

  // Loop over the new array
  creditArray.forEach(element => {
    let tempArray = [];
    tempArray.push(element.cast);

    // TODO - push crew into array

    filmArray.push(tempArray);
  });
  console.log(filmArray);
  console.log(filmArray[0][0]);
  const outputArray = compareArrays(filmArray[1][0], filmArray[0][0]);

  state.comparedResults = outputArray;
  // showHtml(input, type)
  showHtml("input not needed", "compared_search");

  // Very rough
  // state.results = outputArray;
  // showHtml("lol");
};

// Compare arrays for the compareCredits function
const compareArrays = (array1, array2) => {
  //We need a better version
  const outputArray = [];

  // Sort the arrays so we have k sorted arrays

  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i].id === array2[j].id) {
        // console.log("successful comparison");
        outputArray.push(array1[i]);
      }
    }
  }
  return outputArray;
};

const showResults = input => {
  storeResults(input);
};

// Gets the results of a search and stores in the state
const storeResults = async input => {
  if (input === "") {
    return;
  } else {
    const results = await getResults(input);
    console.log(results);
    state.results = results;
  }
  // showHtml is called inside this function as
  // it has to be called after getResults has finished
  showHtml(input, "standard_search");
};

// Checks that the first result in state.results is a person so they can be added to tags
// Then adds them to state.people
// TODO - stop duplicates being added here - probably with a set
const addFirstPerson = () => {
  if (state.results[0].media_type === "person") {
    state.people.push(state.results[0]);
  }
  console.log(state.people);
};

const showHtmlCallback = (result, type) => {
  resultHtml = `<div class='results__card'>`;

  /////////////////// MOVIE ///////////////////
  if (result.media_type === "movie") {
    console.log("movie");
    if (result.poster_path) {
      resultHtml += `<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.original_title}"></div>`;
    }
    // Creates a new div after the image
    resultHtml += `<div class = "results__card--info">`;

    if (result.original_title) {
      resultHtml += `<h2>${result.original_title}</h2>`;
    }

    if (result.vote_average) {
      resultHtml += `<p>${result.vote_average}</p>`;
    }
    if (result.release_date) {
      resultHtml += `<p>${result.release_date}</p>`;
    }
  }
  /////////////////// POPULAR MOVIE ///////////////////
  else if (type === "popular_movies") {
    console.log("movie_popular");
    if (result.poster_path) {
      resultHtml += `<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.original_title}"></div>`;
    }
    // Creates a new div after the image
    resultHtml += `<div class = "results__card--info">`;

    if (result.original_title) {
      resultHtml += `<h2>${result.original_title}</h2>`;
    }

    if (result.overview) {
      resultHtml += `<p>${result.overview}</p>`;
    }
    if (result.release_date) {
      resultHtml += `<p>${result.release_date}</p>`;
    }
    if (result.popularity) {
      resultHtml += `<p>${result.popularity}</p>`;
    }
    if (result.vote_average) {
      resultHtml += `<p>${result.vote_average}</p>`;
    }
  }

  /////////////////// TV ///////////////////
  else if (result.media_type === "tv") {
    console.log("tv");
    if (result.poster_path) {
      resultHtml += `<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.name}"></div>`;
    }
    // Creates a new div after the image
    resultHtml += `<div class = "results__card--info">`;
    if (result.name) {
      resultHtml += `<h2>${result.name}</h2>`;
    }
    if (result.vote_average) {
      resultHtml += `<p>${result.vote_average}</p>`;
    }
    if (result.release_date) {
      resultHtml += `<p>${result.release_date}</p>`;
    }
  }

  /////////////////// POPULAR TV ///////////////////
  else if (type === "popular_tv") {
    if (result.poster_path) {
      resultHtml += `<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.name}"></div>`;
    }
    // Creates a new div after the image
    resultHtml += `<div class = "results__card--info">`;

    if (result.name) {
      resultHtml += `<h2>${result.name}</h2>`;
    }

    if (result.overview) {
      resultHtml += `<p>${result.overview}</p>`;
    }
    if (result.first_air_date) {
      resultHtml += `<p>${result.first_air_date}</p>`;
    }
    if (result.popularity) {
      resultHtml += `<p>${result.popularity}</p>`;
    }
    if (result.vote_average) {
      resultHtml += `<p>${result.vote_average}</p>`;
    }
  }

  /////////////////// PERSON ///////////////////
  else if (result.media_type === "person") {
    console.log("person");
    if (result.profile_path) {
      resultHtml += `<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${result.profile_path}" alt="${result.name}"></div>`;
    }
    // Creates a new div after the image
    resultHtml += `<div class = "results__card--info">`;
    if (result.name) {
      resultHtml += `<h2>${result.name}</h2>`;
    }
    if (result.known_for_department) {
      resultHtml += `<p>${result.known_for_department}</p>`;
    }
  }

  /////////////////// POPULAR PERSON ///////////////////
  else if (type === "popular_people") {
    if (result.profile_path) {
      resultHtml += `<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${result.profile_path}" alt="${result.name}"></div>`;
    }
    // Creates a new div after the image
    resultHtml += `<div class = "results__card--info">`;
    if (result.name) {
      resultHtml += `<h2>${result.name}</h2>`;
    }
    if (result.known_for_department) {
      resultHtml += `<p>${result.known_for_department}</p>`;
    }
    if (result.known_for.length > 0) {
      result.known_for.forEach(known_for => {
        resultHtml += `<p>${known_for.original_title ||
          known_for.original_name}</p>`;
      });
    }
  }

  // first div closes the right column, second dev closes results__card
  resultHtml += `
      </div> 
      </div>
    `;

  // html += resultHtml;
  return resultHtml;
};

// The single function for any type of search html that is displayed to the user
const showHtml = (input, type) => {
  let html = "";

  if (input === "") {
    results__output.innerHTML = html;
  } else {
    console.log(state.results);

    if (type === "standard_search") {
      // Going through stored results from storeResults()
      state.results.forEach(result => (html += showHtmlCallback(result)));
    } else if (type === "compared_search") {
      state.comparedResults.forEach(
        result => (html += showHtmlCallback(result))
      );
    } else if (type === "popular_movies") {
      html += `<div class = "results__title">Popular Movies</div>`;
      state.results.forEach(
        result => (html += showHtmlCallback(result, "popular_movies"))
      );
    } else if (type === "popular_tv") {
      html += `<div class = "results__title">Popular TV</div>`;
      state.results.forEach(
        result => (html += showHtmlCallback(result, "popular_tv"))
      );
    } else if (type === "popular_people") {
      html += `<div class = "results__title">Popular People</div>`;
      state.results.forEach(
        result => (html += showHtmlCallback(result, "popular_people"))
      );
    }
    results__output.innerHTML = html;
  }
};

const tagPeople = input => {
  let html = "";

  if (input === "") {
    results__info.innerHTML = html;
  } else {
    resultHtml = `<div class="results__header">
                  <div class="results__header--title">Tagged</div>
                  <button class="results__header--clear">clear</button>
                  </div>
                  <a href="#" class='results__people'>`;

    // const clearButton = document.querySelector(".result__header--clear");

    state.people.forEach(person => {
      resultHtml += `<p>${person.name}</p>`;
    });

    resultHtml += `</a>`;
    html += resultHtml;
  }
  results__info.innerHTML = html;
};

///////////////// HELPERS /////////////////
const preventTab = e => {
  if (e.keyCode === 9 || e.which === 9) {
    e.preventDefault();
  }
};

const checkTabPress = e => {
  if (e.which === 9 || e.keyCode === 9) {
    addFirstPerson();
    tagPeople();
    clearSearchInput();
    storeCredits();
  }
};

const clearSearchInput = e => {
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
};

//the same
// searchForm.addEventListener("submit", e => {
//   e.preventDefault();
//   controlSearch(e);
// });

searchInput.oninput = e => {
  results__info.style.display = "flex";
  handleChange(e);
};

searchInput.onkeydown = e => {
  checkTabPress(e);
  preventTab(e);
};

navMovies.onclick = () => {
  storePopularMovies();
};

navTv.onclick = () => {
  showPopularTv();
};

navPeople.onclick = () => {
  showPopularPeople();
};

navLang.onclick = () => {
  searchInput;
};

// clearButton.onclick = () => {
//   tagPeople("");
// };
