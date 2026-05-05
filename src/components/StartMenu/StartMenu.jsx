import { useState } from 'react';
import './StartMenu.css';

const menuStructure = [
  {
    type: 'folder',
    id: 'apps',
    icon: '📂',
    label: 'Apps',
    children: [
      { id: 'oqtrto',    icon: '💍',  label: 'OQTRTO' },
      { id: 'lcars',     icon: '🖖',  label: 'LCARS' },
      { id: 'peekzoo',   icon: '🌍',  label: 'Peek-a-Zoo' },
      { id: 'dateomatc', icon: '📅',  label: 'Date-o-Matic' },
      { id: 'dailydawg', icon: '🐶',  label: 'Daily Dawg' },
      { id: 'stardew',   icon: '🌱',  label: 'Stardew Wiki' },
    ],
  },
  {
    type: 'folder',
    id: 'games',
    icon: '🎮',
    label: 'Games',
    children: [
      { id: 'rita', icon: '🏃‍♀️', label: 'Run Rita Run' },
    ],
  },
  { type: 'divider' },
  { type: 'item', id: 'paint',   icon: '🎨', label: 'Paint',         disabled: true },
  { type: 'item', id: 'public',  icon: '🗂️', label: 'Public Folder' },
  { type: 'item', id: 'other',   icon: '🗂️', label: 'Websites' },
  { type: 'divider' },
  { type: 'item', id: 'about',   icon: '🖥️', label: 'My Portfolio' },
  { type: 'item', id: 'contact', icon: '✉️', label: 'Contact Me' },
];

export default function StartMenu({ onOpenWindow, onClose }) {
  const [openFolders, setOpenFolders] = useState({});

  const toggleFolder = (id) => {
    setOpenFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpen = (id, disabled) => {
    if (disabled) return;
    onOpenWindow(id);
    onClose();
  };

  return (
    <div className="start-menu">
      <div className="sm-header">
        <div className="sm-avatar">👩‍💻</div>
        <div className="sm-name">Anna Thompson</div>
      </div>

      <div className="sm-body">
        {menuStructure.map((item, i) => {
          if (item.type === 'divider') {
            return <div key={i} className="sm-sep" />;
          }

          if (item.type === 'folder') {
            const isOpen = openFolders[item.id];
            return (
              <div key={item.id}>
                <div
                  className="sm-item sm-folder"
                  onClick={() => toggleFolder(item.id)}
                >
                  <span className="sm-item-icon">
                    {isOpen ? '📂' : '📁'}
                  </span>
                  <span className="sm-item-label">{item.label}</span>
                  <span className="sm-arrow">{isOpen ? '▾' : '▸'}</span>
                </div>
                {isOpen && (
                  <div className="sm-folder-children">
                    {item.children.map((child) => (
                      <div
                        key={child.id}
                        className="sm-item sm-child-item"
                        onClick={() => handleOpen(child.id, false)}
                      >
                        <span className="sm-item-icon">{child.icon}</span>
                        <span className="sm-item-label">{child.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // type === 'item'
          return (
            <div
              key={item.id}
              className={`sm-item${item.disabled ? ' sm-disabled' : ''}`}
              onClick={() => handleOpen(item.id, item.disabled)}
            >
              <span className="sm-item-icon">{item.icon}</span>
              <span className="sm-item-label">{item.label}</span>
              {item.disabled && <span className="sm-soon">soon</span>}
            </div>
          );
        })}
      </div>

      <div className="sm-footer">
        <button className="sm-footer-btn" onClick={onClose}>
          🔴 Close Menu
        </button>
      </div>
    </div>
  );
}
