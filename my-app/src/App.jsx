import React, { useState, useRef } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { activeValue, cardBackgroundAtom, delElements } from './atom/atom.js';
import { useElementLayout } from './hooks/useElementLayout.js';
import { TEXT_OPTIONS, IMAGE_OPTIONS } from './constants/option';
import { PiDotsSixThin } from "react-icons/pi";
import Controls from './components/Controls';
import Preview from './components/Preview';
import dummyData from './dummyData/dummyData.json';
import html2canvas from 'html2canvas';

import './App.css';
import classNames from 'classnames';

function App() {
  const cardRef = useRef(null);
  const [isControlOpen, setIsControlOpen] = useState(true);

  const { handleResetLayouts, setActiveValue } = useElementLayout();
  const setBg = useSetAtom(cardBackgroundAtom);
  const setDeletedEls = useSetAtom(delElements);

  const handleResetAll = () => {
    handleResetLayouts();
    setBg({ type: 'color', value: '#111111' }); 
    setDeletedEls([]);
    setActiveValue(null);
  };

  const handleExportImage = async () => {
    if (!cardRef.current) return;
    setActiveValue(null);

    setTimeout(async () => {
      const canvas = await html2canvas(cardRef.current, { 
        useCORS: true, 
        scale: 2
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `running-card-${Date.now()}.png`;
      link.click();
    }, 100);
  };

  const handleExportReels = async () => {
    if (!cardRef.current) return;
    setActiveValue(null);

    setTimeout(async () => {
      const canvas = await html2canvas(cardRef.current, { useCORS: true, scale: 2 });
      const stream = canvas.captureStream(30); 
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `running-reels-${Date.now()}.webm`;
        link.click();
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 6000);
    }, 100);
  };

  return (
    <div className={`box__workspace ${isControlOpen ? 'is--control-open' : 'is--control-close'}`}>
      <h1 className='text__title'>🏃‍♂️</h1>
      
      <Preview ref={cardRef} data={dummyData} />

      <button type='button' className={classNames('button__toggle', isControlOpen && 'button__toggle--active')} onClick={() => setIsControlOpen(!isControlOpen)}><PiDotsSixThin /></button>
      
      <Controls 
        textOptions={TEXT_OPTIONS} 
        imageOptions={IMAGE_OPTIONS} 
        onReset={handleResetAll}
        onExportImg={handleExportImage}
        onExportVideo={handleExportReels}
      />
    </div>
  );
}

export default App;