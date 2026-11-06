export interface Skill {
  name: string
  abbr: string
  core?: boolean
  /** Project ids (see projects.ts) where this skill appears in the repo. */
  seenIn?: string[]
}

export interface Genre {
  id: string
  name: string
  tagline: string
  color: string
  skills: Skill[]
}

export const genres: Genre[] = [
  {
    id: 'robotics',
    name: 'Robotics',
    tagline: 'Robots that perceive, plan & move',
    color: '#e50914',
    skills: [
      { name: 'ROS 2', abbr: 'R2', core: true, seenIn: ['sherpa-rp-amr', 'mobile-manipulator', 'realsense-obstacle', 'sherpa-rp-hmi'] },
      { name: 'Nav2', abbr: 'N2', seenIn: ['sherpa-rp-amr', 'mobile-manipulator', 'sherpa-rp-hmi'] },
      { name: 'SLAM', abbr: 'SL', seenIn: ['sherpa-rp-amr', 'mobile-manipulator'] },
      { name: 'AMCL', abbr: 'AM', seenIn: ['sherpa-rp-amr'] },
      { name: 'TF2', abbr: 'TF', seenIn: ['realsense-obstacle'] },
      { name: 'MoveIt 2', abbr: 'MI', seenIn: ['mobile-manipulator'] },
      { name: 'Gazebo', abbr: 'GZ', seenIn: ['mobile-manipulator'] },
      { name: 'URDF', abbr: 'UR', seenIn: ['sherpa-rp-amr', 'mobile-manipulator'] },
      { name: 'Xacro', abbr: 'XA', seenIn: ['sherpa-rp-amr', 'mobile-manipulator'] },
    ],
  },
  {
    id: 'programming',
    name: 'Programming',
    tagline: 'Languages behind the robots',
    color: '#f59e0b',
    skills: [
      { name: 'Python', abbr: 'Py', core: true, seenIn: ['realsense-obstacle', 'weld-detection', 'twinarm-ai', 'hand-gesture-mouse', 'wifi-beacon-lab', 'mobile-manipulator'] },
      { name: 'C++', abbr: 'C+', seenIn: ['sherpa-rp-amr'] },
      { name: 'C', abbr: 'C' },
      { name: 'Java', abbr: 'Jv' },
      { name: 'Bash', abbr: 'Sh' },
    ],
  },
  {
    id: 'vision',
    name: 'Computer Vision & AI',
    tagline: 'Seeing, detecting, deciding',
    color: '#06b6d4',
    skills: [
      { name: 'OpenCV', abbr: 'CV', core: true, seenIn: ['realsense-obstacle', 'weld-detection', 'hand-gesture-mouse'] },
      { name: 'Computer Vision', abbr: 'Vi', seenIn: ['realsense-obstacle', 'weld-detection', 'hand-gesture-mouse'] },
      { name: 'Machine Learning', abbr: 'ML', seenIn: ['weld-detection'] },
      { name: 'AI / ML', abbr: 'AI', seenIn: ['weld-detection', 'hand-gesture-mouse'] },
    ],
  },
  {
    id: 'hardware',
    name: 'Hardware & Sensors',
    tagline: 'Where software meets the robot',
    color: '#22c55e',
    skills: [
      { name: 'Livox MID-360', abbr: 'LV', seenIn: ['sherpa-rp-amr'] },
      { name: 'Intel RealSense D435i', abbr: 'RS', seenIn: ['realsense-obstacle', 'sherpa-rp-amr'] },
      { name: 'LiDAR', abbr: 'Li', seenIn: ['sherpa-rp-amr', 'mobile-manipulator'] },
      { name: 'IMU', abbr: 'IM', seenIn: ['sherpa-rp-amr'] },
      { name: 'Motor Control', abbr: 'MC', seenIn: ['sherpa-rp-amr'] },
      { name: 'NVIDIA Jetson', abbr: 'NJ', seenIn: ['sherpa-rp-hmi'] },
    ],
  },
  {
    id: 'tools',
    name: 'Software & Tools',
    tagline: 'Shipping & building',
    color: '#a855f7',
    skills: [
      { name: 'Linux', abbr: 'Lx', core: true },
      { name: 'Git', abbr: 'Gt' },
      { name: 'GitHub', abbr: 'GH' },
      { name: 'Docker', abbr: 'Dk', seenIn: ['sherpa-rp-hmi'] },
      { name: 'CMake', abbr: 'CM', seenIn: ['sherpa-rp-amr'] },
      { name: 'Nginx', abbr: 'Nx', seenIn: ['sherpa-rp-hmi'] },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & Data',
    tagline: 'Foundations in the cloud',
    color: '#3b82f6',
    skills: [
      { name: 'AWS fundamentals', abbr: 'AW' },
      { name: 'SQL', abbr: 'SQ' },
      { name: 'MongoDB', abbr: 'MD' },
      { name: 'Cloud Computing', abbr: 'CC' },
    ],
  },
]

export const totalSkills = genres.reduce((n, g) => n + g.skills.length, 0)
