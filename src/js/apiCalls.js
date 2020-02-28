export const key = "35596d0ce1799b9e4c7617c1698f94dd";

// Multi-search. Gets any search result - people/tv/movie
export const getResults = async (input, type) => {
  const response = await axios
    .get(
      `https://api.themoviedb.org/3/search/${type}?query=${input}&api_key=${key}`
    )
    .catch(error => {
      console.log(error);
    });
  return response.data.results;
};

// Not used now. Maybe later for getting individual movie data per person
export const getMovieData = async ID => {
  const response = await axios
    .get(`https://api.themoviedb.org/3/movie/${ID}?api_key=${key}`)
    .catch(error => {
      console.log(error);
    });
  return response.data;
};

// Gets the credit info for a person using a specific API call for just credits
export const getCredits = async personId => {
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
export const getPopularMovies = async () => {
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
export const getPopularTv = async () => {
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
export const getPopularPeople = async () => {
  const response = await axios
    .get(
      `https://api.themoviedb.org/3/person/popular?api_key=${key}&language=en-US&page=1`
    )
    .catch(error => {
      console.log(error);
    });
  return response.data.results;
};
