import styled from "styled-components";
import "./style.css";
// import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";

export const Arrow = styled("div")`
    border: solid #4661E6;
    margin-right: 15px;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
`;

const EditFeedback = ({handleSuggestionClick, handleDeleteFeedback, nameRef, detailRef, showError, showErrorName, updates, updateStatus, handleUpdateStatus, handleEditFeedback, handleEditFeedbackClick, data, handleAddFeedbackClick, handleNewFeedbackDetail, newFeedbackDetail, handleNewFeedbackTitle, newFeedbackTitle, options, categories, handleCategorySelected}) => {
    const params = useParams();
    console.log(params);
    return (
        <div className="feedback-detail-content">
            {data.filter((item) => String(item.id) === String(params.id)).map((product) => (
            <div key={product.id}>
            <Link to={{
                pathname: `/${product.id}`    
            }}><button className='go-back'><Arrow/>Go back</button></Link>
            
        
            <div className="feedback-detail-comments">
                <div className="suggestion-empty-title">Editing '{product.title}'</div>
                
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
                
                <div>Update Status</div>
                
                <Select
                options={updates}
                value={updateStatus}
                onChange={handleUpdateStatus}
                />
                
                <div>Feedback Detail</div>
                <textarea ref={detailRef} value={newFeedbackDetail} onChange={handleNewFeedbackDetail} name="" id="" cols="30" rows="10"></textarea>
                {showError&& <div style={{ color: "red" }}>can't be empty</div>}
                
                
        
                </div>
               
                <Link to='/'><button onClick={() => handleDeleteFeedback(product.id)}>Delete</button></Link>
                <Link to={{
                pathname: `/${product.id}`    
            }}><button>Cancel</button></Link>
                <button onClick={() => handleEditFeedback(product.id)} type="submit">Edit Feedback</button>
                </div>
        ))}
        </div>
    )
}
export default EditFeedback;