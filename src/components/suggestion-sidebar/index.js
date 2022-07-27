import React from 'react'
import "./style.css";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="gradient-box">
        <h1>Frontend Mentor</h1>
        <p>Feedback Board</p>
      </div>
      <div className="categories">
        <button className='categories-btn'>All</button>
        <button className='categories-btn'>UI</button>
        <button className='categories-btn'>UX</button>
        <button className='categories-btn'>Enhancement</button>
        <button className='categories-btn'>Bug</button>
        <button className='categories-btn'>Feature</button>
      </div>
      <div className="roadmap">
        <div className='flexible addmargin'><div className="roadmap-title">Roadmap</div>
        <div className='view'>View</div></div>
        <div className="flexible">
        <div className="roadmap-nodes">
            <div className='circle'></div><div>Planned</div>
            </div>
            
            <div>2</div>
        </div>
        <div className="flexible addmargin">
        <div className="roadmap-nodes">
            <div className='circle inprogress'></div><div>In-Progress</div>
            </div>
            <div>3</div>
        </div>
        <div className="flexible addmargin">
        <div className="roadmap-nodes">
            <div className='circle live'></div><div>Live</div>
            </div>
            <div>1</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
