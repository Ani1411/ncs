
import { useEffect, useState } from 'react'
import MovieCard from '../components/Card';
import axios from 'axios'
import './../css/home.css'
import { API_URL } from '../config';

const Home = () => {
    const [data, setdata] = useState([]);
    useEffect(() => {

        axios.get(API_URL + '/programs')
            .then(res => {
                console.log(res)
                setdata(res.data.results)
            })

    }, [])

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
                        />
                    })
                }
            </div>
        </div>
    );
}

export default Home;