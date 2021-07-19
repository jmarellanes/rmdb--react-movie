import API from '../API';
import { BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE } from '../config';
// Hooks
import { useHomeFetch } from '../hooks/useHomeFetch';
// Assets
import NoImage from '../images/no_image.jpg';
// Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import SearchBar from './SearchBar';
import Spinner from './Spinner';
import Button from './Button';

const Home = () => {
	const { state, loading, error, searchTerm, setSearchTerm } = useHomeFetch();
	console.log(state);

	return (
		<>
			{!searchTerm && state.results[0] ? (
				<HeroImage
					image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
					title={state.results[0].original_title}
					text={state.results[0].overview}
				/>
			) : null}
			<SearchBar setSearchTerm={setSearchTerm} />
			<Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
				{state.results.map((movie) => (
					<Thumb
						key={movie.id}
						clickable
						image={
							movie.poster_path
								? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
								: NoImage
						}
						movieId={movie.id}
					/>
				))}
			</Grid>
			{loading && <Spinner />}
			{state.page < state.total_pages && !loading && (
				<Button text="Load More" />
			)}
		</>
	);
};

export default Home;
