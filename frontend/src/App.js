import { useContext, useEffect, useState } from 'react'
import './App.css';
import Navbar from './components/navbar';
import { Loader } from './components/Loader';
import Home from './section/Home';
import Filters from './section/Filter';
import axios from 'axios';
import { API_URL } from './config';
import { DataContext } from './context/DataContext';
import Footer from './components/footer';


const App = () => {
	const [filters, setFilters] = useState({
		query: '',
		programType: '',
		sortBy: ''
	})
	const { query, programType, sortBy } = filters
	const updateFilters = (nextFilters) => {
		setFilters(prevFilters => {
			return { ...prevFilters, ...nextFilters }
		})
	}

	const [errContent, setError] = useState({
		isError: false,
		errMsg: ''
	})
	const { isError, errMsg } = errContent
	const updateError = (nextError) => {
		setError(prevError => {
			return { ...prevError, ...nextError }
		})
	}


	const [isLoading, setLoading] = useState(false);

	const { data, setData } = useContext(DataContext)

	useEffect(() => {
		setLoading(true)
		axios.get(API_URL + '/programs')
			.then(res => {
				setLoading(false)
				updateError({ isError: false })
				setData(res.data.results)
			})
	}, [])


	const axiosInstance = (url) => {
		updateError({ isError: false })
		setData([])
		setLoading(true)
		axios.get(url)
			.then(res => {
				setLoading(false)
				setData(res.data.results)
			})
			.catch(err => {
				setLoading(false)
				updateError({
					isError: true, errMsg: err.response.data.message
				})
			});
	}


	const handleInputChange = (e) => {
		var input_value = e.target.value
		updateFilters({ query: input_value })

		if (input_value.length < 3 && input_value.length > 0) {
			setData([])
			updateError({
				isError: true, errMsg: 'Query must be greater than 3 characters'
			})
		}
		else {
			updateError({ isError: false })
			setData([])
			const url = `${API_URL}/programs?search_query=${input_value}&program_type=${programType}&order_by=${sortBy}`
			axiosInstance(url)
		}
	}

	const handleProgramTypeChange = (e) => {
		var program_type = e.target.value
		updateFilters({ programType: program_type })
		const url = `${API_URL}/programs?search_query=${query}&program_type=${program_type}&order_by=${sortBy}`
		axiosInstance(url)
	}

	const handleSorting = (e) => {
		var order_by = e.target.value
		updateFilters({ sortBy: order_by })
		const url = `${API_URL}/programs?search_query=${query}&program_type=${programType}&order_by=${order_by}`
		axiosInstance(url)
	}

	return (
		<div className="App">
			<Navbar />
			<div className='main-container' style={{ padding: 20, marginTop: '2%' }}>
				<Filters
					search={{ query, handleInputChange }}
					program={{ programType, handleProgramTypeChange }}
					sort={{ sortBy, handleSorting }}
				/>
				{
					isLoading && <Loader />
				}
				{
					isError && <div className='error-msg'>{errMsg}</div>
				}
				{
					data.length > 0 && <Home />
				}
			</div>
			<Footer/>
		</div>
	);
}

export default App;