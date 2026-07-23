import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiJsonwebtokens,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { MdDevices } from "react-icons/md";

export const skills = [
  { name: "HTML", icon: FaHtml5, color: "text-orange-500", progress: 95 },
  { name: "CSS", icon: FaCss3Alt, color: "text-blue-500", progress: 90 },
  { name: "JavaScript", icon: FaJsSquare, color: "text-yellow-400", progress: 85 },
  { name: "React.js", icon: FaReact, color: "text-cyan-400", progress: 85 },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-300", progress: 90 },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-500", progress: 75 },
  { name: "Express.js", icon: SiExpress, color: "text-gray-300", progress: 75 },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-600", progress: 80 },
  { name: "Git", icon: FaGitAlt, color: "text-orange-600", progress: 85 },
  { name: "GitHub", icon: FaGithub, color: "text-white", progress: 90 },
  { name: "REST APIs", icon: TbApi, color: "text-blue-400", progress: 80 },
  { name: "JWT", icon: SiJsonwebtokens, color: "text-pink-500", progress: 70 },
  { name: "Responsive Design", icon: MdDevices, color: "text-purple-400", progress: 95 },
];

export const projects = [
  {
    title: "Music School of Delhi",
    description: "A comprehensive platform for a music academy featuring course enrollments, instructor profiles, and student dashboard.",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1470&auto=format&fit=crop",
    tech: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    github: "https://github.com",
    live: "https://msd-app.vercel.app",
    featured: true,
  },
  {
    title: "Fameflex",
    description: "A modern, high-performance web platform with premium UI/UX, integrated services, and smooth animations.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1350&auto=format&fit=crop",
    tech: ["React", "Tailwind CSS", "Modern UI"],
    github: "https://github.com",
    live: "https://live.fameflex.in/",
    featured: true,
    useIframe: true,
  },

];

export const experience = [
  {
    title: "Self-Taught Full Stack Web Developer",
    company: "Continuous Learning & Self-Study",
    date: "2024 - Present",
    description: "Started learning modern web development in 2024 through continuous self-study. Built practical projects using HTML, CSS, JavaScript, React, Node.js, Express.js, and MongoDB. Learned from official documentation, online platforms, technical books, and real-world project practice. Focused on writing clean, responsive, and scalable applications following modern best practices. Received guidance and code reviews from experienced software engineers and mentors throughout the journey. Utilized AI tools like ChatGPT, Antigravity, Gemini, Claude AI, and GitHub Copilot responsibly to enhance productivity, debugging, and code quality while ensuring a solid grasp of underlying concepts. Currently building production-quality projects including a Music School Management System, Portfolio Website, Fameflex Platform, and other real-world applications.",
  },
];

export const services = [
  {
    title: "Frontend Development",
    description: "Building responsive, interactive, and modern user interfaces using React, Vue, or Vanilla JS.",
    icon: MdDevices,
  },
  {
    title: "Backend Development",
    description: "Creating robust and scalable server-side logic and databases using Node.js, Express, and MongoDB.",
    icon: TbApi,
  },
  {
    title: "Full Stack Development",
    description: "End-to-end web application development, bridging the gap between frontend interfaces and backend databases.",
    icon: FaReact,
  },
  {
    title: "API Integration",
    description: "Seamlessly connecting third-party services and APIs to enhance functionality and user experience.",
    icon: TbApi,
  },
];
