import axios from "axios";
require("dotenv").config();

export async function fetchNewMovies() {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/trending/movie/day",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.BEARER,
    },
  };
  var response = await axios.request(options);
  console.log("----------");

  return response.data.results;
}

export async function fetchMovie(movieId: string) {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/trending/all/${movieId}",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.BEARER,
    },
  };
  var response = await axios.request(options);
  return response.data.results;
}

export async function fetchDiscoveryFeed() {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.BEARER,
    },
  };
  var response = await axios.request(options);
  return response.data.results;
}

export async function fetchMovieDetail(id : string) {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/"+id,
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.BEARER,
    },
  };``
  var response = await axios.request(options);
  //console.log(response)
  return response.data;
}

export async function fetchMovieVideo(id : string) {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/"+id+"/videos",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.BEARER,
      },
    };``
    var response = await axios.request(options);
    //console.log(response)
    return response.data;
  }
  