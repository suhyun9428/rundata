import { HiCalendarDateRange } from 'react-icons/hi2';
import { RiPinDistanceFill } from 'react-icons/ri';
import { FaRunning } from 'react-icons/fa';
import { MdOutlineTimer } from 'react-icons/md';
import { GoHeartFill } from 'react-icons/go';
import { IoFootsteps } from "react-icons/io5";

export const getInfoList = ({ startTimeLocal, showDistance, paceMins, paceSecs, timeMins, timeSecs, averageHR, averageCadence, maxCadence, gpxElement }) => [
  {
    id: 'gpx',
    label: '코스 지도',
    className: 'box__map',
    customContent: gpxElement, 
  },
  {
    id: 'distance',
    label: '거리',
    className: 'box__distance',
    icon: <RiPinDistanceFill className="image__icon" />,
    value: showDistance,
    unit: 'km',
  },
  {
    id: 'pace',
    label: '페이스',
    className: 'box__pace',
    icon: <FaRunning className="image__icon" />,
    value: `${paceMins}'${paceSecs}"`,
  },
  {
    id: 'time',
    label: '러닝 시간',
    className: 'box__time',
    icon: <MdOutlineTimer className="image__icon" />,
    value: `${timeMins}:${timeSecs}`,
  },
  {
    id: 'heartrate',
    label: '평균 심박수',
    className: 'box__heartrate',
    icon: <GoHeartFill className="image__icon" />,
    value: averageHR,
    unit: 'bpm',
  },
  {
    id: 'date',
    label: '날짜, 시간',
    className: 'box__date',
    icon: <HiCalendarDateRange className="image__icon" />,
    value: startTimeLocal,
  },
  {
    id: 'cadence',
    label: '케이던스',
    className: 'box__cadence',
    icon: <IoFootsteps className="image__icon" />,
    value: averageCadence || maxCadence || 0,
    unit: 'spm',
  },
];