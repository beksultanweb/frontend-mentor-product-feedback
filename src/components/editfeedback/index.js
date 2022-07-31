import styled from "styled-components";
import "./style.css";
// import { useState } from "react";
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

const EditFeedback = ({Controller, handleSubmit, onSubmitData, control, handleChanged, handleChanged2, nameRef, detailRef, showError, showErrorName, updates, updateStatus, handleUpdateStatus, handleEditFeedback, handleEditFeedbackClick, data, handleAddFeedbackClick, handleNewFeedbackDetail, newFeedbackDetail, handleNewFeedbackTitle, newFeedbackTitle, options, categories, handleCategorySelected}) => {
    
    return (
        <div className="feedback-detail-content">
            <button className='go-back' onClick={handleEditFeedbackClick}><Arrow/>Go back</button>
            <form onSubmit={handleSubmit(handleEditFeedback)}>
        
            <div className="feedback-detail-comments">
                <div className="suggestion-empty-title">Editing '{data.title}'</div>
                
                <div className="user-name">Feedback Title</div>
                <div className="user-username">Add a short, descriptive headline</div>
                <input ref={nameRef} type="text" value={newFeedbackTitle} onChange={handleNewFeedbackTitle}/>
                {showErrorName&& <div style={{ color: "red" }}>can't be empty</div>}
                <div className="user-name">Category</div>
                <div className="user-username">Choose a category for your feedback</div>
                
                <Controller
          name="controlledSelect"
          control={control}
          defaultValue={options[0]}
        //   value={categories}
          render={() => (
                <Select
                options={options}
                value={categories}
                onChange={handleChanged}/>
                )}
        />
                <div>Update Status</div>
                <Controller
          name="controlledSelectVal"
          control={control}
          defaultValue={updates[0]}
        //   value={updateStatus}
          render={() => (
                <Select
                options={updates}
                value={updateStatus}
                onChange={handleChanged2}
                />
                )}
        />
                <div>Feedback Detail</div>
                <textarea ref={detailRef} value={newFeedbackDetail} onChange={handleNewFeedbackDetail} name="" id="" cols="30" rows="10"></textarea>
                {showError&& <div style={{ color: "red" }}>can't be empty</div>}
                
                
        
                </div>
               
                <button>Delete</button>
                <button onClick={handleEditFeedbackClick}>Cancel</button>
                <button type="submit">Edit Feedback</button>
                
              </form>
        </div>
    )
}
export default EditFeedback;