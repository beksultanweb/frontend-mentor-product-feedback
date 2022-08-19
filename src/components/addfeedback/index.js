import styled from "styled-components";
import "./style.css";
import Select from "react-select";
import { Link } from "react-router-dom";

export const Arrow = styled("div")`
    border: solid #4661E6;
    margin-right: 15px;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
`;

const AddFeedback = ({nameRef, detailRef, showError, showErrorName, handleAddNewFeedbackClick, handleAddFeedbackClick, handleNewFeedbackDetail, newFeedbackDetail, handleNewFeedbackTitle, newFeedbackTitle, options, categories, handleCategorySelected}) => {
    return (
        <div className="feedback-detail-content">
            <Link to="/">
            <button className='go-back'><Arrow/>Go back</button>
            </Link>
            
            <div className="feedback-detail-comments">
                <div className="suggestion-empty-title">Create New Feedback</div>
                <div className="user-name">Feedback Title</div>
                <div className="user-username">Add a short, descriptive headline</div>
                <input ref={nameRef} type="text" value={newFeedbackTitle} onChange={handleNewFeedbackTitle}/>
                {showErrorName&& <div style={{ color: "red" }}>can't be empty</div>}
                <div className="user-name">Category</div>
                <div className="user-username">Choose a category for your feedback</div>
                <Select
                options={options}
                value={categories}
                onChange={handleCategorySelected}/>
                <div>Feedback Detail</div>
                <textarea ref={detailRef} value={newFeedbackDetail} onChange={handleNewFeedbackDetail} name="" id="" cols="30" rows="10"></textarea>
                {showError&& <div style={{ color: "red" }}>can't be empty</div>}
                <Link to="/">
                <button onClick={handleAddFeedbackClick}>Cancel</button>
                </Link>
                <button onClick={handleAddNewFeedbackClick}>Add Feedback</button>
            </div>
        </div>
    )
}
export default AddFeedback;