import { useState, useEffect } from 'react';
import API from '../API';

export const useMovieFetch = (movieId) => {
	const [state, setState] = useState({}),
		[loading, setLoading] = useState(true),
		[error, setError] = useState(false);

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				setLoading(true);
				setError(false);

				const movie = await API.fetchMovie(movieId),
					credits = await API.fetchCredits(movieId),
					directors = credits.crew.filter(
						(member) => member.job === 'Director'
					);

				setState({
					...movie,
					actors: credits.cast,
					directors,
				});

				setLoading(false);
			} catch (error) {
				setError(true);
			}
		};

		fetchMovie();
	}, [movieId]);

	return { state, loading, error };
};
