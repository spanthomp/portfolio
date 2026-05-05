import { useState, useEffect } from 'react';
import projects from '../../data/projects';
import './Taskbar.css';

export default function Taskbar({
  openWindows,
  minimisedWindows,
  onTaskbarClick,
  startMenuOpen,
  onToggleStartMenu,
}) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      let h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      setTime(`${h}:${m} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  const getProject = (id) => projects.find((p) => p.id === id);

  return (
    <div className="taskbar">
      <button
        className={`start-btn${startMenuOpen ? ' active' : ''}`}
        onClick={onToggleStartMenu}
      >
        <span className="start-icon">🪟</span>
        <span>start</span>
      </button>

      <div className="taskbar-tasks">
        {openWindows.map((id) => {
          const project = getProject(id);
          const isMinimised = minimisedWindows.includes(id);
          return (
            <button
              key={id}
              className={`taskbar-task${isMinimised ? ' minimised' : ' open'}`}
              onClick={() => onTaskbarClick(id)}
              title={project?.label}
            >
              <span>{project?.icon}</span>
              <span className="task-label">{project?.label}</span>
            </button>
          );
        })}
      </div>

      <div className="taskbar-clock">{time}</div>
    </div>
  );
}
