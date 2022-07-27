import styled from "styled-components";
import "./style.css";
import { useState } from "react";

export const Arrow = styled("div")`
    border: solid #4661E6;
    margin-right: 15px;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
`;

const AddFeedback = ({handleAddFeedbackClick}) => {
    const [newFeedbackTitle, setNewFeedbackTitle] = useState("");
    const handleNewFeedbackTitle = (event) => {
        setNewFeedbackTitle(event.target.value)
    }
    return (
        <div className="feedback-detail-content">
            <button className='go-back' onClick={handleAddFeedbackClick}><Arrow/>Go back</button>
            <div className="feedback-detail-comments">
                <div className="suggestion-empty-title">Create New Feedback</div>
                <div className="user-name">Feedback Title</div>
                <div className="user-username">Add a short, descriptive headline</div>
                <input type="text" value={newFeedbackTitle} onChange={handleNewFeedbackTitle}/>
                <div className="user-name">Category</div>
                <div className="user-username">Choose a category for your feedback</div>
                <select name="" id=""></select>
            </div>
        </div>
    )
}
export default AddFeedback;