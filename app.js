const key = "35596d0ce1799b9e4c7617c1698f94dd";
const results__output = document.querySelector(".results__output");
const results__info = document.querySelector(".results__info");
const results = document.querySelector(".results");

const state = {
  userInput: "",
  results: [],
  people: []
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

async function showHtml(input) {
  let html = "";

  if (input === "") {
    results__output.innerHTML = html;
  } else {
    console.log(state.results);
    state.results.forEach(result => {
      resultHtml = `<div class='results__card'>`;

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

      resultHtml += `</div>`;

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

function showPeople(input) {
  let html = "";

  if (input === "") {
    results__info.innerHTML = html;
  } else {
    resultHtml = `<a href="#" class='results__people'>`;

    state.people.forEach(person => {
      resultHtml += `<p>${person.name}</p>`;
    });

    resultHtml += `</a>`;

    // html = `<ul>
    //   <li><a href="#" id="resultsMovies">Movies</a></li>
    //   <li><a href="#" id="resultsRelated">Related Movies</a></li>
    //   <li><a href="#" id="resultstvShows">TV Shows</a></li>
    //   <li><a href="#" id="resultsPeople">People</a></li>
    //   </ul>`;
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
    showPeople();
    clearSearchInput();
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
