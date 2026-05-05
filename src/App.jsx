import { useState, useEffect } from 'react';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';
import StartMenu from './components/StartMenu/StartMenu';
import Window from './components/Window/Window';
import FolderWindow from './components/FolderWindow/FolderWindow';
import projects from './data/projects';

export default function App() {
  const [openWindows, setOpenWindows] = useState([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [zCounter, setZCounter] = useState(100);
  const [windowZMap, setWindowZMap] = useState({});

  const openWindow = (id) => {
    setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setZCounter((z) => {
      const next = z + 1;
      setWindowZMap((m) => ({ ...m, [id]: next }));
      return next;
    });
    setStartMenuOpen(false);
  };

  const closeWindow = (id) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
  };

  const bringToFront = (id) => {
    setZCounter((z) => {
      const next = z + 1;
      setWindowZMap((m) => ({ ...m, [id]: next }));
      return next;
    });
  };

  useEffect(() => {
    setTimeout(() => openWindow('about'), 300);
  }, []);

  return (
    <>
      <Desktop onOpenWindow={openWindow} />

      {projects.map((project) =>
        openWindows.includes(project.id) ? (
          project.isFolder ? (
            <FolderWindow
              key={project.id}
              project={project}
              zIndex={windowZMap[project.id] || 100}
              onClose={() => closeWindow(project.id)}
              onFocus={() => bringToFront(project.id)}
            />
          ) : (
            <Window
              key={project.id}
              project={project}
              zIndex={windowZMap[project.id] || 100}
              onClose={() => closeWindow(project.id)}
              onFocus={() => bringToFront(project.id)}
            />
          )
        ) : null
      )}

      {startMenuOpen && (
        <>
          <div className="sm-overlay" onClick={() => setStartMenuOpen(false)} />
          <StartMenu
            onOpenWindow={openWindow}
            onClose={() => setStartMenuOpen(false)}
          />
        </>
      )}

      <Taskbar
        openWindows={openWindows}
        onOpenWindow={openWindow}
        onCloseWindow={closeWindow}
        startMenuOpen={startMenuOpen}
        onToggleStartMenu={() => setStartMenuOpen((v) => !v)}
      />
    </>
  );
}
