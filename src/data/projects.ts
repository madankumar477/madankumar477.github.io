// Project content audited from each repository's README and file tree
// (github.com/madankumar477). Media are copied from the repositories
// themselves; nothing here is stock or generated hardware imagery.

export type MediaKind = 'photo' | 'screenshot' | 'diagram' | 'illustrative' | 'synthetic' | 'thumbnail'

export interface ProjectMedia {
  src: string
  alt: string
  kind: MediaKind
  caption: string
}

export type ProjectCategory = 'autonomy' | 'arms' | 'software'

export type ArtVariant = 'amr' | 'weld' | 'twinarm' | 'wifi'

export interface Project {
  id: string
  title: string
  short: string
  genres: string[]
  category: ProjectCategory
  summary: string
  description: string
  features: string[]
  tech: string[]
  repo: string | null
  repoNote?: string
  demo?: { label: string; url: string }
  media: ProjectMedia[]
  /** Designed illustration used when the repository has no suitable image. */
  art?: ArtVariant
  accent: string
  note?: string
}

const GH = 'https://github.com/madankumar477'

export const categories: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Originals' },
  { id: 'autonomy', label: 'Autonomous Systems' },
  { id: 'arms', label: 'Robotic Arms & Automation' },
  { id: 'software', label: 'AI & Software' },
]

export const projects: Project[] = [
  {
    id: 'mobile-manipulator',
    title: 'Autonomous Mobile Manipulator',
    short: 'Mobile Manipulator',
    genres: ['ROS 2', 'MoveIt 2', 'Nav2'],
    category: 'autonomy',
    summary:
      'A differential-drive mobile base and a DOBOT ME6 six-axis arm joined into one Xacro robot — Gazebo simulation, MoveIt 2 planning and Nav2 / SLAM, then tested on the physical robot.',
    description:
      'A ROS 2 Humble workspace integrating an Edubot/Sherpa-style differential-drive mobile base with a DOBOT ME6 six-axis manipulator. The arm is attached to the chassis through a fixed mounting joint in a single Xacro description, with Gazebo Sim control interfaces, a dedicated ME6 MoveIt 2 configuration and Nav2 / SLAM Toolbox configuration for the mobile platform.',
    features: [
      'Combined robot model: chassis, drive wheels, casters, sensor frames, ME6 mounting plate and six arm joints',
      'Gazebo Sim simulation with ros2_control, drive/arm controllers, ROS–Gazebo bridge and a warehouse world',
      'ME6 MoveIt 2 configuration — joint limits, kinematics, planning scene and controller mapping',
      'Nav2, SLAM Toolbox, map server / localization launch files and a saved occupancy-grid map',
      'Camera and laser sensor models defined in Xacro with Gazebo sensor plugins',
      'Upstream DOBOT packages imported at a pinned commit via vcstool instead of vendored',
    ],
    tech: ['ROS 2 Humble', 'MoveIt 2', 'Nav2', 'SLAM Toolbox', 'Gazebo Sim', 'ros2_control', 'URDF / Xacro', 'RViz', 'DOBOT ME6', 'Python'],
    repo: `${GH}/ros2-autonomous-mobile-manipulator`,
    demo: {
      label: 'Watch on LinkedIn',
      url: 'https://www.linkedin.com/posts/emadankumar_robotics-ros2-autonomousrobots-ugcPost-7490980851480965120-anzM/',
    },
    media: [
      {
        src: '/assets/projects/mobile-manipulator-hardware.webp',
        alt: 'Mobile robot base with a six-axis robotic arm mounted on top, in a corridor',
        kind: 'photo',
        caption: 'Actual project hardware — mobile base with the mounted arm.',
      },
      {
        src: '/assets/projects/manipulator-architecture.svg',
        alt: 'System architecture diagram of the mobile manipulator workspace',
        kind: 'diagram',
        caption: 'System architecture from the repository.',
      },
    ],
    accent: '#e50914',
    note: 'Developed in Gazebo, then tested on the physical mobile base with the ME6 arm mounted. The hardware driver configuration for the physical arm is not part of the public snapshot, so the checked-in MoveIt configuration uses a mock hardware interface.',
  },
  {
    id: 'sherpa-rp-amr',
    title: 'Sherpa RP Autonomous Mobile Robot',
    short: 'Sherpa RP AMR',
    genres: ['ROS 2', 'AMR', 'Navigation'],
    category: 'autonomy',
    summary:
      'ROS 2 work on ATI Motors\' Sherpa RP autonomous mobile robot during my internship — sensors, navigation, obstacle detection and safety.',
    description:
      'During my Robotics & AI internship at ATI Motors (New Product Initiative), I work on the ROS 2 Humble software for the Sherpa RP autonomous mobile robot: integrating LiDAR and depth-camera data, obstacle detection and safety monitoring, deploying on NVIDIA Jetson with Docker, and testing on the physical robot.',
    features: [
      'ROS 2 nodes in Python and C++ for obstacle detection and safety monitoring',
      'Livox MID-360 LiDAR and Intel RealSense D435i data integrated into the obstacle-detection path',
      'Deployment on NVIDIA Jetson with Linux and Docker',
      '100+ hours of hands-on testing on the physical robot, including field testing and safety-stop checks',
    ],
    tech: ['ROS 2 Humble', 'C++', 'Python', 'Nav2', 'Livox MID-360', 'RealSense D435i', 'NVIDIA Jetson', 'Docker'],
    repo: null,
    repoNote: 'Private repository — source is not publicly released.',
    media: [],
    art: 'amr',
    accent: '#e50914',
    note: 'The repository is private, so no project media is published here; the visual is a designed illustration.',
  },
  {
    id: 'realsense-obstacle',
    title: 'ROS 2 RealSense Obstacle Detector',
    short: 'RealSense Obstacle Detector',
    genres: ['ROS 2', 'Perception', 'Depth'],
    category: 'autonomy',
    summary:
      'Real-time depth-based obstacle detection with an Intel RealSense D435i — floor-aware ROI filtering, travel-corridor checks and minimum obstacle distance.',
    description:
      'A ROS 2 Humble package developed and tested with the Intel RealSense D435i. It processes depth images using camera intrinsics and a floor model to separate obstacles from the floor, filters valid depth inside the robot\'s travel corridor, and publishes obstacle state and minimum distance for AMR navigation and motion-safety use.',
    features: [
      'Real-time depth-based obstacle detection on the D435i',
      'Configurable detection distance and region-of-interest filtering',
      'Floor-aware detection from camera height and pitch geometry',
      'Minimum obstacle distance estimation within a travel corridor',
      'Fail-safe obstacle state with hysteresis and clean-frame requirements',
      'Runtime parameter configuration and ROS 2 topic outputs',
    ],
    tech: ['ROS 2 Humble', 'Python', 'OpenCV', 'NumPy', 'Intel RealSense D435i', 'TF2', 'Ubuntu 22.04'],
    repo: `${GH}/ros2-realsense-obstacle-detector`,
    media: [
      {
        src: '/assets/projects/realsense-architecture.webp',
        alt: 'Detection pipeline architecture diagram',
        kind: 'diagram',
        caption: 'Detection pipeline architecture from the repository.',
      },
      {
        src: '/assets/projects/realsense-synthetic-depth.webp',
        alt: 'Synthetic depth frame, detector mask and detector result panel',
        kind: 'synthetic',
        caption: 'Synthetic depth test frame from the repository — not a physical camera capture.',
      },
      {
        src: '/assets/projects/realsense-illustrative-scene.webp',
        alt: 'Illustrative lab scene of a mobile robot facing a cardboard box',
        kind: 'illustrative',
        caption: 'Illustrative lab scene, labelled as illustrative in the repository.',
      },
    ],
    accent: '#3b82f6',
  },
  {
    id: 'sherpa-rp-hmi',
    title: 'Sherpa RP HMI',
    short: 'Sherpa RP HMI',
    genres: ['HMI', 'Web', 'ROS 2'],
    category: 'software',
    summary:
      'Browser-based operator interface for an AMR — mapping, navigation, teleoperation and camera — served by Nginx on a Jetson, bridged to ROS 2 over rosbridge.',
    description:
      'A browser-based Human–Machine Interface for operating and monitoring the Sherpa RP autonomous mobile robot. Operators use a normal browser; Nginx on an NVIDIA Jetson Orin Nano serves the frontend and routes REST, ROS WebSocket and video traffic to a FastAPI backend and a Dockerised ROS 2 Humble workspace. The public repository is an architecture showcase with selected UI captures.',
    features: [
      'Focused operator screens: Home, Mapping, Navigation, Teleoperation, Sensors, Camera and Settings',
      'Mapping workflow: start/stop, live occupancy grid and map save',
      'Navigation: saved-map selection, initial pose, goal setting, Nav2 readiness and cancel',
      'Teleoperation through a dedicated command path behind a downstream mux and safety gate',
      'Camera via web_video_server (MJPEG) and optional foxglove_bridge 3D diagnostics',
      'FastAPI backend coordinating workflows plus network / Bluetooth helper services',
    ],
    tech: ['ROS 2 Humble', 'FastAPI', 'Python', 'Nginx', 'Docker', 'rosbridge / roslibjs', 'HTML / CSS / JS', 'NVIDIA Jetson Orin Nano'],
    repo: `${GH}/sherpa-rp-hmi`,
    repoNote: 'Public architecture showcase — implementation source is not included.',
    media: [
      {
        src: '/assets/projects/hmi-mapping.webp',
        alt: 'HMI mapping screen with live map area and workflow status',
        kind: 'screenshot',
        caption: 'Mapping screen capture from the project archive.',
      },
      {
        src: '/assets/projects/hmi-navigation.webp',
        alt: 'HMI navigation screen with map selection, goal controls and Nav2 readiness',
        kind: 'screenshot',
        caption: 'Navigation screen capture from the project archive.',
      },
    ],
    accent: '#22c55e',
  },
  {
    id: 'weld-detection',
    title: 'Dobot Magician Weld Detection',
    short: 'Weld Inspection & Sorting',
    genres: ['Vision', 'YOLO', 'Automation'],
    category: 'arms',
    summary:
      'Vision-based weld inspection on a conveyor: a YOLO detector grades each part GOOD / DEFECTIVE / UNCERTAIN and a DOBOT Magician sorts it into the right bin.',
    description:
      'A Python and OpenCV inspection-and-sorting workflow built around a DOBOT Magician, a conveyor, a proximity/photoelectric sensor and a phone camera. A retrainable YOLO weld-detection model inspects each part; the controller sorts GOOD and DEFECTIVE parts into separate bins and holds UNCERTAIN parts for manual review.',
    features: [
      'Conveyor stops at the inspection station when the sensor detects a part',
      'Phone camera input over USB/UVC or a local-network stream',
      'YOLO training pipeline on the public Welding Defect Object Detection dataset',
      'Three-way verdict — GOOD, DEFECTIVE or UNCERTAIN (never silently passed)',
      'Preview mode that never commands hardware; hardware mode gated by confirmed poses',
      'pydobotlab adapter for motion, end-effector, sensor and conveyor control, with pytest tests',
    ],
    tech: ['Python', 'OpenCV', 'Ultralytics YOLO', 'NumPy', 'pydobotlab', 'DOBOT Magician', 'PyYAML', 'pytest'],
    repo: `${GH}/dobot-magician-weld-detection`,
    media: [],
    art: 'weld',
    accent: '#f59e0b',
    note: 'No project photograph exists in the repository, so the visual is a designed illustration.',
  },
  {
    id: 'colour-sorting',
    title: 'Dobot Magician Colour Sorting',
    short: 'Colour Sorting',
    genres: ['Automation', 'Pick & Place'],
    category: 'arms',
    summary:
      'Conveyor colour-sorting cell: a colour sensor reads each cube and a Dobot Magician picks red cubes to a set location and the rest to a collection box.',
    description:
      'A conveyor-based colour-sorting project built around a Dobot Magician robotic arm, a colour sensor and a conveyor belt. The sensor reads each cube\'s colour as it travels; the arm then performs a programmed pick-and-place to separate red cubes from the others. Programmed in DOBOT Blockly Lab.',
    features: [
      'Conveyor carries cubes through the sensing area',
      'Colour-sensor driven sorting decision',
      'Coordinate-based pick-and-place with the Dobot Magician',
      'Red cubes to a designated location, other colours to a collection box',
      'Block-based program built in DOBOT Blockly Lab',
    ],
    tech: ['DOBOT Magician', 'DOBOT Blockly Lab', 'Colour sensor', 'Conveyor automation'],
    repo: `${GH}/dobot-magician-colour-sorting`,
    repoNote: 'Project showcase — editable program file is not included.',
    media: [
      {
        src: '/assets/projects/colour-sorting-setup.webp',
        alt: 'Dobot Magician arm beside a conveyor with red, yellow, blue and green cubes',
        kind: 'photo',
        caption: 'Actual project setup supplied by the maintainer.',
      },
      {
        src: '/assets/projects/dobot-blockly-program.webp',
        alt: 'Monitor showing the DOBOT Blockly Lab block program',
        kind: 'photo',
        caption: 'Photograph of the DOBOT Blockly Lab program used in the project.',
      },
    ],
    accent: '#ef4444',
  },
  {
    id: 'twinarm-ai',
    title: 'TwinArm-AI',
    short: 'TwinArm-AI',
    genres: ['Physical AI', 'Teleoperation'],
    category: 'arms',
    summary:
      'Leader–follower mirroring: one Dobot Magician copies the live pose of a second arm over serial, with a safety offset and fixed rotation.',
    description:
      'A Physical-AI concept demo where a follower Dobot Magician mirrors the real-time motion of a leader Dobot. The leader pose is read over one serial port and streamed to the follower on another in a 50 ms loop, with a Y offset for safe workspace separation and rotation held fixed to prevent twist instability.',
    features: [
      'Real-time leader-to-follower pose mirroring with pydobot',
      'Configurable Y offset for safe workspace separation',
      'Fixed rotation to avoid twist instability',
      '~50 ms control loop in the baseline implementation',
    ],
    tech: ['Python', 'pydobot', 'pyserial', 'DOBOT Magician ×2'],
    repo: `${GH}/TwinArm-AI`,
    media: [],
    art: 'twinarm',
    accent: '#a855f7',
    note: 'No demo media exists in the repository yet, so the visual is a designed illustration.',
  },
  {
    id: 'hand-gesture-mouse',
    title: 'AI Hand Gesture Mouse',
    short: 'Hand Gesture Mouse',
    genres: ['Computer Vision', 'HCI'],
    category: 'software',
    summary:
      'Control the mouse with hand gestures from a webcam — move, left/right click, scroll and stop — using MediaPipe hand landmarks.',
    description:
      'Webcam-based mouse control using hand landmarks tracked with MediaPipe and OpenCV, with PyAutoGUI driving the system cursor.',
    features: [
      'Cursor movement with the index finger',
      'Left click with thumb + index',
      'Right click with thumb + middle finger',
      'Scroll with two fingers',
      'Fist gesture stops the cursor',
    ],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
    repo: `${GH}/AI-Hand-Gesture-Mouse`,
    demo: { label: 'Watch demo on YouTube', url: 'https://youtu.be/G8UJphWxyPw' },
    media: [
      {
        src: '/assets/projects/hand-gesture-thumbnail.webp',
        alt: 'Demo video thumbnail showing hand landmarks controlling a cursor',
        kind: 'thumbnail',
        caption: 'Thumbnail of the project demo video.',
      },
    ],
    accent: '#06b6d4',
  },
  {
    id: 'wifi-beacon-lab',
    title: 'Wi-Fi Beacon Lab',
    short: 'Wi-Fi Beacon Lab',
    genres: ['Networking', 'Education'],
    category: 'software',
    summary:
      'Educational IEEE 802.11 lab: hand-built beacon frames with Radiotap headers sent over Linux raw sockets — for owned, authorised lab setups only.',
    description:
      'An educational wireless-networking experiment that constructs raw IEEE 802.11 beacon frames in Python instead of relying on an access point — exploring management frames, Radiotap headers, MAC addressing and Layer-2 raw sockets on Linux. Intended strictly for controlled, authorised lab environments.',
    features: [
      'Binary construction of 802.11 beacon management frames',
      'Radiotap header construction',
      'Locally administered MAC address generation',
      'Configurable interface, channel, SSID pattern and frame count',
      'Layer-2 raw-socket transmission on Linux',
    ],
    tech: ['Python', 'Raw sockets', 'IEEE 802.11', 'Radiotap', 'Linux'],
    repo: `${GH}/wifi-beacon-lab`,
    media: [],
    art: 'wifi',
    accent: '#14b8a6',
    note: 'Educational use only, on hardware and networks you own or are authorised to test.',
  },
]

export const projectById = (id: string) => projects.find((p) => p.id === id)

export const mediaKindLabel: Record<MediaKind, string> = {
  photo: 'Project photo',
  screenshot: 'Screen capture',
  diagram: 'Diagram',
  illustrative: 'Illustrative',
  synthetic: 'Synthetic frame',
  thumbnail: 'Demo thumbnail',
}
