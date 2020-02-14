const key = "35596d0ce1799b9e4c7617c1698f94dd";
const results__output = document.querySelector(".results__output");
const results__info = document.querySelector(".results__info");
const results = document.querySelector(".results");

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

async function getData(ID) {
  const response = await axios
    .get(`https://api.themoviedb.org/3/movie/${ID}?api_key=${key}`)
    .catch(error => {
      console.log(error);
    });
  return response.data;
}

async function getResults(input) {
  const response = await axios
    .get(
      `https://api.themoviedb.org/3/search/multi?query=${input}&api_key=${key}`
    )
    .catch(error => {
      console.log(error);
    });
  return response.data.results;
}

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

const storeCredits = () => {
  state.people.forEach(async person => {
    const response = await getCredits(person.id);

    state.credits[person.id] = response;

    // This will change the results__output div to show the movies that both the people from state.people are in
    if (state.people.length > 1) {
      compareCredits();
    }
  });
};

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
  showCompResultsHtml();

  // Very rough
  // state.results = outputArray;
  // showHtml("lol");
};

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

// async function showData(ID) {
//   const data = await getData(ID);

//   let html = `<div>
//         <p>${data.original_title}</p>
//         <p>${data.overview}</p>
//     </div>`;

//   results__output.innerHTML = html;
// }

function showResults(input) {
  // showPeople(input);
  storeResults(input);
}

const storeResults = async input => {
  if (input === "") {
    return;
  } else {
    const results = await getResults(input);
    console.log(results);
    state.results = results;
  }
  showHtml(input);
};

const checkFirst = () => {
  if (state.results[0].media_type === "person") {
    state.people.push(state.results[0]);
  }
  console.log(state.people);
};

const showCompResultsHtml = () => {
  let html = "";

  state.comparedResults.forEach(result => {
    resultHtml = `<div class='results__card'>`;

    if (result.original_title) {
      resultHtml += `<h2>${result.original_title}</h2>`;
    }
    if (result.name) {
      resultHtml += `<h2>${result.name}</h2>`;
    }

    if (result.vote_average) {
      resultHtml += `<p>${result.vote_average}</p>`;
    }
    if (result.release_date) {
      resultHtml += `<p>${result.release_date}</p>`;
    }
    if (result.known_for_department) {
      resultHtml += `<p>${result.known_for_department}</p>`;
    }

    resultHtml += `</div>`;

    html += resultHtml;
  });
  results__output.innerHTML = html;
};

function showHtml(input) {
  let html = "";

  if (input === "") {
    results__output.innerHTML = html;
  } else {
    console.log(state.results);
    state.results.forEach(result => {
      resultHtml = `<div class='results__card'>`;

      if (result.poster_path) {
        resultHtml += `<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.original_title}"></div>`;
      }
      resultHtml += `<div class = "results__card--info">`;

      if (result.original_title) {
        resultHtml += `<h2>${result.original_title}</h2>`;
      }

      if (result.release_date) {
        resultHtml += `<p>${result.release_date}</p>`;
      }
      if (result.name) {
        resultHtml += `<h2>${result.name}</h2>`;
      }
      if (result.vote_average) {
        resultHtml += `<p>${result.vote_average}</p>`;
      }
      if (result.known_for_department) {
        resultHtml += `<p>${result.known_for_department}</p>`;
      }

      resultHtml += `</div></div>`;

      html += resultHtml;
    });
    results__output.innerHTML = html;
  }
}

async function getPopularMovies() {
  const response = await axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
    )
    .catch(error => {
      console.log(error);
    });
  return response.data.results;
}

async function showPopularMovies() {
  state.people = [];
  tagPeople("");
  results__info.style.display = "none";
  let html = `<div class = "results__title">Popular Movies</div>`;
  const popMoviesArray = await getPopularMovies();

  popMoviesArray.forEach(movie => {
    html += `<div class='results__card'>
    <h2>${movie.original_title}</h2>
    <p>${movie.overview}</p>
    <p>${movie.release_date}</p>
    </div>`;
  });

  results__output.innerHTML = html;
}
async function getPopularTv() {
  const response = await axios
    .get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`
    )
    .catch(error => {
      console.log(error);
    });
  return response.data.results;
}

async function showPopularTv() {
  let html = `<div class = "results__title">Popular TV</div>`;
  const popTvArray = await getPopularTv();

  popTvArray.forEach(tv => {
    html += `<div class='results__card'>
      <h2>${tv.original_name}</h2>
      <p>${tv.overview}</p>
      <p>${tv.release_date}</p>
      </div>`;
  });

  results__output.innerHTML = html;
}

async function getPopularPeople() {
  const response = await axios
    .get(
      `https://api.themoviedb.org/3/person/popular?api_key=${key}&language=en-US&page=1`
    )
    .catch(error => {
      console.log("error");
    });
  return response.data.results;
}

async function showPopularPeople() {
  let html = `<div class = "results__title">Popular People</div>`;
  const popPeopleArray = await getPopularPeople();

  popPeopleArray.forEach(people => {
    html += `<div class='results__card'>
        <h2>${people.name}</h2>
        <p>${people.popularity}</p>
        <p>${people.known_for_department}</p>
        </div>`;
  });

  results__output.innerHTML = html;
}

function tagPeople(input) {
  let html = "";

  if (input === "") {
    results__info.innerHTML = html;
  } else {
    resultHtml = `<div class="results__header">
                  <div class="results__header--title">Tagged</div>
                  <button class="results__header--clear">clear</button>
                  </div>
                  <a href="#" class='results__people'>`;

    const clearButton = document.querySelector(".result__header--clear");

    state.people.forEach(person => {
      resultHtml += `<p>${person.name}</p>`;
    });

    resultHtml += `</a>`;
    html += resultHtml;
  }
  results__info.innerHTML = html;
}

const preventTab = e => {
  if (e.keyCode === 9 || e.which === 9) {
    e.preventDefault();
  }
};

const checkTabPress = e => {
  if (e.which === 9 || e.keyCode === 9) {
    checkFirst();
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

const searchForm = document.querySelector(".search");
const searchInput = document.querySelector(".search__input");
const navMovies = document.querySelector("#moviesButton");
const navTv = document.querySelector("#tvButton");
const navPeople = document.querySelector("#peopleButton");
const navLang = document.querySelector("#langButton");

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
  showPopularMovies();
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
