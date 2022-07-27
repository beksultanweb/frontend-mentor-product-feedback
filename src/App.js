import './App.css';
import SuggestionHeader from "./components/suggestion-header";
import Sidebar from './components/suggestion-sidebar';
import SuggestionContent from './components/suggestion-content';
import FeedbackDetail from './components/feedback-detail';
import AddFeedback from './components/addfeedback';
import React, { useState } from 'react';
import data from "./data/data.json"

const options = [{ value: 'Most Upvotes', label: 'Most Upvotes'},
{ value: 'Least Upvotes', label: 'Least Upvotes'},
{ value: 'Most Comments', label: 'Most Comments'},
{ value: 'Least Comments', label: 'Least Comments'}];

function App() {
  const [suggestions, setSuggestions] = useState(data);
  const [feedbackDetailOpened, setFeedbackDetailOpened] = useState(false);
  const [addFeedbackOpened, setAddFeedbackOpened] = useState(false);
  

  const defaultValueIs = options.filter((option) => option.label === "Most Upvotes")
  const [selectedOption, setSelectedOption] = useState(defaultValueIs);
  const handleChange = (value) => {
    setSelectedOption(value);
  };

  // const filteredSuggestion = [];

  const handleSuggestionClick = ({id}) => {
    if(!feedbackDetailOpened){
      // const filteredSuggestion = data.map((req) => req.productRequests.filter((item) => item.id === id))
      const filteredSuggestion = data[0].productRequests.find((item) => item.id === id)

      setSuggestions(filteredSuggestion)
      // console.log(suggestions)
    }
    else setSuggestions(data)
    setFeedbackDetailOpened(!feedbackDetailOpened)
    
  }

  const handleAddFeedbackClick = ({id}) => {
    setAddFeedbackOpened(!addFeedbackOpened)
  }
  // console.log("suggestions", suggestions)
  return (
    <div className="App">
      {feedbackDetailOpened? <FeedbackDetail handleSuggestionClick={handleSuggestionClick} data={suggestions}/>
      :addFeedbackOpened? <AddFeedback handleAddFeedbackClick={handleAddFeedbackClick}/> : <div className="suggestion-components">
      <Sidebar/>
      <div className='right-bar'><SuggestionHeader handleAddFeedbackClick={handleAddFeedbackClick} handleChange={handleChange} options={options} selectedOption={selectedOption}/>
      <SuggestionContent data={suggestions} handleSuggestionClick={handleSuggestionClick}/>
      </div>
      </div>
      }
    </div>
  );
}

export default App;
