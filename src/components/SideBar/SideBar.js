import React from 'react';
import './SideBar.css';

const SideBar = () => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('content', e.target.textContent);
  };

  return (
    <div className="blocks">
      <h1>BLOCKS</h1>
      <div className='elements'>
        <div className="draggable" draggable="true" onDragStart={handleDragStart}>Label</div>
        <div className="draggable" draggable="true" onDragStart={handleDragStart}>Input</div>
        <div className="draggable" draggable="true" onDragStart={handleDragStart}>Button</div>
      </div>
    </div>
  );
};

export default SideBar;
