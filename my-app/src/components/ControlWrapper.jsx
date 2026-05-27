import React from 'react';
import classNames from 'classnames';
import { RiCloseCircleFill } from 'react-icons/ri';
import { FaExpandAlt } from 'react-icons/fa';

const ControlWrapper = ({ id, isActive, className, children, onDelete, onResize, onMove, style }) => {
  return (
    <div 
      className={classNames("box__info", className, { 'is--active': isActive })}
      style={style}
      // 박스 자체를 누르면 이동 시작
      onMouseDown={(e) => onMove(e, id)}
      onTouchStart={(e) => onMove(e, id)}
    >
      
      {isActive && (
        <button 
          type="button" 
          className="button__elements-control button__delete"
          // 🌟 웹/앱 양쪽에서 완벽하고 안전하게 삭제 신호를 보내는 세팅
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          // 이동 이벤트가 버블링되어 방해하는 것을 차단
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
            e.stopPropagation(); // 부모 이동 이벤트와 충돌 방지
            onResize(e, id);
          }}
          onTouchStart={(e) => {
            e.stopPropagation(); // 부모 이동 이벤트와 충돌 방지
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