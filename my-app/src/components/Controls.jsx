import { RiResetLeftFill } from "react-icons/ri";

const Controls = ({textOptions, imageOptions}) => {
  // 받아야 하는 내용 : 각 select에서 어떤걸 선택했는지, change가 있는지, 데이터 값
  return(
    <div className="box__control">
      <h2 className='text__title-control'>옵션 변경</h2>
      <div className="box__control-inner">
        <form action="" className='form__select-container'>
          <label htmlFor="form__select-text">
            <span className="for-a11y">편집할 데이터 선택</span>
          </label>
          <select name="currentSelectText" id="form__select-text" className='form__select'>
            {textOptions.map((item, idx)=>{
              return(
                <option value={item.value} key={`${item}--${idx}`}>{item.label}</option>
              )}
            )}
          </select>
          <label htmlFor="form__select-image">
            <span className="for-a11y">편집할 이미지 데이터 선택</span>
          </label>
          <select name="currentSelectImage" id="form__select-image" className='form__select'>
            {imageOptions.map((item, idx)=>{
              return(
                <option value={item.value} key={`${item}--${idx}`}>{item.label}</option>
              )}
            )}
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