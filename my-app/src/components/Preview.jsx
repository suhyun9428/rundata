import { HiCalendarDateRange } from "react-icons/hi2";
import { RiPinDistanceFill } from "react-icons/ri";
import { FaRunning } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { GoHeartFill } from "react-icons/go";
import { useState } from "react";
import classNames from 'classnames';

const Preview = ({data, currentTarget, styles}) => {
  console.log(data, currentTarget, styles, '얍');
  // 일단 다 보여주고 on/off 시키자
  const distanceToKm = data.distance / 1000;
  const showDistance = distanceToKm.toFixed(2);
  const pace = (data.averageVelocity).toFixed(2);
  const paceMins = pace.split('.')[0];
  const paceSecs = pace.split('.')[1];

  const durationTime = (data.duration / 60).toFixed(2).toString();
  const timeMins = durationTime.split('.')[0];
  const timeSecs = durationTime.split('.')[1];



  return(
    <div className="box__card">
      {/* 가민에서 가져왔다고 치고 넣을 텍스트들 */}
      <div className="box__image">
        <img className="image" src="//dummyimage.com/4000x2250/e9e9e9/fff" alt="" />
      </div>
       <div className="box__info-grid">
        {/* {classNames('uxe_guide', isGuideOpen && 'active')}> */}
        {/* <div className={classNames("box__info box__date", {currentTarget === 'date' && 'is--active'})}> */}
        <div className="box__info box__date">
          <HiCalendarDateRange className="image__icon" />
          <span className="for-a11y">날짜</span>
          <span className="text__data">{data.startTimeLocal}</span>
        </div>
        <div className="box__info box__distance">
          <RiPinDistanceFill className="image__icon" />
          <span className="for-a11y">거리</span>
          <span className="text__data">{showDistance}</span>
          <span className="text__unit">km</span>
        </div>
        <div className="box__info box__pace">
          <FaRunning className="image__icon" />
          <span className="for-a11y">페이스</span>
          <span className="text__data">{`${paceMins}'${paceSecs}"`}</span>
        </div>
        <div className="box__info box__time">
          <MdOutlineTimer className="image__icon" />
          <span className="for-a11y">시간</span>
          <span className="text__data">{`${timeMins}:${timeSecs}`}</span>
        </div>
        <div className="box__info box__heartrate">
          <GoHeartFill className="image__icon"/>
          <span className="for-a11y">심박수</span>
          <span className="text__data">{data.averageHR}</span>
          <span className="text__unit">bpm</span>
        </div>
      </div>
    </div>
  )
}

export default Preview;