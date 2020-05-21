import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateMovieForm from "./Movies/UpdateMovieForm";
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {
  const [updateList, setUpdateList] = useState(false)
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const editMovie = () => {
    setUpdateList(!updateList)
  }

  useEffect(() => {
    getMovieList();
  }, [updateList]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} editMovie={editMovie} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} editMovie={editMovie} /> 
      </Route>

      <Route path = "/update-movie/:id" >
        <UpdateMovieForm movies={movieList} editMovie={editMovie}/>
      </Route>
      
    </>
  );
};

export default App;
