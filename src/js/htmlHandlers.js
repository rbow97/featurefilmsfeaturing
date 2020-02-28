import { truncateString, percentage } from "./helpers";

/////////////////// Gets and shows HTML info for results__card ///////////////////////////////////////////////////////////
export const showHtmlCallback = (result, type) => {
  let resultHtml;
  resultHtml = `<div class='results__card'>`;

  /////////////////// MOVIE ///////////////////

  if (result.media_type === "movie") {
    if (result.poster_path) {
      resultHtml += ` <div class = "results__card--image"</div><img src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.original_title}"></div>`;
    } else {
      `<div class = "results__card--imageplaceholder"></div>`;
    }

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

    resultHtml += `</div>`;

    if (result.overview) {
      resultHtml += `<div class = "results__card--overview"><p>${truncateString(
        result.overview,
        300
      )}</p></div>`;
    }
  }
  /////////////////// POPULAR MOVIE ///////////////////
  else if (type === "popular_movies") {
    if (result.poster_path) {
      resultHtml += ` <div class = "results__card--image"</div><img src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.original_title}"></div>`;
      // resultHtml += `<div class = "results__card--image"><img class = "movie-image"  src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.original_title}"></div>`;
    } else {
      `<div class = "results__card--imageplaceholder"></div>`;
    }

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

    resultHtml += `</div>`;

    if (result.overview) {
      resultHtml += `<div class = "results__card--overview"><p>${truncateString(
        result.overview,
        300
      )}</p></div>`;
    }
  }

  /////////////////// HOMEPAGE POPULAR MOVIES ////////////////////////////////////////
  else if (type === "popMoviesHome") {
    if (result.poster_path) {
      resultHtml += ` <div class = "results__card--image"</div><img src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.original_title}"></div>`;
    }

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

    resultHtml += `</div>`;

    if (result.overview) {
      resultHtml += `<div class = "results__card--overview"><p>${truncateString(
        result.overview,
        300
      )}</p></div>`;
    }
  }

  //////////////////// HOMEPAGE POPULAR TV /////////////////////////////////////
  else if (type === "popTvHome") {
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

    resultHtml += `</div>`;

    if (result.overview) {
      resultHtml += `<div class = "results__card--overview"><p>${truncateString(
        result.overview,
        300
      )}</p></div>`;
    }
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
        300
      )}</p></div>`;
    }
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
        300
      )}</p></div>`;
    }
  }

  /////////////////// PERSON ///////////////////
  else if (result.media_type === "person" || type === "person") {
    if (result.profile_path) {
      resultHtml += `<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${result.profile_path}" alt="${result.name}"></div>`;
    } else {
      resultHtml += `<div class = "results__card--image"><img src ="img/noimage.png" width = "185" height = "278"> </div>`;
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
      resultHtml += `<div class = "known-for-images">`;
      result.known_for.forEach((known_for, index) => {
        let displayTitle = "";
        if (known_for.original_title) {
          displayTitle = known_for.original_title;
        } else if (known_for.original_name) {
          displayTitle = known_for.original_name;
        } else {
          displayTitle = "";
        }

        if (known_for.poster_path) {
          resultHtml += `<div class = "known-for-title known-for-titles-${index +
            1}"><img class = "known-for-image" src = "https://image.tmdb.org/t/p/w94_and_h141_bestv2${
            known_for.poster_path
          }" alt = "${known_for.original_title ||
            known_for.original_name}"><a href = "#">${truncateString(
            displayTitle,
            25
          )}</a></div>`;
        } else {
          return;
        }
      });
      resultHtml += `</div>`;
    }

    resultHtml += `<div id ="${result.id}" class = " results__card--tag"> <p>tag</p> <img  class="results__card--tag-icon" src="img/SVG/plus.svg"/></div></div>`;
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
      resultHtml += `<div class = "known-for-images">`;
      result.known_for.forEach((known_for, index) => {
        let displayTitle = "";
        if (known_for.original_title) {
          displayTitle = known_for.original_title;
        } else if (known_for.original_name) {
          displayTitle = known_for.original_name;
        } else {
          displayTitle = "";
        }

        resultHtml += `<div class = "known-for-title known-for-titles-${index +
          1}"><img class = "known-for-image" src = "https://image.tmdb.org/t/p/w94_and_h141_bestv2${
          known_for.poster_path
        }" alt = "${known_for.original_title ||
          known_for.original_name}"><a href = "#">${truncateString(
          displayTitle,
          25
        )}</a></div>`;
      });
      resultHtml += `</div>`;
    }

    resultHtml += `<div id ="${result.id}" class = "results__card--tag"> <p>tag</p> <img  class="results__card--tag-icon" src="/img/SVG/plus.svg" alt="plus icon"/></div></div>`;
  }

  // first div closes the right column, second dev closes results__card
  resultHtml += `
        </div> 
        </div>
      `;

  // html += resultHtml;
  return resultHtml;
};

const voteAverageBorder = result => {
  let voteHtml = "";
  if (result.vote_average < 4) {
    voteHtml += `<div class = "results__card--voteraverage40 results__card--voteraverage"><p>${Math.trunc(
      percentage(result.vote_average)
    )}%</p></div>`;
  } else if (result.vote_average >= 4 && result.vote_average < 6) {
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
