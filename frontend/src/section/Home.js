
import { useContext } from 'react'
import MovieCard from '../components/Card';
import { DataContext } from '../context/DataContext';
import './../css/home.css'

const Home = () => {
    const { data } = useContext(DataContext)
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