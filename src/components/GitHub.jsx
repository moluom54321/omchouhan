import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";
import { FaStar, FaCodeBranch, FaGithub } from "react-icons/fa";

const GitHub = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your GitHub username
  const GITHUB_USERNAME = "octocat"; // Placeholder

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
        );
        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        }
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section className="py-24 relative z-10 bg-background/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-primary">GitHub</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {repos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeIn("up", "spring", index * 0.1, 1)}
                whileHover={{ y: -5 }}
                className="glass-effect p-6 rounded-2xl border border-border-color hover:border-primary transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaGithub className="text-3xl text-white" />
                  <h3 className="text-xl font-bold text-white truncate" title={repo.name}>
                    {repo.name}
                  </h3>
                </div>
                <p className="text-muted-text text-sm mb-6 flex-grow line-clamp-3">
                  {repo.description || "No description available"}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-muted-text text-sm hover:text-yellow-400 transition-colors">
                      <FaStar />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-text text-sm hover:text-white transition-colors">
                      <FaCodeBranch />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                  {repo.language && (
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-md">
                      {repo.language}
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GitHub;
