import DesktopIcon from '../DesktopIcon/DesktopIcon';
import projects from '../../data/projects';
import './Desktop.css';

export default function Desktop({ onOpenWindow }) {
  return (
    <div className="desktop">
      <div className="icon-grid">
        {projects.map((project) => (
          <DesktopIcon
            key={project.id}
            icon={project.icon}
            image={project.image}
            label={project.label}
            onOpen={() => onOpenWindow(project.id)}
          />
        ))}
      </div>
    </div>
  );
}
