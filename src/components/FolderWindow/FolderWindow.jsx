import './FolderWindow.css';

export default function FolderWindow({ project, zIndex, onClose, onFocus }) {
  const { title, addressBar, children } = project;

  return (
    <div
      className="window folder-window"
      style={{ zIndex }}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
    >
      <div className="title-bar">
        <span className="title-bar-icon">📁</span>
        <span className="title-bar-text">{title}</span>
        <div className="title-bar-btns">
          <button className="tb-btn min" onClick={onClose}>_</button>
          <button className="tb-btn max">□</button>
          <button className="tb-btn close" onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="window-body">
        <div className="address-bar">
          🌐 <span>{addressBar}</span>
        </div>

        <div className="folder-contents">
          {children.map((child) => (
            <div key={child.id} className="folder-item">
              <div className="folder-item-header">
                {child.image
                  ? <img src={child.image} alt={child.title} className="folder-item-image" />
                  : <span className="folder-item-icon">{child.icon}</span>
                }
                <h3>{child.title}</h3>
              </div>
              {child.description && <p>{child.description}</p>}
              {child.tags && child.tags.length > 0 && (
                <div className="tags">
                  {child.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
              <div className="folder-item-actions">
                {child.fileUrl && (
                  <button
                    className="xp-btn primary"
                    onClick={() => window.open(child.fileUrl, '_blank')}
                  >
                    📄 Open File
                  </button>
                )}
                {child.liveUrl && (
                  <button
                    className="xp-btn primary"
                    onClick={() => window.open(child.liveUrl, '_blank')}
                  >
                    🌐 View Live
                  </button>
                )}
                {child.githubUrl && (
                  <button
                    className="xp-btn"
                    onClick={() => window.open(child.githubUrl, '_blank')}
                  >
                    📂 GitHub
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="separator" />
        <button className="xp-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}