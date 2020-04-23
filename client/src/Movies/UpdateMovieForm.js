import React, { useState , useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initalMovie = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: Number,
    stars: [""] // can we do this 
}

const UpdateForm = props => {
 // use params and history obejcts 
 const { id } = useParams()
 const { push } = useHistory()
const [movie, setMovie] = useState(initalMovie)

const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'price') {
      value = parseInt(value, 10);
    }
    setMovie({
        ...movie,
        [ev.target.name]: value
    })
}
 // ********** Find the item and set it to state ********** //
  // get the id from params
  // loop through the items list to find the item
  // set the item to state to pre-populate the form
 // ********** Find the item and set it to state 
  useEffect(() => {
    const movieToUpdate = props.items.find(e => `${e.id}` === id)
        if(movieToUpdate){
            setMovie(movieToUpdate)
        }
  }, [props.movie, id])

  const handleSubmit = ev => {
    ev.preventDefault()
      axios
        .put(`http://localhost:3000/api/movies/${id}`,movie)
        .then(res => console.log(res))

  }

//make a put request to edit the movie 
//.put(`http://localhost:3333/items/${id}`, item)
      


return(
    <>
        <h2></h2>
        


    </>
    )
}
export default UpdateForm
