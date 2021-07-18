import { useState, useEffect } from "react";
import API from "../API";
import { BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE } from "../config";
// Hooks
import { useHomeFetch } from "../hooks/useHomeFetch";
// Components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";

import NoImage from "../images/no_image.jpg";

const Home = () => {
	const { state, loading, error } = useHomeFetch();
	console.log(state);

	return (
		<>
			{state.results[0] ? (
				<HeroImage
					image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
					title={state.results[0].original_title}
					text={state.results[0].overview}
				/>
			) : null}
			<Grid header="Popular Movies">
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
		</>
	);
};

export default Home;
