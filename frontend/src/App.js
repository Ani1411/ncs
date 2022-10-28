import { useEffect, useState } from 'react'
import './App.css';
import Navbar from './components/navbar';
import Home from './section/Home';
import axios from 'axios';
import { API_URL } from './config';
import DropDown from './components/dropdown';

import Filters from './section/Filter';

const App = () => {
	const [query, setQuery] = useState('');
	const [movieList, setMovieList] = useState([]);
	const [programType, setProgramType] = useState('');
	const [sort, setSort] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [errMsg, setErrMsg] = useState('');


	const handleInputChange = (e) => {
		var inputValue = e.target.value
		setQuery(inputValue)
		if (inputValue.length < 3) return;


		// const url = API_URL + '/programs?search_query=' + inputValue

		// setIsLoading(true)

		// axios.get(url)
		// 	.then(response => {
		// 		setIsLoading(false)
		// 	})
		// 	.catch(error => {
		// 		console.log(error)
		// 	});
	}

	const handleProgramTypeChange = (e) => {
		e.preventDefault();
		console.log(e.target.value)
		setProgramType(e.target.value)
	}

	const handleSorting = (e) => {
		e.preventDefault();
		console.log(e.target.value)
		setSort(e.target.value)
	}

	return (
		<div className="App">
			<Navbar />
			<div className='main-container' style={{ padding: 20 }}>
				<Filters
					search={{ query, handleInputChange }}
					program={{ programType, handleProgramTypeChange }}
					sorting={{ sort, handleSorting }}
				/>
				{
					movieList.length > 0 && <Home />
				}
				<Home />
			</div>
		</div>
	);
}

export default App;