import './Window.css';

export default function Window({ project, zIndex, onClose, onFocus }) {
const { icon, title, liveUrl, description, tags, githubUrl, linkedinUrl, addressBar } = project;

  return (
    <div
      className="window"
      style={{ zIndex }}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
    >
      {/* Title Bar */}
      <div className="title-bar">
        <span className="title-bar-icon">{icon}</span>
        <span className="title-bar-text">{title}</span>
        <div className="title-bar-btns">
          <button className="tb-btn min" onClick={onClose}>_</button>
          <button className="tb-btn max">□</button>
          <button className="tb-btn close" onClick={onClose}>✕</button>
        </div>
      </div>

      {/* Window Body */}
      <div className="window-body">
        <div className="address-bar">
          🌐 <span>{addressBar}</span>
        </div>

        <div className="project-info">
          <div className="project-icon-large">{icon}</div>
          <div className="project-details">
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="tags">
              {tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="separator" />

        <div className="window-actions">
          {liveUrl && !liveUrl.startsWith('mailto:') && (
  <button
    className="xp-btn primary"
    onClick={() => window.open(liveUrl, '_blank')}
  >
              ✉️ Email Me
  </button>
)}
          {liveUrl && liveUrl.startsWith('mailto:') && (
            <button
              className="xp-btn primary"
              onClick={() => window.open(liveUrl)}
            >
              ✉️ Email Me
            </button>
          )}
          {githubUrl && (
            <button
              className="xp-btn"
              onClick={() => window.open(githubUrl, '_blank')}
            >
              📂 GitHub
            </button>
          )}
          {linkedinUrl && (
            <button
              className="xp-btn"
              onClick={() => window.open(linkedinUrl, '_blank')}
            >
              💼 LinkedIn
            </button>
          )}
          <button className="xp-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
