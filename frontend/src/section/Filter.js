import DropDown from "../components/dropdown"
import '../css/filter.css'


const Filters = ({ search, program, sort }) => {

    const programList = [
        { name: 'Movie', value: "movie" },
        { name: 'Series', value: "series" }
    ]

    const sortList = [
        { name: 'Title - Ascending', value: "title" },
        { name: 'Title - Descending', value: "-title" },
        { name: 'Release Year - Ascending', value: "release_year" },
        { name: 'Release Year - Descending', value: "-release_year" },
    ]

    return <div className='filter-section'>
        <div className='search-input'>
            <input
                type='text'
                placeholder="Search with any Movie or Series name."
                value={search.query}
                onChange={search.handleInputChange}
            />
        </div>
        <DropDown
            title="Select Program Type"
            optionList={programList}
            value={program.programType}
            handleChange={program.handleProgramTypeChange}
        />
        <DropDown
            title="Sort By"
            optionList={sortList}
            value={sort.sortBy}
            handleChange={sort.handleSorting}
        />
    </div>
}

export default Filters;