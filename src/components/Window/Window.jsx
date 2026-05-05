import { useState, useRef, useEffect } from 'react';
import './Window.css';

export default function Window({ project, zIndex, onClose, onFocus, onMinimise }) {
  const { icon, title, liveUrl, hasIframe } = project;

  const isMailto = liveUrl && liveUrl.startsWith('mailto:');

  const windowRef = useRef(null);
  const [isMaximised, setIsMaximised] = useState(false);
  const [position, setPosition] = useState({ x: null, y: null });
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Set initial centered position on mount
  useEffect(() => {
    const el = windowRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    setPosition({
      x: Math.max(0, (window.innerWidth - w) / 2),
      y: Math.max(0, (window.innerHeight - h) / 4),
    });
  }, []);

  // Dragging
  const onTitleMouseDown = (e) => {
    if (isMaximised) return;
    dragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    onFocus();
    e.preventDefault();
  };

  const onTitleTouchStart = (e) => {
    if (isMaximised) return;
    const touch = e.touches[0];
    dragging.current = true;
    dragOffset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
    onFocus();
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      setPosition({
        x: Math.max(0, e.clientX - dragOffset.current.x),
        y: Math.max(0, e.clientY - dragOffset.current.y),
      });
    };
    const onTouchMove = (e) => {
      if (!dragging.current) return;
      const touch = e.touches[0];
      setPosition({
        x: Math.max(0, touch.clientX - dragOffset.current.x),
        y: Math.max(0, touch.clientY - dragOffset.current.y),
      });
    };
    const stopDrag = () => { dragging.current = false; };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', stopDrag);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [position]);

  const windowStyle = isMaximised
    ? {
        zIndex,
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 44px)',
        transform: 'none',
        borderRadius: 0,
      }
    : {
        zIndex,
        top: position.y ?? 60,
        left: position.x ?? '50%',
        transform: position.x === null ? 'translateX(-50%)' : 'none',
        width: hasIframe ? '760px' : '400px',
        maxWidth: '95vw',
      };

  return (
    <div
      className={`window${isMaximised ? ' window-maximised' : ''}`}
      style={windowStyle}
      ref={windowRef}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="title-bar"
        onMouseDown={onTitleMouseDown}
        onTouchStart={onTitleTouchStart}
        onDoubleClick={() => setIsMaximised(v => !v)}
      >
        <span className="title-bar-icon">{icon}</span>
        <span className="title-bar-text">{title}</span>
        <div className="title-bar-btns">
          <button
            className="tb-btn min"
            onClick={(e) => { e.stopPropagation(); onMinimise(); }}
            title="Minimise"
          >_</button>
          <button
            className="tb-btn max"
            onClick={(e) => { e.stopPropagation(); setIsMaximised(v => !v); }}
            title={isMaximised ? 'Restore' : 'Maximise'}
          >{isMaximised ? '❐' : '□'}</button>
          <button
            className="tb-btn close"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            title="Close"
          >✕</button>
        </div>
      </div>

      {/* Content */}
      <div className="window-body">
        {hasIframe && liveUrl && !isMailto ? (
          <iframe
            src={liveUrl}
            className="project-iframe"
            title={title}
            allow="accelerometer; camera; encrypted-media; geolocation; gyroscope;"
          />
        ) : (
          <div className="window-simple">
            {isMailto && (
              <button className="xp-btn primary" onClick={() => window.open(liveUrl)}>
                ✉️ Email Me
              </button>
            )}
            {liveUrl && !isMailto && (
              <button className="xp-btn primary" onClick={() => window.open(liveUrl, '_blank')}>
                🌐 Open in Browser
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
