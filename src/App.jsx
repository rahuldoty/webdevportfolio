import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiExternalLink, FiDownload } from 'react-icons/fi'
import { HiOutlineCode } from 'react-icons/hi'
import emailjs from '@emailjs/browser'
import './App.css'

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
  })

  // Initialize EmailJS with your credentials
  useEffect(() => {
    // Replace these with your actual EmailJS credentials
    const EMAILJS_PUBLIC_KEY = 'CeyVLHZxoI39eKz3y'
    const EMAILJS_SERVICE_ID = 'service_mz3652t'
    const EMAILJS_TEMPLATE_ID = 'template_pry9vi7'

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      console.error('EmailJS credentials are missing. Please add them to the code.')
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Email service is not configured. Please contact the website administrator.'
      })
      return
    }

    emailjs.init(EMAILJS_PUBLIC_KEY)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'skills', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  const handleContactClick = () => {
    window.location.href = 'mailto:your.email@example.com'
  }

  const handleSocialClick = (platform) => {
    const socialLinks = {
      github: 'https://github.com/rahuldoty',
      linkedin: 'https://linkedin.com/in/rahuly',
      twitter: 'https://twitter.com/rahuldoty',
      email: 'mailto:your.email@example.com'
    }
    window.open(socialLinks[platform], '_blank')
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ loading: true, success: false, error: false, message: '' })

    // Set a timeout to handle cases where the request hangs
    const timeoutId = setTimeout(() => {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Request timed out. Please check your internet connection and try again.'
      })
    }, 10000) // 10 seconds timeout

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all fields')
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

      // Send email using EmailJS
      const templateParams = {
        sender_name: formData.name,
        sender_email: formData.email,
        recipient_name: "Rahul",
        recipient_email: "rahuldoty@gmail.com",
        message: formData.message,
        reply_to: formData.email
      }

      console.log('Sending email with params:', templateParams)

      const response = await Promise.race([
        emailjs.send(
          "service_mz3652t",
          "template_pry9vi7",
          templateParams
        ),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timed out')), 10000)
        )
      ])

      clearTimeout(timeoutId) // Clear the timeout if request succeeds

      console.log('EmailJS response:', response)

      if (response.status === 200) {
        setFormStatus({
          loading: false,
          success: true,
          error: false,
          message: 'Message sent successfully! I will get back to you soon.'
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error(`Failed to send message. Status: ${response.status}`)
      }
    } catch (error) {
      clearTimeout(timeoutId) // Clear the timeout if request fails
      console.error('Email sending error:', error)
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      })
      
      let errorMessage = 'An error occurred while sending the message. Please try again later.'
      
      if (error.message.includes('Invalid template ID')) {
        errorMessage = 'Email template is not properly configured. Please contact the website administrator.'
      } else if (error.message.includes('Invalid service ID')) {
        errorMessage = 'Email service is not properly configured. Please contact the website administrator.'
      } else if (error.message.includes('Invalid public key')) {
        errorMessage = 'Email service is not properly configured. Please contact the website administrator.'
      } else if (error.message.includes('Request timed out')) {
        errorMessage = 'The request took too long. Please check your internet connection and try again.'
      }

      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: errorMessage
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear any previous status messages when user starts typing
    if (formStatus.message) {
      setFormStatus({ loading: false, success: false, error: false, message: '' })
    }
  }

  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform with React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://rahuldoty.github.io/SenoopsyMerch',
      live: 'https://rahuldoty.github.io/SenoopsyMerch'
    },
    {
      title: 'Task Management App',
      description: 'A real-time task management application with authentication',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      github: 'https://github.com/yourusername/task-manager',
      live: 'https://task-manager-demo.com'
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website built with React and Tailwind CSS',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/yourusername/portfolio',
      live: 'https://portfolio-demo.com'
    }
  ]

  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'RESTful APIs']
    },
    {
      category: 'Tools & Others',
      items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Agile/Scrum']
    }
  ]

  const handleDownloadResume = () => {
    // Create a temporary link element
    const link = document.createElement('a')
    link.href = '/RAHULResume.pdf' // Updated to match the actual filename
    link.download = 'RahulResume.pdf' // This will be the downloaded file name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-secondary/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <HiOutlineCode className="text-accent text-2xl animate-pulse" />
              <span className="text-xl font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">Hello (*_*)ノ</span>
            </motion.div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadResume}
                className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors duration-300"
              >
                <FiDownload className="text-lg" />
                <span className="hidden md:inline">Resume</span>
              </motion.button>
              <div className="hidden md:flex items-center space-x-8">
                {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => {
                  const sectionId = item.toLowerCase()
                  return (
                    <a
                      key={item}
                      href={`#${sectionId}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(sectionId)
                      }}
                      className={`text-light hover:text-accent transition-colors duration-300 relative group py-2 ${
                        activeSection === sectionId ? 'text-accent' : ''
                      }`}
                    >
                      {item}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                        activeSection === sectionId ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Rest of the content */}
      <div className="pt-16">
        {/* Hero Section */}
        <section id="home" className="section flex items-center justify-center min-h-screen">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <motion.h1 
                className="heading bg-gradient-to-r from-accent via-blue-400 to-accent bg-clip-text text-transparent animate-gradient"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {Array.from("Rahul Yadagiri").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.1,
                        delay: index * 0.1
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.span
                    className="inline-block w-2 h-8 bg-accent ml-1"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </motion.span>
              </motion.h1>
              <p className="text-xl md:text-2xl mb-8 text-light/80 leading-relaxed">
                Full Stack Developer | Crafting innovative web solutions with modern technologies
              </p>
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="btn btn-primary shadow-lg shadow-accent/20 hover:shadow-accent/40"
                >
                  Get in Touch
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('projects')}
                  className="btn border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300"
                >
                  View Projects
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section bg-secondary/50">
          <div className="container mx-auto">
            <h2 className="heading text-center bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4 text-light/80"
              >
                <p className="text-lg leading-relaxed">
                  I'm Rahul, a passionate Full Stack Developer with expertise in building modern web applications.
                  My journey in web development started with a curiosity for creating digital experiences
                  that make a difference.
                </p>
                <p className="text-lg leading-relaxed">
                  I specialize in React, Node.js, and modern web technologies, focusing on creating
                  scalable and maintainable solutions. With a strong foundation in both frontend and backend
                  development, I bring ideas to life through clean, efficient code and user-centric design.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                {['React', 'Node.js', 'TypeScript', 'MongoDB'].map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-primary/50 rounded-lg text-center hover:bg-accent/20 transition-colors duration-300 border border-accent/20"
                  >
                    <span className="text-accent font-medium">{skill}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="container mx-auto">
            <h2 className="heading text-center bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-secondary/50 rounded-lg overflow-hidden border border-accent/20 hover:border-accent/40 transition-colors duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-light mb-2">{project.title}</h3>
                    <p className="text-light/80 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-accent/10 text-accent rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light/80 hover:text-accent transition-colors duration-300"
                      >
                        <FiGithub size={20} />
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light/80 hover:text-accent transition-colors duration-300"
                      >
                        <FiExternalLink size={20} />
        </a>
      </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section bg-secondary/50">
          <div className="container mx-auto">
            <h2 className="heading text-center bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">Skills</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {skills.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-primary/50 rounded-lg p-6 border border-accent/20"
                >
                  <h3 className="text-xl font-bold text-accent mb-4">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="container mx-auto max-w-4xl">
            <h2 className="heading text-center bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">Contact Me</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-light text-left">Let's Connect</h3>
                <p className="text-light/80 text-left">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <FiMail className="text-accent" size={24} />
                    <span className="text-light">rahuldoty@gmail.com</span>
                  </div>
                  <div className="flex space-x-4">
                    {[
                      { icon: <FiGithub size={24} />, platform: 'github' },
                      { icon: <FiLinkedin size={24} />, platform: 'linkedin' },
                      { icon: <FiTwitter size={24} />, platform: 'twitter' }
                    ].map((item, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.2, color: '#3B82F6' }}
                        onClick={() => handleSocialClick(item.platform)}
                        className="text-light/80 hover:text-accent transition-colors duration-300"
                      >
                        {item.icon}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                onSubmit={handleFormSubmit}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-light mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-primary/50 border border-accent/20 rounded-lg text-light focus:outline-none focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-light mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-primary/50 border border-accent/20 rounded-lg text-light focus:outline-none focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-light mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 bg-primary/50 border border-accent/20 rounded-lg text-light focus:outline-none focus:border-accent"
                    required
                    placeholder='Please add your email here for a reply.'
                  ></textarea>
                </div>
                {formStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg ${
                      formStatus.success ? 'bg-green-500/20 text-green-400' :
                      formStatus.error ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {formStatus.message}
                  </motion.div>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={formStatus.loading}
                  className={`w-full btn btn-primary shadow-lg shadow-accent/20 hover:shadow-accent/40 ${
                    formStatus.loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {formStatus.loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-light/80">© 2024 Rahul Yadagiri. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                {[
                  { icon: <FiGithub size={24} />, platform: 'github' },
                  { icon: <FiLinkedin size={24} />, platform: 'linkedin' },
                  { icon: <FiTwitter size={24} />, platform: 'twitter' },
                  { icon: <FiMail size={24} />, platform: 'email' }
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2, color: '#3B82F6' }}
                    onClick={() => handleSocialClick(item.platform)}
                    className="text-light/80 hover:text-accent transition-colors duration-300"
                  >
                    {item.icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
