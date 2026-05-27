import React from 'react';
import classNames from 'classnames';
import { RiCloseCircleFill } from 'react-icons/ri';
import { FaExpandAlt } from 'react-icons/fa';

const ControlWrapper = ({ id, isActive, className, children, onDelete, onResize, onMove, style }) => {
  return (
    <div 
      className={classNames("box__info", className, { 'is--active': isActive })}
      style={style}
      onMouseDown={(e) => onMove(e, id)}
      onTouchStart={(e) => onMove(e, id)}
    >
      
      {isActive && (
        <button 
          type="button" 
          className="button__elements-control button__delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <span className="for-a11y">요소 삭제</span>
          <RiCloseCircleFill color="red" />
        </button>
      )}

      {children}

      {isActive && (
        <button 
          type="button" 
          className="button__elements-control button__resize"
          onMouseDown={(e) => {
            e.stopPropagation();
            onResize(e, id);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            onResize(e, id);
          }}
        >
          <span className="for-a11y">크기 조절</span>
          <FaExpandAlt />
        </button>
      )}
    </div>
  );
};

export default ControlWrapper;