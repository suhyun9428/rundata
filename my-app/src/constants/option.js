export const TEXT_OPTIONS = [
  { value: "distance", label: "거리" },
  { value: "pace", label: "페이스" },
  { value: "time", label: "러닝 시간" },
  { value: "heartrate", label: "평균 심박수" },
  { value: "date", label: "날짜, 시간" },
  { value: "cadence", label: "케이던스" }
];

export const IMAGE_OPTIONS = [
  { value: "gpx", label: "러닝 코스(GPX)" },
  { value: "background", "label": "배경화면" }
];

export const backgroundOptions = [
  { value: 'bg-black', label: '시크한 블랙', style: { backgroundColor: '#111' } },
  { value: 'bg-gradient', label: '네온 그라디언트', style: { background: 'linear-gradient(135deg, #1f005c, #ffb56b)' } },
  { value: 'bg-running-img', label: '새벽 러닝 이미지', style: { backgroundImage: "url(//dummyimage.com/4000x2250/e9e9e9/fff)", backgroundSize: 'cover' } }
];