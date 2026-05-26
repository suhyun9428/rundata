import React, { useState } from 'react';
import Controls from './components/Controls';
import dummyData from './dummyData/dummyData.json';
import Preview from './components/Preview';
import { TEXT_OPTIONS, IMAGE_OPTIONS } from './constants/option';

import './App.css';

function App() {
  const [currentTarget, setCurrentTarget] = useState('distance');
  const [styles, setStyles] = useState({
    distance: { size: 32, x: 0, y: 0 },
    pace: { size: 18, x: 0, y: 0 },
    time: { size: 18, x: 0, y: 0 },
    heartRate: { size: 18, x: 0, y: 0 },
    date: { size: 14, x: 0, y: 0 },
    cadence: { size: 14, x: 0, y: 0 },
    gpx: { scale: 1, x: 0, y: 0 },
    background: { scale: 1, x: 0, y: 0 }
  });

  return (
    <div className="box__workspace">
      <h1 className='text__title'> 🏃‍♂️</h1>
      {/* 1. 설정을 조절하는 상자 (왼쪽 또는 오른쪽) */}
      <Controls textOptions={TEXT_OPTIONS} imageOptions={IMAGE_OPTIONS} />

      {/* 2. 실제 인스타 릴스 모양의 상자 (9:16 비율) */}
      <Preview data={dummyData} currentTarget={currentTarget} styles={styles} setStyles={setStyles} />
    </div>
  );
}

export default App;