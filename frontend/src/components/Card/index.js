

import './card.css'

const MovieCard = ({ title, img_url, desc, year_of_release, program_type }) => {
    return (
        <div className="movie-card">
            <div className="card-img">
                <div>
                    <img src={img_url} alt={title} />
                </div>
            </div>
            <div className="card-content">
                <div className="card-details">
                    <span className="title"><strong>{title}</strong></span>
                    <span className="program-type">{program_type}</span>
                </div>
                <div className="year-of-release">{year_of_release}</div>
                {/* <div>{desc}</div> */}
            </div>
        </div>
    )
}

export default MovieCard;
