import React from 'react';
import classNames from 'classnames';
import { RiCloseCircleFill } from 'react-icons/ri';
import { FaExpandAlt } from 'react-icons/fa';

const ControlWrapper = ({ id, isActive, className, children, onDelete, onResize }) => {
  return (
    <div className={classNames("box__info", className, { 'is--active': isActive })}>
      
      {/* 1. active 상태일 때만 삭제 버튼 노출 */}
      {isActive && (
        <button 
          type="button" 
          className="button__elements-control button__delete"
          onClick={(e) => {
            e.stopPropagation(); // 카드 자체 클릭 이벤트 전파 방지
            onDelete(id);
          }}
        >
          <span className="for-a11y">요소 삭제</span>
          <RiCloseCircleFill color="red" />
        </button>
      )}

      {/* 2. 실제 내용물 (지도 본문이나 데이터 텍스트들이 여기에 들어옴) */}
      {children}

      {/* 3. active 상태일 때만 리사이즈 핸들 노출 */}
      {isActive && (
        <button 
          type="button" 
          className="button__elements-control button__resize"
          // 여기에 드래그 리사이즈 관련 이벤트를 연결하게 됩니다.
          onMouseDown={(e) => onResize(e, id)} 
        >
          <span className="for-a11y">크기 조절</span>
          <FaExpandAlt />
        </button>
      )}
    </div>
  );
};

export default ControlWrapper;