import React, { useState , useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initalMovie = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: Number,
    stars: [] 
}

const UpdateForm = ({movies, editMovie}) => {
 const { id } = useParams()
 const { push } = useHistory()
 const [movie, setMovie] = useState(initalMovie)

 console.log('form values', initalMovie)
 useEffect(() => {
  const movieToUpdate = movies.find(e => `${e.id}` === id)
      if(movieToUpdate){
        console.log(movieToUpdate)
          setMovie(movieToUpdate)
      }
}, [movies, id])

const changeHandler = ev => {
    // ev.persist();
    // let value = ev.target.value;
    // if (ev.target.name === 'price') {
    //   value = parseInt(value, 10);
    // }
    setMovie({
        ...movie,
        [ev.target.name]: ev.target.value
  })
}

  const handleSubmit = () => {
      axios
        .put(`http://localhost:5000/api/movies/${id}`,movie)
        .then(res => {
          console.log(res,"&&&&&&")
          editMovie()
        })
        .catch(err => console.log(err))
        push('/')
   }

return(
    <>
      <form onSubmit={handleSubmit}>
        <input 
          name = "title"
          type = "text" 
          value = {movie.title}
          onChange = {changeHandler}
          />
        <input
          name = "director"
          type = "text"
          value = {movie.director}
          onChange = {changeHandler}
          />
        <input 
          name = "metascore"
          type = "number"
          value = {movie.metascore}
          onChange = {changeHandler}
          />
        <input 
          name = "stars"
          type = "text"
          value = {movie.stars}
          onChange = {changeHandler}
          />
          <button>Update!</button>
      </form>
    </>
    )
}
export default UpdateForm

