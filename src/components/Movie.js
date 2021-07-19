import { useParams } from 'react-router-dom';
// Components
import BreadCrumb from './BreadCrumb';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
// Image
import NoImage from '../images/no_image.jpg';

const Movie = () => {
	const { movieIdPath } = useParams();
	const { state: movie, loading, error } = useMovieFetch(movieIdPath);

	if (loading) return <Spinner />;
	if (error) return <div>Something went wrong...</div>;

	console.log(movie);
	return (
		<>
			<BreadCrumb movieTitle={movie.original_title} />
			<MovieInfo movie={movie} />
		</>
	);
};

export default Movie;
