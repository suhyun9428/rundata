import React from 'react';
import { useAtom } from 'jotai';
import { activeValue, cardBackgroundAtom } from '../atom/atom';
import { backgroundOptions } from '../constants/option';

const Controls = ({ textOptions, imageOptions, onReset, onExportImg, onExportVideo }) => {
  const [bg, setBg] = useAtom(cardBackgroundAtom);
  const [activeEl, setActiveEl] = useAtom(activeValue);

  const handleSelectPreset = (option) => {
    if (option.value === 'bg-running-img') {
      setBg({ type: 'image', value: '//dummyimage.com/4000x2250/e9e9e9/fff' });
    } else if (option.value === 'bg-gradient') {
      setBg({ type: 'gradient', value: 'linear-gradient(135deg, #1f005c, #ffb56b)' });
    } else {
      setBg({ type: 'color', value: option.style.backgroundColor });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localImageUrl = URL.createObjectURL(file);
      setBg({ type: 'image', value: localImageUrl });
    }
  };

  return (
    <div className="box__control">
      <p className="text__title-control">출력 및 편집</p>
      
      <div className="box__control-inner">
        <button type="button" className="button__reset" onClick={onReset}>
          🔄
        </button>

        <div className="form__select-container">
          <label htmlFor="form__select-elements"></label>
          <select 
            id="form__select-elements"
            className="form__select"
            value={activeEl || ''} 
            onChange={(e) => setActiveEl(e.target.value || null)}
          >
            <option value="">편집할 요소 선택</option>
            <optgroup label="텍스트 옵션">
              {textOptions?.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </optgroup>
            <optgroup label="이미지/기타 옵션">
              {imageOptions?.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div className="box__export-buttons">
          <button type="button" className="button__export-img" onClick={onExportImg}>
            🖼️ 이미지 저장
          </button>
          <button type="button" className="button__export-video" onClick={onExportVideo}>
            📹 릴스 추출
          </button>
        </div>
      </div>

      <div className="box__background-control" style={{ marginTop: '16px' }}>
        <p className="text__title-control" style={{ fontSize: '14px', color: '#A5A3C1' }}>배경화면 테마 변경</p>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
          
          {backgroundOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelectPreset(opt)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '2px solid #2A2846',
                cursor: 'pointer',
                ...opt.style
              }}
              title={opt.label}
            />
          ))}

          <label className="button__export-upload" style={{
            display: 'inline-block',
            height: '38px',
            lineHeight: '38px',
            padding: '0 10px',
            borderRadius: '8px',
            background: '#FFF',
            border: '2px solid #2A2846',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
          }}>
            📁 사진 업로드
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Controls;