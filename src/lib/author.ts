import authorImage from '@/assets/author.webp';

export const AUTHOR = {
  name: 'Rens Vis',
  role: 'Senior Frontend Engineer',
  bio: 'Building design systems and frontend architecture. Angular, Flutter, and the space in between.',
  expertise: ['Angular', 'Flutter', 'Design Systems', 'Frontend Architecture', 'UX Engineering'],
  avatar: authorImage,
  links: {
    github: 'https://github.com/rensvis',
    linkedin: 'https://www.linkedin.com/in/rens-vis-9218a9174/',
  },
} as const;
