import React from 'react'
import "./style.css";

const Sidebar = ({handleFilterItems, filterType, buttons}) => {
  return (
    <div className='sidebar'>
      <div className="gradient-box">
        <h1>Frontend Mentor</h1>
        <p>Feedback Board</p>
      </div>
      <div className="categories">
      {buttons.map((item)=>(
            <button 
            onClick={() => handleFilterItems(item.type)}
            key={item.type}
            type="button"
            className={`categories-btn${
              filterType === item.type ? "-active" : ""
            }`}>
            {item.label}
          </button>
          ))}
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
