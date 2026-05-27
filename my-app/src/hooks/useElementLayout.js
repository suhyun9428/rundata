import { useAtom } from 'jotai';
import { activeValue, elementLayoutsAtom, delElements } from '../atom/atom'; 

const INITIAL_LAYOUTS = {
  gpx: { width: 180, height: 180, bottom: 0, right: 0 },
  distance: {  top: 0, left: 0 },
  pace: {  top: 40, left: 0 },
  time: {  top: 80, left: 0 },
  heartrate: {  top: 120, left: 0 },
  date: {  top: 160, left: 0 },
  cadence: {  top: 200, left: 0 },
};

export const useElementLayout = () => {
  const [layouts, setLayouts] = useAtom(elementLayoutsAtom);
  const [currentActive, setCurrentActive] = useAtom(activeValue);
  const [, setDeletedEls] = useAtom(delElements);

  const handleResetLayouts = () => {
    setLayouts(INITIAL_LAYOUTS);
    setCurrentActive(null);      
    setDeletedEls([]);

    const allElements = document.querySelectorAll('.box__info');
    allElements.forEach((el) => {
      el.style.removeProperty('width');
      el.style.removeProperty('height');
      el.style.removeProperty('--info-width');
    });
  };

  const handleMoveElement = (e, id) => {
    setCurrentActive(id);

    const isTouch = e.type === 'touchstart';
    const startX = isTouch ? e.touches[0].clientX : e.clientX;
    const startY = isTouch ? e.touches[0].clientY : e.clientY;

    const startTop = layouts[id]?.top || 0;
    const startLeft = layouts[id]?.left || 0;

    const handleMove = (moveEvent) => {
      if (moveEvent.cancelable) moveEvent.preventDefault();

      const currentX = moveEvent.type === 'touchmove' ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = moveEvent.type === 'touchmove' ? moveEvent.touches[0].clientY : moveEvent.clientY;

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      setLayouts((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          top: startTop + deltaY,
          left: startLeft + deltaX,
        }
      }));
    };

    const handleEnd = () => {
      if (isTouch) {
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleEnd);
      } else {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleEnd);
      }
    };

    if (isTouch) {
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    } else {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
    }
  };

  const handleResizeElement = (e, id) => {
    const isTouch = e.type === 'touchstart';
    const startX = isTouch ? e.touches[0].clientX : e.clientX;
    
    const targetEl = e.currentTarget.closest('.box__info');
    const currentRect = targetEl ? targetEl.getBoundingClientRect() : null;

    const startWidth = layouts[id]?.width || (currentRect ? currentRect.width : 120);
    const startHeight = layouts[id]?.height || (currentRect ? currentRect.height : 60);
    const aspectRatio = startWidth / startHeight;

    const handleMove = (moveEvent) => {
      if (moveEvent.cancelable) moveEvent.preventDefault();

      const currentX = moveEvent.type === 'touchmove' ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const deltaX = currentX - startX;
      
      const newWidth = Math.max(50, startWidth + deltaX);
      const newHeight = newWidth / aspectRatio;
      
      targetEl.style.setProperty('--info-width', newWidth);

      setLayouts((prev) => ({
        ...prev,
        [id]: { ...prev[id], width: newWidth, height: newHeight }
      }));
    };
    
    const handleEnd = () => {
      if (isTouch) {
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleEnd);
      } else {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleEnd);
      }
    };

    if (isTouch) {
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    } else {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
    }
  };

  return {
    layouts,
    activeValue: currentActive,
    setActiveValue: setCurrentActive,
    handleResizeElement,
    handleMoveElement,
    handleResetLayouts,
  };
};