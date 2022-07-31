import "./style.css";
import Select, { components } from "react-select";

const styles = {
    control: (styles) => {
        return{
            ...styles,
            cursor: "pointer",
            backgroundColor: "#373F68",
            border: "none",
            color: "#FFFFFF"
        }
    },
    singleValue: (styles) => {
        return{
            color: "#F2F4FE"
        }
    },
    indicatorContainer: (styles) => {
        return{
            "&svg":{
                color: "#FFFFFF"
            }
        }
    },
    valueContainer: (styles) => {
        return{
            display: "flex",
            alignItems: "center"
        }
    },
    indicatorSeparator: (styles) => {
        return{
            width: 0
        }
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      console.log({ data, isDisabled, isFocused, isSelected });
      return {
        ...styles,
        color: isFocused? "#AD1FEA" : null,
        backgroundColor: "#fff",
        borderBottom: "1px solid rgba(58, 67, 116, 0.15)",
        cursor: "pointer",
        "&:last-child": {
            border: "none"
        }
      };
    }
  };

const { Option } = components;
const IconOption = (props) => 
    (
    <Option {...props}>
        {props.data.label}
    {props.isSelected ? (<img
      src={'./assets/shared/icon-check.svg'}
      style={{ float: "right", width: 12, marginTop: "4px" }}
      alt={props.data.label}
    />):("")}
    
  </Option>);

const SuggestionHeader = ({selectedOption, handleChange, handleAddFeedbackClick, options}) => {
    return (
        <div className="header">
            <div className="pre-header">
            <div><img src="assets/suggestions/icon-suggestions.svg" alt="suggestions" /></div>
            <div className="prefix">6 suggestions</div>
            <div>
                <Select
                options={options}
                value={selectedOption}
                onChange={handleChange}
                isSearchable={false}
                styles={styles}
                components={{ Option: IconOption }}/>
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