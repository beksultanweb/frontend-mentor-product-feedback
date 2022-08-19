import {v4 as uuidv4} from "uuid";
import { useState } from 'react';

const Comment = ({setSuggestions, data, key, image, commentId, productId, name, username, text, replies}) => {
    const [isReplying, setReply] = useState(false);
    const [replyText, setNewReply] = useState("")

    const handleChangeReply = (e) => {
        setNewReply(e.value)
    }
    const handleReply = (e) => {
        e.preventDefault();
        console.log(replyText);
        const newReply = {
            id: uuidv4(),
            content: e.target.textarea.value,
            replyingTo: username,
            user: {
                image: "./assets/user-images/image-suzanne.jpg",
                name: "Jesse Ronda",
                username: "jesse10930",
            },
        };

        const allProducts = JSON.parse(window.localStorage.getItem("item"));;
        // console.log(data);
        const comment = allProducts
            .filter((el) => el.id === productId)[0]
            .comments.filter((el) => el.id === commentId)[0];

        if (typeof comment.replies === "undefined") {
            comment.replies = [newReply];
        } else {
            comment.replies.push(newReply);
        }
        setSuggestions(allProducts)
        window.localStorage.setItem("item", JSON.stringify(allProducts));
        // dispatch(userUpdatedActions.setUserUpdated());
    };

return (
<div key={key} className='feedback-detail-comment'>
            <div className='user-info-header'>
                <div className='user-info-head'>
                <img className='user-info-image' src={image} alt={image} />
                <div className='user-info-names'><div className='user-name'>{name}</div>
                <div className='user-username'>{username}</div></div>
                </div>
                <button className='replybtn' onClick={() => setReply(!isReplying)}>Reply</button>
            </div>
            <div className='user-info-comment'>
                {text}
            </div>
            {isReplying && <div>
                <form onSubmit={handleReply}>
                <textarea name="textarea" value={replyText} onChange={handleChangeReply} maxLength={250} placeholder="Type your reply here" id="" cols="30" rows="4"></textarea>
                <button className='addfeedback' type="submit">Post Reply</button>
                </form>
                </div>}
            {replies && replies.map((reply) => (
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
            </div>))}
            
        </div>)}

export default Comment;