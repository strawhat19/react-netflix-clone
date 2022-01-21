import * as React from 'react';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './components/Auth/auth';
import Home from './components/Home/home';
import TVShows from './components/TVShows/tvshows';
import Movies from './components/Movies/movies';
import Latest from './components/Latest/latest';
import './sass/App.css';

// Global Variables
// Global State Interface
declare global { 
  interface State {
    user?: any,
    setUser?: any,
    email?:any,
    setEmail?:any,
    updateUser?: any,
    movie?:any,
    movies?: any,
    setMovie?: any,
    setMovies?: any,
    index?: any
    title?: string,
    open?:any,
    setOpen?:any,
    movieURL?: any,
    movieURLS?:any,
    fetchMovie?: any,
    bannerMovie?: any,
    randomMovieURL?: any,
    [key: string]: any
  }
}

// Global DOM Elements
export const wideW = `336px`;
export const wideH = `189px`;
export const posterW = `165px`;
export const posterH = `250px`;
export const plus = document.querySelector(`#plus`);
export const minus = document.querySelector(`#minus`);
export const banner = document.querySelector(`#banner`);
export const emailForm = document.querySelector(`#emailAddressForm`);
export const signUpForm = document.querySelector(`#signUpForm`);
export const signInForm = document.querySelector(`#signInForm`);
export const pageName = window.location.pathname.replace(`/`,``);
export const listItems:any = document.querySelector(`#listItems`);
export const sliderNext = document.querySelector(`.react-Slidy-next`);

// Testing or Default Movie
export const testingMovie:any = {
  "backdrop_path": "/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg",
  "first_air_date": "2021-11-06",
  "genre_ids": [
      16,
      10765,
      10759,
      18
  ],
  "id": 94605,
  "name": "Arcane",
  "origin_country": [
      "US"
  ],
  "original_language": "en",
  "original_name": "Arcane",
  "overview": "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
  "popularity": 443.323,
  "poster_path": "/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
  "vote_average": 9.1,
  "vote_count": 1557
}

// API Elements
export const APIKey = `da9b0d504005e1243db4e403678fba18`;
export const baseImageURL = `https://image.tmdb.org/t/p/original`;
export const baseTMDBURL = `https://api.themoviedb.org/3`
export const movieURLS = {
  trending: `${baseTMDBURL}/trending/all/week?api_key=${APIKey}&language=en-US`,
  netflixOriginals: `${baseTMDBURL}/discover/tv?api_key=${APIKey}&with_networks=213`,
  topRated: `${baseTMDBURL}/movie/top_rated?api_key=${APIKey}&language=en-US`,
  action: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=28`,
  comedy: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=35`,
  horror: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=27`,
  romance: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=10749`,
  documentaries: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=99`,
  inTheaters: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22`
}

// Object Variables
export const movieURLArray = Object.values(movieURLS);
export const lastMovieInArray = movieURLArray.length - 1;
export const randomMovieURL = movieURLArray[Math.floor(Math.random() * lastMovieInArray)];

// Helper Functions
// Cut Off Long Strings of Text
export const truncate = (string:string,end:number) => {
  return string?.length > end ? string?.substring(0, end - 1) + `-` : string;
}

// Capitalize First Letter of Word
export const capitalizeWord = (word?:any) => {
  let capitalizedWord = word?.charAt(0)?.toUpperCase() + word?.slice(1);
  return capitalizedWord || word;
}

// Remove Duplicate Objects from Array
export const removeDuplicateObjFromArray = (array?:any) => {
  const uniqueArray = array?.filter((value?:any, index?:any) => {
      const _value = JSON.stringify(value);
      return index === array?.findIndex((obj?:any) => {
          return JSON.stringify(obj) === _value;
      });
  });
  return uniqueArray;
}

// State
export const getCurrentUser:any = localStorage.getItem(`User`);
export const currentUser:any = JSON.parse(getCurrentUser);

// Add Movie
export const addMovie = async (movie?:any, user?:any, setUser?:any) => {
  const movieName = movie?.name || movie?.title || movie?.original_name;
  console.log(`Add Movie`, movieName);
  const emailAddress = user?.email;
  const username = user?.username;
  user?.list?.push(movie);
  const list = user?.list;
  setUser({
      username,
      email: emailAddress,
      password: user?.password,
      list: removeDuplicateObjFromArray(list?.reverse())
  })
}

// Delete Movie
export const deleteMovie = async (movie?:any, user?:any, setUser?:any) => {
  const movieName = movie?.name || movie?.title || movie?.original_name;
  console.log(`Delete Movie`, movieName);
  const emailAddress = user?.email;
  const username = user?.username;
  const movieID = movie?.id;
  const filteredArray = user?.list?.filter((item?:any,index?:any) => {
    if (item.id !== movieID) {
      item.id = index;
      return item;
    }
  });
  setUser({
    username,
    email: emailAddress,
    password: user?.password,
    list: removeDuplicateObjFromArray(filteredArray.reverse())
  })
}

// Update Movies
export const update = async (user?:any, setUser?:any, movie?:any, includes?:any) => {
  // console.log(`Update Movies`);
  const getUser:any = localStorage.getItem(`User`);
  user = JSON.parse(getUser) || user;
  if (includes) {
      deleteMovie(movie, user, setUser);
  } else {
    addMovie(movie, user, setUser);
  }
  localStorage.setItem(`Last User`, JSON.stringify(user));
}

// App Begin
const App:React.FC = () => {

  const getUser:any = localStorage.getItem(`User`) || localStorage.getItem(`Last User`);
  const [user, setUser] = useState<any>(JSON.parse(getUser));
  const [movie, setMovie] = useState<any>(null);
  const [email, setEmail] = useState<any>(null);

  useEffect(() => {

    const getLastUser:any = localStorage.getItem(`Last User`);
    const lastUser = JSON.parse(getLastUser);
    console.log(`List`, user?.list);
    console.log(`User`, user);
    console.log(`Last User`, lastUser);

  }, [user])

  return (
    <div className="App">
        <Router>
          {!user ? (
            <Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />
          ) : (
            <Routes>
              <Route path={ `/auth`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`./auth`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/signin`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`./signin`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/sign-in`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`./sign-in`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/login`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`./login`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/log-in`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`./log-in`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/signup`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`./signup`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/sign-up`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`./sign-up`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/register`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`./register`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/registration`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`./registration`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/authorization`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`./authorization`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`/`} element={<Home user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`./`} element={<Home user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/home`} element={<Home user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`./home`} element={<Home user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/shows`} element={<TVShows user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`./shows`} element={<TVShows user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/tvshows`} element={<TVShows user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`./tvshows`} element={<TVShows user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/tv-shows`} element={<TVShows user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`./tv-shows`} element={<TVShows user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/movies`} element={<Movies user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`./movies`} element={<Movies user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/hot`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`./hot`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/new`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`./new`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/latest`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`./latest`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/popular`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`./popular`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/trending`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`./trending`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/newpopular`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`./newpopular`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/new-popular`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`./new-popular`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
            </Routes>
          )}
        </Router>
      </div>
  );  
}


export default App