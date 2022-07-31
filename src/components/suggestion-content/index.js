import React from 'react'
import "./style.css";
import styled from "styled-components";

export const Arrow = styled("div")`
    border: solid #4661E6;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
`;

const SuggestionContent = ({data, handleSuggestionClick, addPlusOneUpvote, handleAddFeedbackClick}) => {
    // const amountComments = data.filter((item) => item.productRequests.filter((req) => req.comments.map((comment) => comment.id))).length;
  return (
    <div className='content'>
        {data.length > 0? data.map((item) => (
            <div key={item.id}>
                <button onClick={() => addPlusOneUpvote(item)} className='upvote'><Arrow/>{item.upvotes}</button>
            <div className="suggestion-item" onClick={() => handleSuggestionClick(item)}>
            <div className='suggestion-info'>
            
            <div>
                <div className="suggestion-title">{item.title}</div>
                <div className="suggestion-descr">{item.description}</div>
                <button>{item.category}</button>
            </div>
            </div>
            <div className='suggestion-comments'><img src="./assets/shared/icon-comments.svg" alt="comments" />{item.comments? item.comments.length: 0}</div>
            
        </div>
            </div>
        )):<div className='content-empty'><img className='suggestion-empty' src='./assets/suggestions/illustration-empty.svg' alt='No data available' />
        <div className='suggestion-empty-title'>There is no feedback yet.</div>
        <div className="suggestion-descr margin">Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</div>
        <button onClick={handleAddFeedbackClick} className='add-feedback'>+ Add Feedback</button>
        </div>
        }
    </div>
  )
}

export default SuggestionContent;
