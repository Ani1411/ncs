import './dropdown.css'


const DropDown = ({ title, optionList, value, handleChange }) => {
    return <div>
        <select className="dropdown" name={title} value={value} onChange={handleChange} >
            <option value="">{title}</option>
            {
                optionList.map(item => {
                    return <option key={item.name} value={item.value}>{item.name}</option>
                })
            }
        </select>
    </div>
}

export default DropDown;