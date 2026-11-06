// Seasons are grouped by theme (not strict dates) and reference real repos only.

export interface Episode {
  title: string
  text: string
  projectId?: string
}

export interface Season {
  number: string
  name: string
  logline: string
  episodes: Episode[]
  upcoming?: boolean
}

export const seasons: Season[] = [
  {
    number: '01',
    name: 'Enter: Robotics & AI',
    logline: 'Choosing to build machines that think and move.',
    episodes: [
      {
        title: 'B.E. Robotics & AI Engineering',
        text: 'Dayananda Sagar College of Engineering, Bengaluru — the foundation in programming, electronics, control and AI.',
      },
      {
        title: 'Cloud Computing — NPTEL',
        text: 'NPTEL Cloud Computing course from IIT Kharagpur.',
      },
    ],
  },
  {
    number: '02',
    name: 'Learning to Build',
    logline: 'First experiments with vision, hardware and networks.',
    episodes: [
      { title: 'AI Hand Gesture Mouse', text: 'MediaPipe hand landmarks driving the system cursor.', projectId: 'hand-gesture-mouse' },
      { title: 'Colour Sorting Cell', text: 'Sensor-driven pick-and-place on a conveyor.', projectId: 'colour-sorting' },
      { title: 'Wi-Fi Beacon Lab', text: 'Raw 802.11 frames from scratch, in a controlled lab.', projectId: 'wifi-beacon-lab' },
    ],
  },
  {
    number: '03',
    name: 'Arms That Think',
    logline: 'Putting perception and control on robotic arms.',
    episodes: [
      { title: 'Weld Inspection & Sorting', text: 'YOLO weld grading with a Dobot sorting cell.', projectId: 'weld-detection' },
      { title: 'TwinArm-AI', text: 'Leader–follower arm mirroring over serial.', projectId: 'twinarm-ai' },
    ],
  },
  {
    number: '04',
    name: 'Robots That Move',
    logline: 'Navigation, manipulation and depth perception in ROS 2.',
    episodes: [
      { title: 'Autonomous Mobile Manipulator', text: 'Mobile base + DOBOT ME6 with MoveIt 2 and Nav2.', projectId: 'mobile-manipulator' },
      { title: 'RealSense Obstacle Detector', text: 'Floor-aware depth obstacle detection on the D435i.', projectId: 'realsense-obstacle' },
    ],
  },
  {
    number: '05',
    name: 'Building Real Systems',
    logline: 'Industry robotics — where reliability matters.',
    episodes: [
      { title: 'Robotics & AI Intern — ATI Motors', text: 'New Product Initiative team, Bengaluru.' },
      { title: 'Sherpa RP AMR', text: 'ROS 2 workspace for a differential-drive AMR.', projectId: 'sherpa-rp-amr' },
      { title: 'Sherpa RP HMI', text: 'Browser operator console bridged to ROS 2.', projectId: 'sherpa-rp-hmi' },
    ],
  },
  {
    number: '06',
    name: "What's Next",
    logline: 'Autonomous systems, industrial automation and cloud robotics.',
    upcoming: true,
    episodes: [{ title: 'Coming soon', text: 'The next episode is being written. Want to build it together?' }],
  },
]

export const topPicks: { projectId: string; label: string }[] = [
  { projectId: 'mobile-manipulator', label: 'The Manipulator' },
  { projectId: 'realsense-obstacle', label: 'The Perception Stack' },
  { projectId: 'sherpa-rp-hmi', label: 'The Operator Console' },
  { projectId: 'weld-detection', label: 'The Inspector' },
]
