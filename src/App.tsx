import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Code, 
  Database, 
  Cloud, 
  Award,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'certifications', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const skills = [
    { category: 'Languages', items: ['Python', 'JavaScript', 'HTML5', 'CSS3'], icon: Code },
    { category: 'Frameworks', items: ['Django', 'Bootstrap'], icon: Code },
    { category: 'Databases', items: ['SQLite', 'MySQL'], icon: Database },
    { category: 'Cloud & Tools', items: ['AWS', 'Git', 'GitHub'], icon: Cloud }
  ];

  const certifications = [
    'AWS Cloud Practitioner Essentials',
    'Getting Started with Cloud Acquisition (AWS)',
    'Job Roles in the Cloud (AWS)',
    'Fundamentos de ITIL® en Gestión de Servicios de TI, 4ª Edición'
  ];

  const projects = [
    {
      title: 'Automated Login Test with Selenium & Cucumber',
      description: 'Login flow automation using Selenium WebDriver with Cucumber in Java. Applied BDD testing best practices and Page Object Model for code maintainability.',
      technologies: ['Java', 'Selenium', 'Cucumber', 'BDD', 'Page Object Model'],
      status: 'Completed'
    },
    {
      title: 'To-Do App CRUD with Django',
      description: 'Web application for task management with CRUD functionalities using Python (Django), SQLite, HTML and CSS.',
      technologies: ['Python', 'Django', 'SQLite', 'HTML', 'CSS'],
      status: 'In Development'
    },
    {
      title: 'Personal Portfolio Website',
      description: 'Responsive static website built with modern web technologies. Published on GitHub Pages.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'GitHub Pages'],
      status: 'Completed'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gray-900">
              Luis Fernando Prada
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'certifications', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === item 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                {['home', 'about', 'skills', 'certifications', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                      activeSection === item 
                        ? 'text-blue-600 bg-blue-50 font-semibold' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="inline-block p-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8">
              <div className="bg-white rounded-full p-8">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                  LF
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Luis Fernando Prada Villadiego
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Systems Engineering Student & Aspiring Full Stack Developer
            </p>
            
            <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              Passionate about continuous learning and web development, seeking opportunities as a Full Stack Developer Trainee to apply and expand my skills in a startup environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              >
                View My Projects
                <ExternalLink size={20} />
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                Get In Touch
              </button>
            </div>

            <div className="flex justify-center space-x-6">
              <a 
                href="https://github.com/LuisFPrada" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Github size={28} />
              </a>
              <a 
                href="https://www.linkedin.com/in/luis-fernando-prada-villadiego/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Linkedin size={28} />
              </a>
              <a 
                href="mailto:luifernando1997@hotmail.com"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Mail size={28} />
              </a>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => scrollToSection('about')}
              className="animate-bounce text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 text-center">
                <div className="w-48 h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center text-4xl font-bold text-white mb-6">
                  LF
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-center text-gray-700">
                    <MapPin size={20} className="mr-2" />
                    Turbaco, Bolívar, Colombia
                  </div>
                  <div className="flex items-center justify-center text-gray-700">
                    <Phone size={20} className="mr-2" />
                    +57 312 655 2400
                  </div>
                  <div className="flex items-center justify-center text-gray-700">
                    <Mail size={20} className="mr-2" />
                    luifernando1997@hotmail.com
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Professional Profile</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                I am a Systems Engineering student with training in software development and work experience in technical support. I'm passionate about continuous learning and web development, with knowledge in Python, JavaScript, Object-Oriented Programming (OOP), and AWS cloud service fundamentals.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm actively seeking opportunities as a Full Stack Developer Trainee to apply and expand my skills in a startup environment. My goal is to contribute to innovative projects while continuing to grow as a developer.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Education</h4>
                  <p className="text-blue-800">Systems Engineering Student</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Experience</h4>
                  <p className="text-purple-800">Technical Support & Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    <skillGroup.icon className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{skillGroup.category}</h3>
                </div>
                
                <div className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Skills</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['Object-Oriented Programming', 'Version Control', 'LAN/WAN Networks', 'Incident Management', 'Problem Solving', 'Team Collaboration'].map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Certifications</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4 flex-shrink-0">
                    <Award className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert}</h3>
                    <p className="text-gray-600">Professional Certification</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://github.com/LuisFPrada"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
            >
              <Github size={20} />
              View All Projects on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
              I'm always interested in new opportunities and collaborations. Feel free to reach out!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
              <a href="tel:+573126552400" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                +57 312 655 2400
              </a>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <a href="mailto:luifernando1997@hotmail.com" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                luifernando1997@hotmail.com
              </a>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">Turbaco, Bolívar, Colombia</p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex justify-center space-x-8">
              <a 
                href="https://github.com/LuisFPrada" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                <Github size={24} />
                GitHub Profile
              </a>
              <a 
                href="https://www.linkedin.com/in/luis-fernando-prada-villadiego/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                <Linkedin size={24} />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Luis Fernando Prada Villadiego</h3>
            <p className="text-gray-400 mb-6">Systems Engineering Student & Aspiring Full Stack Developer</p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a 
                href="https://github.com/LuisFPrada" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/in/luis-fernando-prada-villadiego/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="mailto:luifernando1997@hotmail.com"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail size={24} />
              </a>
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © 2025 Luis Fernando Prada Villadiego. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;