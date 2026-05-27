import { HiCalendarDateRange } from "react-icons/hi2";
import { RiPinDistanceFill } from "react-icons/ri";
import { FaRunning } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { GoHeartFill } from "react-icons/go";
import { useState } from "react";
import classNames from 'classnames';
import { atom, useAtom, useAtomValue } from 'jotai';
import { activeValue } from '../atom/atom.js';
import { getInfoList } from '../constants/option.jsx';
import { RiCloseCircleFill } from "react-icons/ri";
import { FaExpandAlt } from "react-icons/fa";
import ControlWrapper from "./ControlWrapper.jsx";

const Preview = ({ data, styles }) => {
  
  const [ activeEl, setActiveEl ] = useAtom(activeValue);

  const distanceToKm = data.distance / 1000;
  const showDistance = distanceToKm.toFixed(2);
  const pace = (data.averageVelocity).toFixed(2);
  const paceMins = pace.split('.')[0];
  const paceSecs = pace.split('.')[1];

  const durationTime = (data.duration / 60).toFixed(2).toString();
  const timeMins = durationTime.split('.')[0];
  const timeSecs = durationTime.split('.')[1];

  const route = data.gpxRoute || [];
  // 1. 위경도 데이터를 SVG ViewBox(0~100) 안의 좌표로 변환하는 미니 함수
  // 실제 지도처럼 정밀하진 않지만, 카드 배경에 이쁜 코스 선 모양을 따내기에 충분합니다!
  const lats = route.map(p => p.lat);
  const lngs = route.map(p => p.lng);
  
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  // 좌표들을 10~90 사이의 SVG 픽셀 값으로 스케일링 (상하반전 처리 포함)
  const svgPoints = route.map(p => {
    const x = ((p.lng - minLng) / (maxLng - minLng || 1)) * 80 + 10;
    const y = 90 - (((p.lat - minLat) / (maxLat - minLat || 1)) * 80); 
    return `${x},${y}`;
  }).join(' ');

  const infoList = getInfoList({
    startTimeLocal: data.startTimeLocal,
    showDistance,
    paceMins,
    paceSecs,
    timeMins,
    timeSecs,
    averageHR: data.averageHR,
    averageCadence : data.averageRunningCadenceInStepsPerMinute,
    maxCadence : data.maxRunningCadenceInStepsPerMinute,
  });

  const handleDeleteElement = (id) => {
    setActiveEl(null);
  };

  const handleResizeElement = (e, id) => {
    console.log(`${id} 요소 리사이즈 시작`);
  };

  return(
    <div className="box__card">
      <div className="box__image">
        <img className="image" src="//dummyimage.com/4000x2250/e9e9e9/fff" alt="" />
      </div>

      <ControlWrapper
        id="gpx"
        isActive={activeEl === "gpx"}
        className="box__map"
        onDelete={handleDeleteElement}
        onResize={handleResizeElement}
      >
        {route.length > 0 && (
          <svg viewBox="0 0 100 100" className="map-svg">
            <polyline
              points={svgPoints}
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points={svgPoints}
              fill="none"
              stroke="#00ffcc"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="running-path"
            />
          </svg>
        )}
      </ControlWrapper>

      <div className="box__info-grid">
        {infoList.map((item) => {
          const isActive = item.id === activeEl;

          return (
            <ControlWrapper
              key={item.id}
              id={item.id}
              isActive={isActive}
              className={item.className}
              onDelete={handleDeleteElement}
              onResize={handleResizeElement}
            >
              {item.icon}
              <span className="for-a11y">{item.label}</span>
              <span className="text__data">{item.value}</span>
              {item.unit && <span className="text__unit">{item.unit}</span>}
            </ControlWrapper>
          );
        })}
      </div>
    </div>
  )
}

export default Preview;