import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects } from "../constants";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectBlock = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  
  // Subtle parallax for images
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  return (
    <div ref={ref} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20 w-full mb-40 group`}>
      
      {/* Visual / 3D Mockup Container */}
      <div className="w-full lg:w-[60%] relative h-[400px] lg:h-[600px] rounded-[2rem] overflow-hidden glass-effect border border-white/10 perspective-[1200px]">
        {/* Floating gradient orb behind the image */}
        <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0"></div>
        
        <motion.div 
          style={{ y }} 
          className={`absolute inset-0 w-full h-[130%] -top-[15%] origin-center transition-transform duration-1000 ease-[0.16,1,0.3,1] ${isEven ? 'group-hover:rotate-y-12 group-hover:rotate-x-12' : 'group-hover:-rotate-y-12 group-hover:rotate-x-12'} transform-gpu z-10 preserve-3d`}
        >
          {project.useIframe ? (
            <iframe
              src={project.live}
              title={project.title}
              className="w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-1000 border-none bg-white"
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-1000"
            />
          )}
        </motion.div>
      </div>

      {/* Info Container */}
      <div className="w-full lg:w-[40%] flex flex-col items-start space-y-6 z-10">
        <span className="text-primary text-sm font-bold tracking-widest uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
          0{index + 1}
        </span>
        <h3 className="text-4xl lg:text-6xl font-bold text-white tracking-tighter leading-tight">
          {project.title}
        </h3>
        <p className="text-muted-text text-xl leading-relaxed font-light">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-3 pt-2">
          {project.tech.map((tech, i) => (
            <span key={i} className="text-xs font-medium text-white/80 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6 pt-6">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic flex items-center gap-2 text-white font-semibold hover:text-primary transition-colors uppercase tracking-wider text-sm bg-white/5 px-6 py-3 rounded-full border border-white/10"
            >
              <FaExternalLinkAlt /> Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-wider text-sm px-4 py-3"
            >
              <FaGithub size={20} /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-32 relative z-10">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="mb-32">
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight">
            Selected <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Works</span>
          </h2>
        </div>

        <div className="flex flex-col w-full">
          {projects.map((project, index) => (
            <ProjectBlock key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
