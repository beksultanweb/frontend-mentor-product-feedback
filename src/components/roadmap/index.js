import styled from "styled-components";
import "./style.css";
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

export const ArrowUp = styled("div")`
    border: solid #4661E6;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
`;

const Roadmap = ({data, addPlusOneUpvote}) => {
    return (
        <div className="roadmap-body">
            <div className="header">
                <Link to="/">
                <button className='go-back'><Arrow/>Go back</button>
                </Link>
                <div className="prefix">Roadmap</div>
                
                <Link to="/addfeedback">
                <button className="add-feedback">+ Add Feedback</button>
                </Link>
            </div>
            <div className="roadmap-content">
                <div>
                <div className="suggestion-title">Planned ({data.filter((item) => item.status === "Planned").length})</div>
                Ideas prioritized for research
                {data.filter((item) => item.status === "Planned").map((product) => (
                <div className="roadmap-card planned">
                    Planned
                    <Link to={{
                pathname: `/${product.id}`    
            }}
            style={{textDecoration: 'none'}}
            ><div className="suggestion-title">{product.title}</div></Link>
                    <div className="suggestion-descr">{product.description}</div>
                    <button>{product.category}</button>
                    <div className="roadmap-btns">
                    <div className="upvote-button"><button onClick={() => addPlusOneUpvote(product)} className='upvote null'><ArrowUp/>{product.upvotes}</button></div>
                    <div className='suggestion-comments'><img src="./assets/shared/icon-comments.svg" alt="comments" />{product.comments? product.comments.length: 0}</div>
                    </div>
                </div>))}
                </div>
                <div>
                    <div className="suggestion-title">In-Progress ({data.filter((item) => item.status === "In-Progress").length})</div>
                    Currently being developed
                {data.filter((item) => item.status === "In-Progress").map((product) => (
                <div className="roadmap-card inprogress">
                    In-Progress
                    <Link to={{
                pathname: `/${product.id}`    
            }}
            style={{textDecoration: 'none'}}
            ><div className="suggestion-title">{product.title}</div></Link>
                    <div className="suggestion-descr">{product.description}</div>
                    <button>{product.category}</button>
                    <div className="roadmap-btns">
                    <div className="upvote-button"><button onClick={() => addPlusOneUpvote(product)} className='upvote null'><ArrowUp/>{product.upvotes}</button></div>
                    <div className='suggestion-comments'><img src="./assets/shared/icon-comments.svg" alt="comments" />{product.comments? product.comments.length: 0}</div>
                    </div>
                </div>))}
                </div>
                <div>
                <div className="suggestion-title">Live ({data.filter((item) => item.status === "Live").length})</div>
                    Released features
                {data.filter((item) => item.status === "Live").map((product) => (
                <div className="roadmap-card live">
                    Live
                    <Link to={{
                pathname: `/${product.id}`    
            }}
            style={{textDecoration: 'none'}}
            ><div className="suggestion-title">{product.title}</div></Link>
                    <div className="suggestion-descr">{product.description}</div>
                    <button>{product.category}</button>
                    <div className="roadmap-btns">
                    <div className="upvote-button"><button onClick={() => addPlusOneUpvote(product)} className='upvote null'><ArrowUp/>{product.upvotes}</button></div>
                    <div className='suggestion-comments'><img src="./assets/shared/icon-comments.svg" alt="comments" />{product.comments? product.comments.length: 0}</div>
                    </div>
                </div>))}
                </div>
            </div>
        </div>
    )
}
export default Roadmap;