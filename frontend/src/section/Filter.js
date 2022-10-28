import DropDown from "../components/dropdown"
import '../css/filter.css'



const SearchInput = ({ value, handleInputChange }) => {
	return <div className='search-input'>
		<input
			type='text'
			placeholder="Search with any Movie or Series name."
			value={value}
			onChange={handleInputChange} />
	</div>
}


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



const Filters = ({search, program, sorting}) => {
    return <div className='filter-section'>
        <SearchInput
            value={search.query}
            handleInputChange={search.handleInputChange}
        />
        <DropDown
            title="Select Program Type"
            optionList={programList}
            value={program.programType}
            handleChange={program.handleProgramTypeChange}
        />
        <DropDown
            title="Sort By"
            optionList={sortList}
            value={sorting.sort}
            handleChange={sorting.handleSorting}
        />
    </div>
}

export default Filters