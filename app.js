const key = "35596d0ce1799b9e4c7617c1698f94dd";

const results__output = document.querySelector(".results__output");
const results__info = document.querySelector(".results__info");
const results__header = document.querySelector(".results__header");
const results__taggedPeople = document.querySelector(".results__taggedPeople");
const results = document.querySelector(".results");
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
const getResults = async (input, type) => {
  const response = await axios
    .get(
      `https://api.themoviedb.org/3/search/${type}?query=${input}&api_key=${key}`
    )
    .catch(error => {
      console.log(error);
    });
  return response.data.results;
};

// Gets the credit info for a person using a specific API call for just credits
const getCredits = async personId => {
  const response = await axios
    .get(
      `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${key}&language=en-US`
    )
    .catch(error => {
      console.log(error);
    });
  // returns this inforation to whatever is calling it
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

// Stores popular movies after using popular movies api, calls showHtml() to show this info on UI
const storePopularMovies = async () => {
  state.taggedPeople = [];
  tagPeople("");
  results__info.style.display = "none";

  state.results = await getPopularMovies();
  showHtml("input not needed", "popular_movies");
};

const showPopularTv = async () => {
  state.taggedPeople = [];
  tagPeople("");
  results__info.style.display = "none";

  state.results = await getPopularTv();
  showHtml("input not needed", "popular_tv");
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
      // TODO - push crew into array

      filmArray.push(element.cast);
    });

    const outputArray = compareArrays(filmArray[0], filmArray[1]);
    state.comparedResults = outputArray;
    showHtml("input not needed", "compared_search");
  } else if (state.taggedPeople.length === 3) {
    // Taking the compared results of the first 2 people
    filmArray.push(state.comparedResults);
    // Taking the third person
    filmArray.push(creditArray[creditArray.length - 1].cast);
    const outputArray = compareArrays(filmArray[1], filmArray[0]);
    // console.log(outputArray);
    state.comparedResultsThreePeople = outputArray;
    showHtml("input not needed", "compared_search_3");
  }

  // showHtml(input, type)

  // Very rough
  // state.results = outputArray;
  // showHtml("lol");
};

// Compare arrays for the compareCredits function
const compareArrays = (array1, array2) => {
  //We need a better version
  const outputArray = [];

  // Sort the arrays so we have k sorted arrays
  // console.log(array1);
  // console.log(array2);
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i].id === array2[j].id && array1[i].name === array2[j].name) {
        outputArray.push(array1[i]);
      } else {
        if (
          array1[i].id === array2[j].id &&
          array1[i].original_title === array2[j].original_title
        ) {
          outputArray.push(array1[i]);
        }
      }
    }
  }

  return outputArray;
};

const showResults = input => {
  // console.log(input);
  storeResults(input);
};

// Gets the results of a search and stores in the state
const storeResults = async input => {
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
  // console.log(state.taggedPeople);
};

const addPerson = clickedPerson => {
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

/////////////////// Gets and shows HTML info for results__card ///////////////////////////////////////////////////////////
const showHtmlCallback = (result, type) => {
  let resultHtml;
  resultHtml = `<div class='results__card'>`;

  /////////////////// MOVIE ///////////////////
  if (result.media_type === "movie") {
    if (result.poster_path) {
      console.log("image working");
      resultHtml += ` <div class = "results__card--image"</div><img src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.original_title}"></div>`;
      // resultHtml += `<div class = "results__card--image"><img class = "movie-image"  src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.original_title}"></div>`;
    }

    // resultHtml += `</div>`;

    // Creates a new div after the image
    resultHtml += `<div class = "results__card--info"><div class = "results__card--header">`;

    if (result.original_title) {
      resultHtml += `<p class = "results__card--title-movie">${truncateString(
        result.original_title,
        30
      )}</p>`;
    }
    if (result.release_date) {
      resultHtml += `<div class = "results__card--release"><p>${result.release_date}</p></div>`;
    }
    if (result.vote_average) {
      const voteAverage = voteAverageBorder(result);

      resultHtml += voteAverage;
    }
    // if (result.original_title) {
    //   resultHtml += `<div class = "results__card--header2"><div class = "results__card--title"><h2>${result.original_title}</h2></div>`;
    // }
    // if (result.release_date) {
    //   resultHtml += `<div class = "results__card--release"><p>${result.release_date}</p></div>`;
    // }

    resultHtml += `</div>`;

    // if (result.vote_average) {
    //   const voteAverage = voteAverageBorder(result);

    //   resultHtml += voteAverage;
    // }

    // if (result.vote_average) {
    //   resultHtml += `<div class = "results__card--voteraverage"><p>${Math.trunc(
    //     percentage(result.vote_average)
    //   )}%</p></div>`;
    // }

    if (result.overview) {
      resultHtml += `<div class = "results__card--overview"><p>${truncateString(
        result.overview,
        200
      )}</p></div>`;
    }

    resultHtml += `<div class = results__card--read-more>Read more</<div></div>`;

    // if (result.popularity) {
    //   resultHtml += `<div class = "results__card--popularity"><h3>Popularity</h3> <p>• ${result.popularity} •</p></div>`;
    // }
  }
  /////////////////// POPULAR MOVIE ///////////////////
  else if (type === "popular_movies") {
    if (result.poster_path) {
      console.log("image working");
      resultHtml += ` <div class = "results__card--image"</div><img src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.original_title}"></div>`;
      // resultHtml += `<div class = "results__card--image"><img class = "movie-image"  src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.original_title}"></div>`;
    }

    // resultHtml += `</div>`;

    // Creates a new div after the image
    resultHtml += `<div class = "results__card--info"><div class = "results__card--header">`;

    if (result.original_title) {
      resultHtml += `<p class = "results__card--title-movie">${truncateString(
        result.original_title,
        30
      )}</p>`;
    }
    if (result.release_date) {
      resultHtml += `<div class = "results__card--release"><p>${result.release_date}</p></div>`;
    }
    if (result.vote_average) {
      const voteAverage = voteAverageBorder(result);

      resultHtml += voteAverage;
    }
    // if (result.original_title) {
    //   resultHtml += `<div class = "results__card--header2"><div class = "results__card--title"><h2>${result.original_title}</h2></div>`;
    // }
    // if (result.release_date) {
    //   resultHtml += `<div class = "results__card--release"><p>${result.release_date}</p></div>`;
    // }

    resultHtml += `</div>`;

    // if (result.vote_average) {
    //   const voteAverage = voteAverageBorder(result);

    //   resultHtml += voteAverage;
    // }

    // if (result.vote_average) {
    //   resultHtml += `<div class = "results__card--voteraverage"><p>${Math.trunc(
    //     percentage(result.vote_average)
    //   )}%</p></div>`;
    // }

    if (result.overview) {
      resultHtml += `<div class = "results__card--overview"><p>${truncateString(
        result.overview,
        200
      )}</p></div>`;
    }

    resultHtml += `<div class = results__card--read-more>Read more</<div></div>`;

    // if (result.popularity) {
    //   resultHtml += `<div class = "results__card--popularity"><h3>Popularity</h3> <p>• ${result.popularity} •</p></div>`;
    // }
  }

  /////////////////// TV ///////////////////
  else if (result.media_type === "tv") {
    if (result.poster_path) {
      resultHtml += `<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.name}"></div>`;
    }
    // Creates a new div after the image
    resultHtml += `<div class = "results__card--info"><div class = "results__card--header">`;

    if (result.name) {
      resultHtml += `<div class = "results__card--header2"><div class = "results__card--title-tv"><p>${truncateString(
        result.name,
        30
      )}</p></div>`;
    }
    if (result.release_date) {
      resultHtml += `<div class = "results__card--release"><p>${result.release_date}</p></div>`;
    }

    resultHtml += `</div>`;

    if (result.vote_average) {
      const voteAverage = voteAverageBorder(result);

      resultHtml += voteAverage;
    }

    // if (result.vote_average) {
    //   resultHtml += `<div class = "results__card--voteraverage"><p>${Math.trunc(
    //     percentage(result.vote_average)
    //   )}%</p></div>`;
    // }

    resultHtml += `</div>`;

    if (result.overview) {
      resultHtml += `<div class = "results__card--overview"><p>${truncateString(
        result.overview,
        200
      )}</p></div>`;
    }
    resultHtml += `<div class = results__card--read-more>Read more</<div></div>`;
  }

  /////////////////// POPULAR TV ///////////////////
  else if (type === "popular_tv") {
    if (result.poster_path) {
      resultHtml += `<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.name}"></div>`;
    }
    // Creates a new div after the image
    resultHtml += `<div class = "results__card--info"><div class = "results__card--header">`;

    if (result.name) {
      resultHtml += `<div class = "results__card--header2"><div class = "results__card--title-tv"><p>${truncateString(
        result.name,
        30
      )}</p></div>`;
    }
    if (result.release_date) {
      resultHtml += `<div class = "results__card--release"><p>${result.release_date}</p></div>`;
    }

    if (result.vote_average) {
      const voteAverage = voteAverageBorder(result);

      resultHtml += voteAverage;
    }
    resultHtml += `</div>`;

    // if (result.vote_average) {
    //   resultHtml += `<div class = "results__card--voteraverage"><p>${Math.trunc(
    //     percentage(result.vote_average)
    //   )}%</p></div>`;
    // }

    resultHtml += `</div>`;

    if (result.overview) {
      resultHtml += `<div class = "results__card--overview"><p>${truncateString(
        result.overview,
        200
      )}</p></div>`;
    }
    resultHtml += `<div class = results__card--read-more>Read more</<div></div>`;
  }

  /////////////////// PERSON ///////////////////
  else if (result.media_type === "person" || type === "person") {
    if (result.profile_path) {
      resultHtml += `<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${result.profile_path}" alt="${result.name}"></div>`;
    }
    // Creates a new div after the image
    resultHtml += `<div class = "results__person">`;
    if (result.name) {
      resultHtml += `<div class = "results__person--header"><h2>${result.name}</h2>`;
    }
    if (result.known_for_department) {
      resultHtml += `<h3> ${result.known_for_department}<h3/>`;
    }

    resultHtml += `</div>`;

    if (result.known_for.length > 0) {
      resultHtml += `<div class = "results__person--main"><p>Known for</p>`;
      result.known_for.forEach(known_for => {
        resultHtml += `<p>• ${known_for.original_title ||
          known_for.original_name} •</p>`;
      });
    }

    resultHtml += `</div>`;

    if (result.popularity) {
      resultHtml += `<div class = "results__person--popularity"><h3>Popularity</h3> <p>• ${result.popularity} •</p></div>`;
    }

    resultHtml += `<div class = "results__card--tag"> <p>tag</p> <img id = "${result.id}" class="results__card--tag-icon" src="img/SVG/plus.svg" alt="plus icon"/></div></div>`;
  }

  /////////////////// POPULAR PERSON ///////////////////
  else if (type === "popular_people") {
    if (result.profile_path) {
      resultHtml += `<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${result.profile_path}" alt="${result.name}"></div>`;
    }
    // Creates a new div after the image
    resultHtml += `<div class = "results__person">`;
    if (result.name) {
      resultHtml += `<div class = "results__person--header"><p>${result.name}</p>`;
    }
    if (result.known_for_department) {
      resultHtml += `<h3>${result.known_for_department}<h3/>`;
    }

    resultHtml += `</div>`;

    if (result.known_for.length > 0) {
      resultHtml += `<div class = "results__person--main"><p>Known for</p>`;
      result.known_for.forEach(known_for => {
        resultHtml += `<p>• ${known_for.original_title ||
          known_for.original_name} •</p>`;
      });
    }

    resultHtml += `</div>`;

    resultHtml += `<div class = "results__card--tag"> <p>tag</p> <img id ="${result.id}" class="results__card--tag-icon" src="img/SVG/plus.svg" alt="plus icon"/></div></div>`;
  }

  // first div closes the right column, second dev closes results__card
  resultHtml += `
      </div> 
      </div>
    `;

  // html += resultHtml;
  return resultHtml;
};
//////////////////////////////////////////////////////////////////////////////////////////////

// The single function for any type of search html that is displayed to the user
const showHtml = (input, type) => {
  let html = "";

  if (input === "") {
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
        const nodes = document.querySelectorAll(".results__card--tag-icon");
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
        const nodes = document.querySelectorAll(".results__card--tag-icon");
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
    } else if (type === "compared_search") {
      state.comparedResults.forEach(
        result => (html += showHtmlCallback(result))
      );
      results__output.innerHTML = html;
    } else if (type === "compared_search_3") {
      state.comparedResultsThreePeople.forEach(
        result => (html += showHtmlCallback(result))
      );
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
      const nodes = document.querySelectorAll(".results__card--tag-icon");

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

const preventTab = e => {
  if (e.keyCode === 9 || e.which === 9) {
    e.preventDefault();
  }
};

const checkTabPress = e => {
  if (e.which === 9 || e.keyCode === 9) {
    results__info.style.display = "flex";
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

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

const percentage = num => {
  return (num / 10) * 100;
};

const voteAverageBorder = result => {
  let voteHtml = "";
  if (result.vote_average < 4) {
    voteHtml += `<div class = "results__card--voteraverage40 results__card--voteraverage"><p>${Math.trunc(
      percentage(result.vote_average)
    )}%</p></div>`;
  } else if (result.vote_average >= 4 && result.vote_average < 6) {
    console.log("working");
    console.log(result.vote_average);
    voteHtml += `<div class = "results__card--voteraverage4060 results__card--voteraverage"><p>${Math.trunc(
      percentage(result.vote_average)
    )}%</p></div>`;
  } else if (result.vote_average >= 6) {
    voteHtml += `<div class = "results__card--voteraverage60 results__card--voteraverage"><p>${Math.trunc(
      percentage(result.vote_average)
    )}%</p></div>`;
  }
  return voteHtml;
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
  if (state.taggedPeople.length > 0) {
    results__info.style.display = "flex";
  } else {
    results__info.style.display = "none";
  }
  handleChange(e);
};

searchInput.onkeydown = e => {
  checkTabPress(e);
  preventTab(e);
};

navMovies.onclick = () => {
  clearState();
  storePopularMovies();
};

navTv.onclick = () => {
  clearState();
  showPopularTv();
};

navPeople.onclick = () => {
  clearState();
  showPopularPeople();
};

navLang.onclick = () => {
  clearState();
  searchInput;
};

// clearButton.onclick = () => {
//   tagPeople("");
// };
