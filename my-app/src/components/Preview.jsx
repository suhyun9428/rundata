import React, { forwardRef } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useElementLayout } from '../hooks/useElementLayout.js';
import { cardBackgroundAtom, delElements } from '../atom/atom.js';
import { getInfoList } from '../constants/option.jsx';
import ControlWrapper from './ControlWrapper.jsx';

const Preview = forwardRef(({ data }, ref) => {
  const { layouts, activeValue, setActiveValue, handleResizeElement, handleMoveElement } = useElementLayout();
  const bgState = useAtomValue(cardBackgroundAtom);
  const [deletedEls, setDeletedEls] = useAtom(delElements);

  const showDistance = data?.distance ? (data.distance / 1000).toFixed(2) : '0.00';
  const [paceMins, paceSecs] = data?.averageVelocity ? data.averageVelocity.toFixed(2).split('.') : ['0', '00'];
  const [timeMins, timeSecs] = data?.duration ? (data.duration / 60).toFixed(2).toString().split('.') : ['0', '00'];

  const lats = data?.gpxRoute ? data.gpxRoute.map((p) => p.lat) : [];
  const lngs = data?.gpxRoute ? data.gpxRoute.map((p) => p.lng) : [];

  const minLat = lats.length > 0 ? Math.min(...lats) : 0;
  const maxLat = lats.length > 0 ? Math.max(...lats) : 0;
  const minLng = lngs.length > 0 ? Math.min(...lngs) : 0;
  const maxLng = lngs.length > 0 ? Math.max(...lngs) : 0;

  const svgPoints = data?.gpxRoute
    ? data.gpxRoute
        .map((p) => {
          const x = ((p.lng - minLng) / (maxLng - minLng || 1)) * 80 + 10;
          const y = 90 - ((p.lat - minLat) / (maxLat - minLat || 1)) * 80;
          return `${x},${y}`;
        })
        .join(' ')
    : '';

  // 지도 SVG 엘리먼트 정의
  const gpxSvgElement = data?.gpxRoute?.length > 0 && (
    <svg viewBox="0 0 100 100" className="map-svg">
      <polyline points={svgPoints} fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="3" />
      <polyline points={svgPoints} fill="none" stroke="#00ffcc" strokeWidth="2" className="running-path" />
    </svg>
  );

  const rawInfoList = getInfoList({
    startTimeLocal: data?.startTimeLocal || '',
    showDistance, paceMins, paceSecs, timeMins, timeSecs,
    averageHR: data?.averageHR || 0,
    averageCadence: data?.averageRunningCadenceInStepsPerMinute || 0,
    gpxElement: gpxSvgElement
  });

  const visibleInfoList = rawInfoList ? rawInfoList.filter(item => !deletedEls.includes(item.id)) : [];

  const handleDeleteElement = (id) => {
    setActiveValue(null);
    setDeletedEls([...deletedEls, id]);
  };

  const getDynamicBackgroundStyle = () => {
    const baseStyle = { position: 'relative' };
    if (bgState.type === 'image') return { ...baseStyle, backgroundImage: `url(${bgState.value})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    if (bgState.type === 'gradient') return { ...baseStyle, background: bgState.value };
    return { ...baseStyle, backgroundColor: bgState.value };
  };

  return (
    <div className="box__card" ref={ref} style={getDynamicBackgroundStyle()}>
      <div className="box__info-grid" style={{ position: 'relative', width: '100%', height: '100%'}}>
        {visibleInfoList?.map((item) => {
          const currentLayout = layouts[item.id];
          const isActive = item.id === activeValue;
          
          // const dynamicLeft = currentLayout?.left ? `${(currentLayout.left / 768) * 100}%` : 'auto';
          // const dynamicTop = currentLayout?.top ? `${(currentLayout.top / 1365) * 100}%` : 'auto';
          // const dynamicWidth = currentLayout?.width ? `${(currentLayout.width / 768) * 100}%` : 'auto';
          // const dynamicHeight = currentLayout?.height ? `${(currentLayout.height / 1365) * 100}%` : 'auto';

          const dynamicLeft = currentLayout?.left !== undefined ? `${currentLayout.left}px` : '10px';
          const dynamicTop = currentLayout?.top !== undefined ? `${currentLayout.top}px` : '10px';
          const dynamicWidth = currentLayout?.width !== undefined ? `${currentLayout.width}px` : 'auto';
          const dynamicHeight = currentLayout?.height !== undefined ? `${currentLayout.height}px` : 'auto';

          return (
            <ControlWrapper
              key={item.id}
              id={item.id}
              isActive={isActive}
              className={item.className}
              onDelete={handleDeleteElement}
              onResize={handleResizeElement}
              onMove={handleMoveElement}
              style={{
                position: 'absolute',
                top: dynamicTop,
                left: dynamicLeft,
                width: dynamicWidth,
                height: dynamicHeight,
              }}
            >
              {item.customContent ? item.customContent : (
                <>
                  {item.icon}
                  <span className="text__data">{item.value}{item.unit && <span className="text__unit">{item.unit}</span>}</span>
                  
                </>
              )}
            </ControlWrapper>
          );
        })}
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';
export default Preview;