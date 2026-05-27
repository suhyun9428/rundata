import { useState, useEffect } from "react";
import { RiResetLeftFill } from "react-icons/ri";
import { atom, useAtom } from 'jotai';
import { activeValue } from '../atom/atom';


const Controls = ({textOptions, imageOptions}) => {
  // 받아야 하는 내용 : 각 select에서 어떤걸 선택했는지, change가 있는지, 데이터 값
  const [ activeEl, setActiveEl ] = useAtom(activeValue);

  const handleActiveEl = (e) => {
    setActiveEl(e);
  };

  return(
    <div className="box__control">
      <h2 className='text__title-control'>옵션 변경</h2>
      <div className="box__control-inner">
        <form action="" className='form__select-container'>
          <label htmlFor="form__select-text">
            <span className="for-a11y">편집할 요소 선택</span>
          </label>
          <select name="currentSelectText" id="form__select-elements" className='form__select' value={activeEl || ''} onChange={(e) => handleActiveEl(e.target.value)}>
            <option value="">선택 안함</option>
            <optgroup label="데이터 항목">
              {textOptions.map((item, idx) => (
                <option value={item.value} key={`text-${idx}`}>{item.label}</option>
              ))}
            </optgroup>
            
            <optgroup label="레이어 항목">
              {imageOptions.map((item, idx) => (
                <option value={item.value} key={`image-${idx}`}>{item.label}</option>
              ))}
            </optgroup>
          </select>
        </form>
        <button type='button' className='button__reset sprite'>
          <RiResetLeftFill className="image__reset"/>
          <span className="for-a11y">초기화</span>
        </button>
        <div className="box__export-buttons">
          <button type="button" className="button__export-image">이미지</button>
          <button type="button" className="button__export-video">릴스(.mp4)</button>
        </div>
      </div>
    </div>
  )
};

export default Controls;