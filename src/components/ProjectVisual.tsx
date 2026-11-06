import type { Project } from '../data/projects'
import { mediaKindLabel } from '../data/projects'
import ProjectArt from './ProjectArt'

/** Cover visual for a project: first real repo asset, else a labelled illustration. */
export default function ProjectVisual({ project, eager = false }: { project: Project; eager?: boolean }) {
  const m = project.media[0]
  if (m) {
    return (
      <div className={`pv pv-${m.kind}`}>
        <img src={m.src} alt={m.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        <span className="pv-tag">{mediaKindLabel[m.kind]}</span>
      </div>
    )
  }
  return (
    <div className="pv pv-art">
      {project.art && <ProjectArt variant={project.art} accent={project.accent} />}
      <span className="pv-tag">Illustration</span>
    </div>
  )
}
