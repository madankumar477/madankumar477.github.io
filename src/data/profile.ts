// Single source of truth for personal facts shown across the site.
// Only verified information lives here — edit this file to update content.

export const profile = {
  fullName: 'E Madan Kumar',
  displayName: 'MADAN',
  title: 'Robotics & AI Engineer',
  tagline: 'ROBOTICS & AI • ROS 2 • COMPUTER VISION',
  intro:
    'B.E. Robotics & Artificial Intelligence Engineering student at Dayananda Sagar College of Engineering and Robotics & AI Intern at ATI Motors, building robots that perceive, plan and move — from ROS 2 navigation stacks to vision-guided robotic arms.',
  location: 'Bengaluru, Karnataka, India',
  // Published by the owner on the public GitHub profile README (github.com/madankumar477).
  email: 'mk6360363552@gmail.com',
  links: {
    github: 'https://github.com/madankumar477',
    linkedin: 'https://www.linkedin.com/in/emadankumar/',
  },
  photo: {
    cutout: '/assets/profile/madan-cutout.webp',
    original: '/assets/profile/madan-photo.webp',
    width: 697,
    height: 914,
  },
} as const

export const education = {
  degree: 'B.E. Robotics & Artificial Intelligence Engineering',
  short: 'B.E. Robotics & AI',
  institution: 'Dayananda Sagar College of Engineering',
  institutionShort: 'DSCE',
  location: 'Bengaluru',
}

export const experience = [
  {
    role: 'Robotics & AI Intern',
    company: 'ATI Motors',
    team: 'New Product Initiative',
    location: 'Bengaluru',
    status: 'Current',
  },
]

export const certifications = [
  {
    provider: 'NPTEL',
    title: 'Cloud Computing',
    issuer: 'IIT Kharagpur',
  },
]

export const practicalExperience = [
  'ROS 2 development',
  'Autonomous robot navigation',
  'Sensor integration',
  'Computer vision',
  'Mobile manipulation',
  'Hardware–software integration',
  'Robot testing & debugging',
]

export const interests = [
  'Robotics Engineering',
  'Autonomous Mobile Robots',
  'ROS 2',
  'AI & Machine Learning',
  'Computer Vision',
  'Software Engineering',
  'Cloud Computing',
  'Industrial Automation',
]
