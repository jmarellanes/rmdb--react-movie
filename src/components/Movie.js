import { useParams } from 'react-router-dom';
// Components
import BreadCrumb from './BreadCrumb';
import Spinner from './Spinner';
import Grid from './Grid';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';
// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
// Image
import NoImage from '../images/no_image.jpg';

const Movie = () => {
	const { movieIdPath } = useParams();
	const { state: movie, loading, error } = useMovieFetch(movieIdPath);

	if (loading) return <Spinner />;
	if (error) return <div>Something went wrong...</div>;

	return (
		<>
			<BreadCrumb movieTitle={movie.original_title} />
			<MovieInfo movie={movie} />
			<MovieInfoBar
				time={movie.runtime}
				budget={movie.budget}
				revenue={movie.revenue}
			/>
			<Grid header="Actors">
				{movie.actors.map((actor) => (
					<Actor
						key={actor.credit_id}
						name={actor.name}
						character={actor.character}
						imageURL={
							actor.profile_path
								? IMAGE_BASE_URL + POSTER_SIZE + actor.profile_path
								: NoImage
						}
					/>
				))}
			</Grid>
		</>
	);
};

export default Movie;
