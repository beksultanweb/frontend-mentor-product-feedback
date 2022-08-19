import React from 'react'
import "./style.css";
import styled from "styled-components";
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

const FeedbackDetail = ({setReply, isReplying, newReply, handleChangeReply, handleAddReply, commentRef, showErrorComment, limit, handleAddComment, AddComment, newComment, addPlusOneUpvote, data}) => {
    // console.log("data: ", data)
    
    
    const params = useParams();
  return (
    
    <div className='feedback-detail-content'>
        {data.filter((item) => String(item.id) === String(params.id)).map((data) => (
            <div key={data.id}>
        <div className='feedback-detail-buttons'>
        <Link to="/"><button className='go-back'><Arrow/>Go back</button>
        </Link>
        <Link to={{
                pathname: `/editfeedback/${data.id}`    
            }}><button className='edit-feedback'>Edit Feedback</button></Link></div>
            <div>
            <button onClick={() => addPlusOneUpvote(data)} className='upvote'><ArrowUp/>{data.upvotes}</button>
            <div className="suggestion-item">
            <div className='suggestion-info'>
            
            <div>
                <div className="suggestion-title">{data.title}</div>
                <div className="suggestion-descr">{data.description}</div>
                <button>{data.category}</button>
            </div>
            </div>
            <div className='suggestion-comments'><img src="./assets/shared/icon-comments.svg" alt="comments" />{data.comments? data.comments.length: 0}</div>
            
            </div>
            </div>
            
        {data.comments?
        <div className='feedback-detail-comments'>
        <div className="roadmap-title">{data.comments? data.comments.length: 0} comments</div>
        {data.comments.map((item) => (
        <div key={item.id} className='feedback-detail-comment'>
            <div className='user-info-header'>
                <div className='user-info-head'>
                <img className='user-info-image' src={item.user.image} alt={item.user.image} />
                <div className='user-info-names'><div className='user-name'>{item.user.name}</div>
                <div className='user-username'>{item.user.username}</div></div>
                </div>
                <button className='replybtn' onClick={() => setReply(!isReplying)}>Reply</button>
            </div>
            <div className='user-info-comment'>
                {item.content}
            </div>
            {isReplying && <div><textarea ref={commentRef} name="" maxLength={250} value={newReply} onChange={handleChangeReply} placeholder="Type your reply here" id="" cols="30" rows="4"></textarea>
            <button className='addfeedback' onClick={() => handleAddReply(item, item.id)}>Post Reply</button></div>}
            {item.replies? item.replies.map((reply) => (
            <div key={reply.user.name} className='replies'>
                <div className='left-hr'></div>
                <div className='user-info-header'>
                    <div className='user-info-head'>
                    <img className='user-info-image' src={reply.user.image} alt={reply.user.image} />
                    <div className='user-info-names'><div className='user-name'>{reply.user.name}</div>
                    <div className='user-username'>{reply.user.username}</div></div>
                    </div>
                    <button className='replybtn'>Reply</button>
                </div>
                <div className='user-info-comment'>
                    <span>{reply.replyingTo}</span> {reply.content}
                </div>
            </div>)):""}
            
        </div>
        ))}
        </div>:""}
        <div className='feedback-detail-comments'>
            <div className="roadmap-title">Add Comment</div>
            <textarea ref={commentRef} name="" maxLength={250} value={newComment} onChange={handleAddComment} placeholder="Type your comment here" id="" cols="30" rows="4"></textarea>
            {showErrorComment && <div style={{ color: "red" }}>can't be empty</div>}
            <div className="user-info-footer">
            <div className='char-left'>{limit} Characters left</div>
            <button className='add-feedback' onClick={() => AddComment(data)}>Post Comment</button>
            </div>
        </div>
        </div>
        ))}
    </div>
    
  )
}

export default FeedbackDetail;
