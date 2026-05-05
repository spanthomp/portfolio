import { useState } from 'react';
import './DesktopIcon.css';

export default function DesktopIcon({ icon, image, label, onOpen }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(true);
    // On touch devices, open on single tap
    if ('ontouchstart' in window) onOpen();
  };

  const handleDoubleClick = () => {
    onOpen();
  };

  const handleBlur = () => setSelected(false);

  return (
    <div
      className={`desktop-icon${selected ? ' selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <div className="icon-img">{image ? <img src={image} alt={label} /> : icon}</div>
      <div className="icon-label">{label}</div>
    </div>
  );
}
