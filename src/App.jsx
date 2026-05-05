import { useState, useEffect } from 'react';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';
import StartMenu from './components/StartMenu/StartMenu';
import Window from './components/Window/Window';
import FolderWindow from './components/FolderWindow/FolderWindow';
import projects from './data/projects';

export default function App() {
  const [openWindows, setOpenWindows] = useState([]);
  const [minimisedWindows, setMinimisedWindows] = useState([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [zCounter, setZCounter] = useState(100);
  const [windowZMap, setWindowZMap] = useState({});

  const bringToFront = (id) => {
    setZCounter((z) => {
      const next = z + 1;
      setWindowZMap((m) => ({ ...m, [id]: next }));
      return next;
    });
  };

  const openWindow = (id) => {
    // If minimised, restore it
    if (minimisedWindows.includes(id)) {
      setMinimisedWindows((prev) => prev.filter((w) => w !== id));
      bringToFront(id);
      return;
    }
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
    setMinimisedWindows((prev) => prev.filter((w) => w !== id));
  };

  const minimiseWindow = (id) => {
    setMinimisedWindows((prev) => prev.includes(id) ? prev : [...prev, id]);
  };

  const handleTaskbarClick = (id) => {
    if (minimisedWindows.includes(id)) {
      // Restore
      setMinimisedWindows((prev) => prev.filter((w) => w !== id));
      bringToFront(id);
    } else {
      // Minimise
      minimiseWindow(id);
    }
  };

  useEffect(() => {
    setTimeout(() => openWindow('about'), 300);
  }, []);

  const allOpenWindows = [...openWindows];

  return (
    <>
      <Desktop onOpenWindow={openWindow} />

      {projects.map((project) => {
        if (!openWindows.includes(project.id)) return null;
        const isMinimised = minimisedWindows.includes(project.id);

        return project.isFolder ? (
          <FolderWindow
            key={project.id}
            project={project}
            zIndex={windowZMap[project.id] || 100}
            onClose={() => closeWindow(project.id)}
            onFocus={() => bringToFront(project.id)}
            onMinimise={() => minimiseWindow(project.id)}
            style={{ display: isMinimised ? 'none' : undefined }}
          />
        ) : (
          <div key={project.id} style={{ display: isMinimised ? 'none' : undefined }}>
            <Window
              project={project}
              zIndex={windowZMap[project.id] || 100}
              onClose={() => closeWindow(project.id)}
              onFocus={() => bringToFront(project.id)}
              onMinimise={() => minimiseWindow(project.id)}
            />
          </div>
        );
      })}

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
        minimisedWindows={minimisedWindows}
        onTaskbarClick={handleTaskbarClick}
        onCloseWindow={closeWindow}
        startMenuOpen={startMenuOpen}
        onToggleStartMenu={() => setStartMenuOpen((v) => !v)}
      />
    </>
  );
}
