import { useState, useEffect, useRef } from 'react';
import API from '../API';

const initialState = {
	page: 0,
	results: [],
	total_pages: 0,
	total_results: 0,
};

export const useHomeFetch = () => {
	const [searchTerm, setSearchTerm] = useState(''),
		[state, setState] = useState(initialState),
		[loading, setLoading] = useState(false),
		[error, setError] = useState(false),
		[isLoadingMore, setIsLoadingMore] = useState(false);

	console.log(searchTerm);

	const fetchMovies = async (page, searchTerm = '') => {
		try {
			setError(false);
			setLoading(true);

			const movies = await API.fetchMovies(searchTerm, page);

			setState((prev) => ({
				...movies,
				results:
					page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
			}));
		} catch (error) {
			setError(true);
		}

		setLoading(false);
	};

	// Initial and search
	useEffect(() => {
		setState(initialState);
		fetchMovies(1, searchTerm);
	}, [searchTerm]); // Dependency array: Trigger use effect when Home component mount at initial render.

	useEffect(() => {
		if (!isLoadingMore) return;

		fetchMovies(state.page + 1, searchTerm);
		setIsLoadingMore(false);
	}, [isLoadingMore, searchTerm, state.page]);

	return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};
