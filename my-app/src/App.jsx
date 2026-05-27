import React, { useRef } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { activeValue, cardBackgroundAtom, delElements } from './atom/atom.js';
import { useElementLayout } from './hooks/useElementLayout.js';
import { TEXT_OPTIONS, IMAGE_OPTIONS } from './constants/option';

import Controls from './components/Controls';
import Preview from './components/Preview';
import dummyData from './dummyData/dummyData.json';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const cardRef = useRef(null); // 🌟 Preview 카드를 정조준할 렌즈
  
  // Jotai 훅 및 상태들 App.jsx로 소환
  const { handleResetLayouts, setActiveValue } = useElementLayout();
  const setBg = useSetAtom(cardBackgroundAtom);
  const setDeletedEls = useSetAtom(delElements);

  // 🔄 전체 새로고침 (초기화) 작동 함수
  const handleResetAll = () => {
    handleResetLayouts(); // 크기, 위치 초기화 (훅에서 실행)
    setBg({ type: 'color', value: '#111111' }); // 배경화면 초기화
    setDeletedEls([]); // 삭제된 요소 전부 복구
    setActiveValue(null); // 선택 해제
  };

  // 📸 1. 이미지 추출 (.png 다운로드)
  const handleExportImage = async () => {
    if (!cardRef.current) return;
    setActiveValue(null); // 캡처 전 가이드라인 숨기기

    setTimeout(async () => {
      const canvas = await html2canvas(cardRef.current, { 
        useCORS: true, 
        scale: 2 // 고화질 업샘플링
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `running-card-${Date.now()}.png`;
      link.click();
    }, 100);
  };

  // 📹 2. 릴스 동영상 추출 (.webm 녹화 다운로드)
  const handleExportReels = async () => {
    if (!cardRef.current) return;
    setActiveValue(null); // 가이드라인 숨기기

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
      setTimeout(() => mediaRecorder.stop(), 6000); // 6초간 애니메이션 녹화
    }, 100);
  };

  return (
    <div className="box__workspace">
      <h1 className='text__title'>🏃‍♂️</h1>
      
      {/* 2. 실제 인스타 릴스 모양의 상자 (9:16 비율) */}
      {/* 🌟 중요: cardRef를 여기서 바인딩해서 Preview 내부의 카드를 낚아챕니다! */}
      <Preview ref={cardRef} data={dummyData} />

      {/* 1. 설정을 조절하는 상자 및 하단 기능 버튼들 */}
      {/* 🌟 기존의 Controls 구조를 유지하면서 리셋, 추출 함수들을 프롭스로 내려줍니다. */}
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