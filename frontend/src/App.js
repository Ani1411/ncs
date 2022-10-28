import { useEffect, useState } from 'react'
import './App.css';
import Navbar from './components/navbar';
import { Loader } from './components/Loader';
import Home from './section/Home';
import Filters from './section/Filter';
import axios from 'axios';
import { API_URL } from './config';


const App = () => {
	const [query, setQuery] = useState('');
	const [movieList, setMovieList] = useState([]);
	const [programType, setProgramType] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		setIsLoading(true)
		axios.get(API_URL + '/programs')
			.then(res => {
				console.log(res)
				setIsLoading(false)
					setHasError(false)
					setMovieList(res.data.results)
			})
	}, [])


	const axiosInstance = (url) => {
		setHasError(false)
		setMovieList([])
		setIsLoading(true)
		axios.get(url)
			.then(res => {
				setIsLoading(false)
				setMovieList(res.data.results)
			})
			.catch(error => {
				console.log(error)
				setIsLoading(false)
				setHasError(true); setErrMsg(error.response.data.message);
			});
	}


	const handleInputChange = (e) => {
		var inputValue = e.target.value
		setQuery(inputValue)
		if (inputValue.length === 0) {
			axios.get(API_URL + '/programs')
				.then(res => {
					console.log(res)
					setIsLoading(false)
					setHasError(false)
					setMovieList(res.data.results)
				})
		}
		else if (inputValue.length < 3 && inputValue.length > 0) {
			setMovieList([])
			setHasError(true); setErrMsg('Query must be greater than 3 characters');
		}
		else {
			setHasError(false)
			setMovieList([])
			const url = `${API_URL}/programs?search_query=${inputValue}&program_type=${programType}&order_by=${sortBy}`
			axiosInstance(url)
		}
	}

	const handleProgramTypeChange = (e) => {
		setProgramType(e.target.value)
		const url = `${API_URL}/programs?search_query=${query}&program_type=${e.target.value}&order_by=${sortBy}`
		axiosInstance(url)
		
		
	}

	const handleSorting = (e) => {
		setSortBy(e.target.value)
		const url = `${API_URL}/programs?search_query=${query}&program_type=${programType}&order_by=${e.target.value}`
		axiosInstance(url)
	}

	return (
		<div className="App">
			<Navbar />
			<div className='main-container' style={{ padding: 20 }}>
				<Filters
					search={{ query, handleInputChange }}
					program={{ programType, handleProgramTypeChange }}
					sorting={{ sortBy, handleSorting }}
				/>
				{isLoading && <Loader />}
				{hasError && <div className='error-msg'>{errMsg}</div>}
				{
					movieList.length > 0 && <Home data={movieList} />
				}
			</div>
		</div>
	);
}

export default App;