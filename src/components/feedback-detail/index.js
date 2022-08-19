import React from 'react'
import "./style.css";
import styled from "styled-components";
import Comment from './detail-comp/comment';
import { Link, useParams } from 'react-router-dom';

export const Arrow = styled("div")`
    border: solid #4661E6;
    margin-right: 15px;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
`;

export const ArrowUp = styled("div")`
    border: solid #4661E6;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
`;

const FeedbackDetail = ({setSuggestions, commentRef, showErrorComment, limit, handleAddComment, AddComment, newComment, addPlusOneUpvote, data}) => {
    // console.log("data: ", data)
    
    
    const params = useParams();
  return (
    
    <div className='feedback-detail-content'>
        {data.filter((item) => String(item.id) === String(params.id)).map((attr) => (
            <div key={attr.id}>
        <div className='feedback-detail-buttons'>
        <Link to="/"><button className='go-back'><Arrow/>Go back</button>
        </Link>
        <Link to={{
                pathname: `/editfeedback/${attr.id}`    
            }}><button className='edit-feedback'>Edit Feedback</button></Link></div>
            <div>
            <button onClick={() => addPlusOneUpvote(attr)} className='upvote'><ArrowUp/>{attr.upvotes}</button>
            <div className="suggestion-item">
            <div className='suggestion-info'>
            
            <div>
                <div className="suggestion-title">{attr.title}</div>
                <div className="suggestion-descr">{attr.description}</div>
                <button>{attr.category}</button>
            </div>
            </div>
            <div className='suggestion-comments'><img src="./assets/shared/icon-comments.svg" alt="comments" />{attr.comments? attr.comments.length: 0}</div>
            
            </div>
            </div>
            
        {attr.comments?
        <div className='feedback-detail-comments'>
        <div className="roadmap-title">{attr.comments? attr.comments.length: 0} comments</div>
        {attr.comments.map((comment) => (
        <Comment
            data={data}
            setSuggestions={setSuggestions}
            productId={attr.id}
            commentId={comment.id}
            text={comment.content}
            image={comment.user.image}
            name={comment.user.name}
            username={comment.user.username}
            replies={comment.replies}/>
        ))}
        </div>:""}
        <div className='feedback-detail-comments'>
            <div className="roadmap-title">Add Comment</div>
            <textarea ref={commentRef} name="" maxLength={250} value={newComment} onChange={handleAddComment} placeholder="Type your comment here" id="" cols="30" rows="4"></textarea>
            {showErrorComment && <div style={{ color: "red" }}>can't be empty</div>}
            <div className="user-info-footer">
            <div className='char-left'>{limit} Characters left</div>
            <button className='add-feedback' onClick={() => AddComment(attr)}>Post Comment</button>
            </div>
        </div>
        </div>
        ))}
    </div>
    
  )
}

export default FeedbackDetail;
