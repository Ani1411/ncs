
import { useEffect, useState } from 'react'
import MovieCard from '../components/Card';
import axios from 'axios'
import './../css/home.css'
import { API_URL } from '../config';

const Home = ({ data }) => {
    return (
        <div className="cards-layout">
            <div className='cards-container'>

                {
                    data.map(item => {
                        return <MovieCard
                            title={item.title}
                            img_url={item.poster_art_url}
                            desc={item.description}
                            year_of_release={item.release_year}
                            program_type={item.program_type}
                            key={item.title}
                        />
                    })
                }
            </div>
        </div>
    );
}

export default Home;