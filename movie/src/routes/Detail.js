import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Home.module.css';
import styled from '../components/Movie.module.css';

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    setMovie(json.data.movie);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.detail}>Detail</h1>
      <div className={styled.movie}>
        <img
          className={styled.movie__img}
          src={movie.medium_cover_image}
          alt={movie.title}
        />
        <h2 className={styled.movie__title}>{movie.title}</h2>
        <h3 className={styled.movie__year}>{movie.year}</h3>
        <p>{movie.description_full}</p>
        <ul className={styled.movie__genres}>
          {movie.genres && movie.genres.map((g) => <li key={g}>{g}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Detail;
