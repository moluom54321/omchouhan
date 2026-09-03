import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { projects } from "../constants";
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";

const ProjectBlock = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  
  // Subtle parallax for images
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  return (
    <div ref={ref} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20 w-full mb-36 group`}>
      
      {/* Visual / 3D Mockup Container */}
      <div className="w-full lg:w-[58%] relative h-[320px] lg:h-[540px] rounded-[2rem] overflow-hidden glass-effect border border-white/10 perspective-[1200px]">
        {/* Floating gradient orb behind the image */}
        <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0"></div>
        
        <motion.div 
          style={{ y }} 
          className={`absolute inset-0 w-full h-[120%] -top-[10%] origin-center transition-transform duration-1000 ease-[0.16,1,0.3,1] ${isEven ? 'group-hover:rotate-y-6 group-hover:rotate-x-6' : 'group-hover:-rotate-y-6 group-hover:rotate-x-6'} transform-gpu z-10 preserve-3d`}
        >
          {project.useIframe ? (
            <iframe
              src={project.live}
              title={project.title}
              className="w-full h-full object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-1000 border-none bg-white"
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-1000"
            />
          )}
        </motion.div>
      </div>

      {/* Info Container */}
      <div className="w-full lg:w-[42%] flex flex-col items-start space-y-5 z-10">
        <div className="flex items-center gap-3">
          <span className="text-primary text-xs font-bold tracking-widest uppercase bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            0{index + 1}
          </span>
          <span className="text-xs font-semibold text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            {project.projectType}
          </span>
        </div>

        <h3 className="text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          {project.title}
        </h3>

        {project.tagline && (
          <p className="text-primary text-xs font-semibold uppercase tracking-wider">
            {project.tagline}
          </p>
        )}

        <p className="text-muted-text text-base leading-relaxed font-light">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tech.map((tech, i) => (
            <span key={i} className="text-xs font-medium text-white/80 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic flex items-center gap-2 text-white font-semibold hover:text-primary transition-colors uppercase tracking-wider text-xs bg-white/5 px-6 py-3 rounded-full border border-white/10"
            >
              <FaExternalLinkAlt size={12} /> Live Preview
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-wider text-xs px-4 py-3"
            >
              <FaGithub size={16} /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-28 relative z-10">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-24">
          <div>
            <span className="text-primary text-xs font-bold tracking-widest uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              Selected Works
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mt-6">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Projects</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white transition-colors group"
          >
            <span>View All Case Studies & Filter by Industry</span>
            <FaArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-col w-full">
          {projects.map((project, index) => (
            <ProjectBlock key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-effect border border-white/10 text-white hover:border-primary text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
          >
            <span>Explore All Projects with Problem/Solution Breakdowns</span>
            <FaArrowRight size={13} className="text-primary" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
