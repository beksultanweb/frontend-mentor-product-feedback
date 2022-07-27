import "./style.css";
import Select from "react-select";

const SuggestionHeader = ({selectedOption, handleChange, handleAddFeedbackClick, options}) => {
    return (
        <div className="header">
            <div className="pre-header">
            <div><img src="assets/suggestions/icon-suggestions.svg" alt="suggestions" /></div>
            <div className="prefix">6 suggestions</div>
            <div>
            
                Sort by:
                <Select
                options={options}
                name="Sort by: "
                value={selectedOption}
                onChange={handleChange}
                isSearchable={false}/>
                {/* {isOpen && (
                
                    {options.map(option => (
                        <ListItem onClick={handleChange(option)} key={Math.random()}>
                        {option}
                        </ListItem>
                    ))}
                    
                )} */}
            
            </div>
            </div>
            <button className="add-feedback" onClick={handleAddFeedbackClick}>+ Add Feedback</button>
        </div>
    )
}
export default SuggestionHeader;