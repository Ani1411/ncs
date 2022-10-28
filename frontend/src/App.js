import { useEffect, useState } from 'react'
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/Home';
import axios from 'axios';
import { API_URL } from './config';
import DropDown from './components/dropdown';

const App = () => {
	
	return (
		<div className="App">
			<Navbar />
			<div className='main-container' style={{ padding: 20 }}>
				
				<Home />
			</div>
		</div>
	);
}

export default App;
