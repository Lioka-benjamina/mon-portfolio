import "../../sass/style.scss"
import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaFacebook, FaEnvelope, FaDownload, FaGithub } from "react-icons/fa";
import { SiHtml5, SiCss3, SiSass, SiJavascript, SiReact, SiNestjs, SiPhp, SiMysql, SiGit, SiGithub, SiSwagger, SiPostman } from "react-icons/si";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  image: string;
}

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const [text , setText] = useState("")
  const [isDeleting , setIsDeleting] = useState(false)
  const [loopNum , setLoopNum] = useState(0)
  const [typingSpeed , setTypingSpeed]  = useState(150)

  
  // Animation texte
  const textArray = [
    "Je suis un développeur FullStack ",
    "Passionné par le développement web",
    "Spécialisé en React & NestJS"
]

useEffect(()=>{
  const handleTyping = () =>{
      const current = loopNum % textArray.length
      const fullText = textArray[current]

      setText(
          isDeleting ? fullText.substring(0 , text.length - 1) : fullText.substring(0 , text.length + 1) 
      );

      setTypingSpeed(
          isDeleting ? 80 : 150
      );

      if(!isDeleting && text === fullText){
          setTimeout(()=>setIsDeleting(true) , 1500)
      }else if(isDeleting && text === ""){
          setIsDeleting(false)
          setLoopNum(loopNum + 1)

          setTypingSpeed(100)
      }
  }

  const timer = setTimeout(handleTyping, typingSpeed);
  return () => clearTimeout(timer);
},[text, isDeleting, loopNum, typingSpeed, textArray])

  // Pour détecter le scroll et changer le style du header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Pour l'intersection observer et la mise à jour de la section active
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-50px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Données des projets
  const projects: Project[] = [
    {
      id: 1,
      title: "Plateforme de blog avec commentaires",
      description: "Une plateforme de blog dynamique développée en PHP permettant aux utilisateurs de publier des articles et d’interagir via un système de commentaires.",
      technologies: ["HTML5", "CSS3","JAVASCRIPT", "PHP" , "MySQL"],
      githubLink: "https://github.com/Lioka-benjamina/Plateforme-de-blog-avec-commentaire.git",
      image: "/images/php.png"
    },
    {
      id: 2,
      title: "Calculateur d'interet simple",
      description: "Une application web qui permet aux utilisateurs de calculer rapidement les intérêts générés sur un capital donné selon la formule de l’intérêt simple.",
      technologies: ["HTML5", "CSS3", "JAVASCRIPT"],
      githubLink: "https://github.com/Lioka-benjamina/calculateur-d-interet-simple-projet-coursera-.git",
      // liveLink: "https://task-manager-demo.com",
      image: "/images/calculatrice.png"
    },
    {
      id: 3,
      title: "Gestion Bibliothèque",
      description: "Site web portfolio présentant mes projets et compétences, avec un design responsive et moderne.",
      technologies: ["HTML5", "CSS3","React", "Typescript", "Nest" , "MySQL"],
      githubLink: "https://github.com/Lioka-benjamina",
      image: "/images/dash.png"
    },
  ];

  // Fonction pour télécharger le CV
  const downloadCV = () => {
    // Cette fonction serait liée à un fichier réel en production
      const cvFile = '../../public/lioka benjamina - cv.pdf';
      const link = document.createElement('a');
      link.href = cvFile;
      link.download = 'Lioka_CV.pdf';
      link.click();
  };

  return (
    <div className="portfolio">
      {/* Header */}
      <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
        <div className="logo">
          <h1>LB</h1>
        </div>
        
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu de navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <a 
                href="#home" 
                className={activeSection === "home" ? "active" : ""}
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={activeSection === "about" ? "active" : ""}
                onClick={() => setIsMenuOpen(false)}
              >
                À Propos
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                className={activeSection === "services" ? "active" : ""}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className={activeSection === "skills" ? "active" : ""}
                onClick={() => setIsMenuOpen(false)}
              >
                Compétences
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className={activeSection === "projects" ? "active" : ""}
                onClick={() => setIsMenuOpen(false)}
              >
                Projets
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={activeSection === "contact" ? "active" : ""}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Section Accueil */}
        <section id="home" className="home-section">
          <div className="container">
            <div className="content">
              <div className="text-content">
                <h1>Lioka Benjamina</h1>
                <h2>Développeur Web Full Stack</h2>
                <p>{text}  <span className="text-blue-400 animate-pulse">|</span></p>
                <div className="cta-buttons">
                  <a href="#contact" className="btn btn-primary">Me Contacter</a>
                  <button onClick={downloadCV} className="btn btn-secondary">
                    <FaDownload /> Télécharger CV
                  </button>
                </div>
              </div>
              <div className="image-container">
                <img src="/images/toque.jpeg" alt="Lioka Benjamina" className="profile-image" />
              </div>
            </div>
          </div>
        </section>

        {/* Section À Propos */}
        <section id="about" className="about-section">
          <div className="container">
            <h2 className="section-title">À Propos</h2>
            <div className="about-content">
              <div className="about-image">
                <div className="dessus"></div>
                <img src="/images/luc.jpg" alt="Lioka Benjamina" />
              </div>
              <div className="about-text">
                <h3>Lioka Benjamina</h3>
                <p className="subtitle">Développeur web passionné</p>
                <p>
                  Développeur web passionné, spécialisé en React et NestJS. Diplômé licence en informatique, 
                  je me concentre sur l'acquisition de compétences pour devenir un développeur Full Stack JavaScript. 
                  Motivé par l'apprentissage constant et la résolution de défis techniques, je suis déterminé 
                  à perfectionner mes compétences en développement backend et frontend afin de créer des 
                  applications web modernes et performantes.
                </p>
                <div className="personal-info">
                  <div className="info-item">
                    <span className="label">Âge:</span>
                    <span className="value">21 ans</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Adresse:</span>
                    <span className="value">IVB 868 Ambohimanala</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">liokabenjamina21@gmail.com</span>
                  </div>
                  <div className="info-item">
                    <span className="label">WhatsApp:</span>
                    <span className="value">+261 38 69 909 01</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Services */}
        <section id="services" className="services-section">
          <div className="container">
            <h2 className="section-title">Mes Services</h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">
                  <SiReact />
                </div>
                <h3>Développement Frontend</h3>
                <p>Création d'interfaces utilisateur réactives et modernes avec React, HTML5, CSS3 et JavaScript.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <SiNestjs />
                </div>
                <h3>Développement Backend</h3>
                <p>Développement d'APIs robustes et évolutives avec NestJS, incluant l'authentification et la sécurité.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <SiMysql />
                </div>
                <h3>Base de données</h3>
                <p>Conception et optimisation de bases de données, écriture de requêtes SQL efficaces et gestion de données.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <SiGit />
                </div>
                <h3>Gestion de Version</h3>
                <p>Mise en place et gestion de flux de travail Git, collaboration en équipe et déploiement continu.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Compétences */}
        <section id="skills" className="skills-section">
          <div className="container">
            <h2 className="section-title">Mes Compétences</h2>
            <div className="skills-container">
              <div className="skills-category">
                <h3>Technologies</h3>
                <div className="skills-grid">
                  <div className="skill-item">
                    <SiHtml5 className="skill-icon html" />
                    <span>HTML5</span>
                  </div>
                  <div className="skill-item">
                    <SiCss3 className="skill-icon css" />
                    <span>CSS3</span>
                  </div>
                  <div className="skill-item">
                    <SiSass className="skill-icon sass" />
                    <span>Sass</span>
                  </div>
                  <div className="skill-item">
                    <SiJavascript className="skill-icon js" />
                    <span>JavaScript</span>
                  </div>
                  <div className="skill-item">
                    <SiReact className="skill-icon react" />
                    <span>React.js</span>
                  </div>
                  <div className="skill-item">
                    <SiNestjs className="skill-icon nest" />
                    <span>NestJS</span>
                  </div>
                  <div className="skill-item">
                    <SiPhp className="skill-icon php" />
                    <span>PHP</span>
                  </div>
                </div>
              </div>
              <div className="skills-category">
                <h3>Outils</h3>
                <div className="skills-grid">
                  <div className="skill-item">
                    <SiMysql className="skill-icon mysql" />
                    <span>SQL</span>
                  </div>
                  <div className="skill-item">
                    <SiGit className="skill-icon git" />
                    <span>Git</span>
                  </div>
                  <div className="skill-item">
                    <SiGithub className="skill-icon github" />
                    <span>GitHub</span>
                  </div>
                  <div className="skill-item">
                    {/* <SiVscode className="skill-icon vscode" /> */}
                    <span>VSCode</span>
                  </div>
                  <div className="skill-item">
                    <SiSwagger className="skill-icon swagger" />
                    <span>Swagger</span>
                  </div>
                  <div className="skill-item">
                    <SiPostman className="skill-icon postman" />
                    <span>Postman</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Projets */}
        <section id="projects" className="projects-section">
          <div className="container">
            <h2 className="section-title">Mes Projets</h2>
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                        <FaGithub /> GitHub
                      </a>
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                          Voir le projet
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Contact */}
        <section id="contact" className="contact-section">
          <div className="container">
            <h2 className="section-title">Contact</h2>
            <div className="contact-content">
              <div className="contact-info">
                <div className="info-card">
                  <div className="icon">
                    <FaWhatsapp />
                  </div>
                  <h3>WhatsApp</h3>
                  <p>+261 38 69 909 01</p>
                  <a href="https://wa.me/261386990901" target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                    Envoyer un message
                  </a>
                </div>
                <div className="info-card">
                  <div className="icon">
                    <FaEnvelope />
                  </div>
                  <h3>Email</h3>
                  <p>liokabenjamina21@gmail.com</p>
                  <a href="mailto:liokabenjamina21@gmail.com" className="btn btn-sm">
                    Envoyer un email
                  </a>
                </div>
                <div className="info-card">
                  <div className="icon">
                    <FaFacebook />
                  </div>
                  <h3>Facebook</h3>
                  <p>Lioka Benjamina</p>
                  <a href="https://web.facebook.com/profile.php?id=61564396906809" target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                    Visiter le profil
                  </a>
                </div>
              </div>
              <div className="contact-form">
                <h3>Envoyez-moi un message</h3>
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Votre nom" required />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Votre email" required />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Sujet" required />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Votre message" rows={5} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Envoyer</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>Lioka Benjamina</h2>
              <p>Développeur Web Full Stack</p>
            </div>
            <div className="footer-links">
              <h3>Liens rapides</h3>
              <ul>
                <li><a href="#home">Accueil</a></li>
                <li><a href="#about">À Propos</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#skills">Compétences</a></li>
                <li><a href="#projects">Projets</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-social">
              <h3>Réseaux sociaux</h3>
              <div className="social-icons">
                <a href="https://wa.me/261386990901" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp />
                </a>
                <a href="https://web.facebook.com/profile.php?id=61564396906809" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
                <a href="mailto:liokabenjamina21@gmail.com">
                  <FaEnvelope />
                </a>
                <a href="https://github.com/Lioka-benjamina" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} Lioka Benjamina. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;