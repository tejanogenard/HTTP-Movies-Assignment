
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const MovieCard = ( {movie: {title, director, metascore, stars, id}, editMovie }) => {
  const [detailedCard, setDetailedCard] = useState(false)
  const history = useHistory()

  const detailCardHandler = () => {
    const card = `/movies/${id}`
    if(card === history.location.pathname) {
      setDetailedCard(true)
    } else {
      setDetailedCard(false)
    }
  }

  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res)
        editMovie()
      })
      .catch(err => console.log(err))
      history.push(`/`)
  }

  useEffect(() => {
    detailCardHandler()
  }, [])


  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      {detailedCard ? <button className="edit-button" onClick={() => history.push(`/update-movie/${id}`)}>Edit</button> : null}
      {detailedCard ? <button className="delete-button" onClick={handleDelete}>Delete</button> : null}
    </div>
  );
};

export default MovieCard;