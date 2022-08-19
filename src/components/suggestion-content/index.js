import React from 'react'
import "./style.css";
import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Arrow = styled("div")`
    border: solid #4661E6;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
`;

const SuggestionContent = ({selectedOption, data, handleSuggestionClick, addPlusOneUpvote, handleAddFeedbackClick}) => {
    // const amountComments = data.filter((item) => item.productRequests.filter((req) => req.comments.map((comment) => comment.id))).length;
    // let { id } = useParams();
    // console.log(selectedOption[0].value);
    return (
    <div className='content'>
        {data.length > 0? [...data] 
        .sort((a,b) => {
            let products = selectedOption;
            let sortBy = products.split(" ")[1];
            if (
                (a.comments && b.comments && sortBy === "Comments" &&
                    a.comments.length >
                        b.comments.length) ||
                (a.comments && b.comments && sortBy === "Upvotes" &&
                    a.upvotes > b.upvotes)
            ) {
                return products.split(" ")[0] === "Most"
                    ? -1
                    : 1;
            }
            if (
                (a.comments && b.comments && sortBy === "Comments" &&
                    a.comments.length <
                        b.comments.length) ||
                (a.comments && b.comments && sortBy === "Upvotes" &&
                    a.upvotes < b.upvotes)
            ) {
                return products.split(" ")[0] === "Most"
                    ? 1
                    : -1;
            }
            return 0;
        })
        .map((item) => (
            <div key={item.id}>
                <button onClick={() => addPlusOneUpvote(item)} className='upvote'><Arrow/>{item.upvotes}</button>
            <Link to={{
                pathname: `/${item.id}`    
            }}
            style={{textDecoration: 'none'}}
            >
            <div className="suggestion-item">
            <div className='suggestion-info'>
            
            <div>
                <div className="suggestion-title">{item.title}</div>
                <div className="suggestion-descr">{item.description}</div>
                <button>{item.category}</button>
            </div>
            </div>
            <div className='suggestion-comments'><img src="./assets/shared/icon-comments.svg" alt="comments" />{item.comments? item.comments.length: 0}</div>
            
        </div>
        </Link>
            </div>
        )):<div className='content-empty'><img className='suggestion-empty' src='./assets/suggestions/illustration-empty.svg' alt='No data available' />
        <div className='suggestion-empty-title'>There is no feedback yet.</div>
        <div className="suggestion-descr margin">Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</div>
        <Link to="/addfeedback">
        <button className='add-feedback'>+ Add Feedback</button>
        </Link>
        </div>
        }
    </div>
  )
}

export default SuggestionContent;
