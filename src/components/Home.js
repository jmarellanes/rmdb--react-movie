import { useState, useEffect } from "react";
import API from "../API";

// Hook

const Home = () => {
	const [state, setState] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const fetchMovies = async (page, searchTerm = "") => {
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

	// Initial render
	useEffect(() => {
		fetchMovies(1);
	}, []); // Dependency array: Trigger use effect when Home component mount at initial render

	console.log(state);

	return <div>Home Page</div>;
};

export default Home;
