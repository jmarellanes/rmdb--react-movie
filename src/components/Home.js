import { useState } from "react"

const Home = () => {
	const [state, setState] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);


	return <div>Home Page</div>
}

export default Home;
