import React, { useState, useEffect, useRef } from 'react';
import { 
  Leaf, 
  Trash2, 
  BookOpen, 
  RefreshCw, 
  Users, 
  Heart, 
  Megaphone, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp, 
  Menu, 
  X, 
  CheckCircle,
  ChevronRight,
  TrendingUp,
  Award,
  Shield,
  DollarSign
} from 'lucide-react';

// Custom Social SVG Components to bypass Lucide trademark omissions
const Instagram = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Youtube = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const Linkedin = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Facebook = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

// Custom Count-up Counter Component
const StatCounter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  return (
    <span ref={elementRef}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

function App() {
  // Navigation & Scroll states
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Modals & User interaction states
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationStep, setDonationStep] = useState(1); // 1 = input, 2 = success
  const [donationAmount, setDonationAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [donationName, setDonationName] = useState('');
  const [donationEmail, setDonationEmail] = useState('');
  const [donationErrors, setDonationErrors] = useState({});

  const [selectedProgram, setSelectedProgram] = useState(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [showFormSuccess, setShowFormSuccess] = useState(false);

  // Program details data
  const programsData = [
    {
      id: 1,
      title: 'Tree Plantation',
      icon: <Leaf size={32} />,
      description: 'Organize local tree-planting campaigns and restore green spaces.',
      details: 'We identify areas in need of afforestation, organize plantation drives, and collaborate with local nurseries. Volunteers help plant saplings, learn about soil health, and join watering cycles to ensure high survival rates.',
      stats: '12,500+ trees planted this year',
      impactGoal: 'Goal: 20,000 trees by year end'
    },
    {
      id: 2,
      title: 'Clean Community',
      icon: <Trash2 size={32} />,
      description: 'Conduct waste collection and community clean-up drives.',
      details: 'Our weekly clean-up drives bring volunteers to parks, streets, and water bodies. We sort waste on-site, separate recyclables, compost organic waste, and ensure plastic and electronic materials are routed to authorized recycling centers.',
      stats: '75+ successful drives completed',
      impactGoal: 'Goal: 100 community drives'
    },
    {
      id: 3,
      title: 'Eco Education',
      icon: <BookOpen size={32} />,
      description: 'Conduct workshops and awareness programs for students and communities.',
      details: 'We host schools and college workshops to educate students on biodiversity loss, waste segregation, and climate change. Through hands-on experiments and outdoor visits, we inspire the next generation to lead eco-conscious lives.',
      stats: '40+ schools and colleges reached',
      impactGoal: 'Goal: 5,000+ students educated'
    },
    {
      id: 4,
      title: 'Sustainable Living',
      icon: <RefreshCw size={32} />,
      description: 'Promote practical habits such as waste reduction, recycling, and responsible consumption.',
      details: 'We support local community initiatives for rain-water harvesting, organic rooftop gardening, and zero-waste lifestyles. We distribute guidelines on simple habit changes like eliminating single-use plastics and adopting composting.',
      stats: '8,200+ households participating',
      impactGoal: 'Goal: 15,000 zero-waste homes'
    }
  ];

  // Scroll reveal setup
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((reveal) => observer.observe(reveal));

    // Scroll listener for sticky navbar & back-to-top button
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Determine active section based on scroll position
      const sections = ['home', 'about', 'programs', 'impact', 'get-involved', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll handler
  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      const navOffset = 80;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Contact form submission handler
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!contactName.trim()) errors.name = 'Name is required';
    if (!contactEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactEmail)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!contactSubject.trim()) errors.subject = 'Subject is required';
    if (!contactMessage.trim()) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setShowFormSuccess(false);
    } else {
      setFormErrors({});
      setShowFormSuccess(true);
      // Reset fields
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    }
  };

  // Donation form submission
  const handleDonationSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!donationName.trim()) errors.name = 'Full name is required';
    if (!donationEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(donationEmail)) {
      errors.email = 'Please enter a valid email address';
    }
    const finalAmount = donationAmount === 'custom' ? customAmount : donationAmount;
    if (!finalAmount || isNaN(finalAmount) || parseFloat(finalAmount) <= 0) {
      errors.amount = 'Please specify a valid amount';
    }

    if (Object.keys(errors).length > 0) {
      setDonationErrors(errors);
    } else {
      setDonationErrors({});
      setDonationStep(2); // Go to success step
    }
  };

  const closeDonateModal = () => {
    setShowDonateModal(false);
    setDonationStep(1);
    setDonationName('');
    setDonationEmail('');
    setCustomAmount('');
    setDonationErrors({});
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="logo" onClick={() => handleNavClick('home')}>
            <Leaf size={28} className="logo-leaf" fill="currentColor" />
            <span>EcoVana</span>
          </div>

          <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <li className={`nav-item ${activeSection === 'home' ? 'active' : ''}`} onClick={() => handleNavClick('home')}>Home</li>
            <li className={`nav-item ${activeSection === 'about' ? 'active' : ''}`} onClick={() => handleNavClick('about')}>About</li>
            <li className={`nav-item ${activeSection === 'programs' ? 'active' : ''}`} onClick={() => handleNavClick('programs')}>Programs</li>
            <li className={`nav-item ${activeSection === 'impact' ? 'active' : ''}`} onClick={() => handleNavClick('impact')}>Impact</li>
            <li className={`nav-item ${activeSection === 'get-involved' ? 'active' : ''}`} onClick={() => handleNavClick('get-involved')}>Get Involved</li>
            <li className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => handleNavClick('contact')}>Contact</li>
            
            {/* CTA inside mobile nav list */}
            <li className="mobile-menu-cta">
              <button className="btn btn-accent" onClick={() => { setShowDonateModal(true); setIsMobileMenuOpen(false); }}>
                <Heart size={16} fill="currentColor" /> Donate
              </button>
            </li>
          </ul>

          <div className="nav-actions">
            <button className="btn btn-accent" onClick={() => setShowDonateModal(true)}>
              <Heart size={16} fill="currentColor" /> Donate
            </button>
          </div>

          <button className="mobile-nav-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content reveal">
              <div className="hero-tag">
                <Leaf size={14} fill="currentColor" /> EcoVana Awareness Campaign
              </div>
              <h1 className="hero-title">Small Actions. Greener Tomorrow.</h1>
              <p className="hero-description">
                EcoVana empowers communities and young people to create cleaner, healthier, and more sustainable environments. Together, we can restore nature and build resilient eco-conscious societies.
              </p>
              <div className="hero-btn-group">
                <button className="btn btn-primary" onClick={() => handleNavClick('get-involved')}>
                  Get Involved <ChevronRight size={16} />
                </button>
                <button className="btn btn-secondary" onClick={() => handleNavClick('impact')}>
                  Explore Our Impact
                </button>
              </div>
            </div>
            <div className="hero-image-container reveal">
              <img 
                src="/hero-volunteers.png" 
                alt="Environmental volunteers working together" 
                className="hero-img" 
              />
              <div className="hero-stats-badge">
                <div className="hero-stats-badge-icon">
                  <Users size={24} />
                </div>
                <div className="hero-stats-badge-text">
                  <h4>Join the Movement</h4>
                  <p>Over 8,000 volunteers nationwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats Bar */}
      <section className="quick-stats-section">
        <div className="container">
          <div className="quick-stats-grid">
            <div className="stat-item">
              <h3><StatCounter target={12500} suffix="+" /></h3>
              <p>Trees Planted</p>
            </div>
            <div className="stat-item">
              <h3><StatCounter target={8200} suffix="+" /></h3>
              <p>Volunteers</p>
            </div>
            <div className="stat-item">
              <h3><StatCounter target={75} suffix="+" /></h3>
              <p>Clean-Up Drives</p>
            </div>
            <div className="stat-item">
              <h3><StatCounter target={40} suffix="+" /></h3>
              <p>Communities Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding reveal">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-side">
              <img 
                src="/about-cleanup.png" 
                alt="EcoVana volunteers cleaning up local park spaces" 
                className="about-img" 
              />
              <div className="about-floating-badge">
                <span>5+</span>
                <p>Years of Action</p>
              </div>
            </div>
            <div className="about-content-side">
              <div className="section-tag">About EcoVana</div>
              <h2>Who We Are</h2>
              <p className="about-text">
                EcoVana is an environmental awareness NGO dedicated to steering localized action for ecological conservation. We believe that grand transformations stem from everyday personal habits and community collaborations.
              </p>
              
              <div className="about-mission-vision">
                <div className="mv-card">
                  <h4><Shield size={16} /> Our Mission</h4>
                  <p>To mobilize citizens, especially youth, to lead waste cleanup, ecological restoration, and sustainability education across rural and urban centers.</p>
                </div>
                <div className="mv-card">
                  <h4><TrendingUp size={16} /> Our Vision</h4>
                  <p>A plastic-free, lush green planet where communities actively manage resources responsibly and co-exist in harmony with natural ecosystems.</p>
                </div>
              </div>
              
              <p className="about-text" style={{ fontStyle: 'italic', color: 'var(--primary-medium)', fontWeight: 600 }}>
                "Why Environmental Action Matters: The choices we make today shape our ecological inheritance. By acting together locally, we trigger global relief against ecosystem degradation."
              </p>
            </div>
          </div>

          <div className="values-row">
            <div className="value-card reveal">
              <div className="value-icon-container">
                <Users size={28} />
              </div>
              <h3>Community First</h3>
              <p>We work root-up. Every project is co-created with localized communities to ensure long-term, self-sustaining conservation habits.</p>
            </div>
            <div className="value-card reveal">
              <div className="value-icon-container">
                <Leaf size={28} />
              </div>
              <h3>Sustainable Action</h3>
              <p>We believe in practical, measurable metrics. Our programs prioritize actions that create permanent eco-improvements and reduce waste streams.</p>
            </div>
            <div className="value-card reveal">
              <div className="value-icon-container">
                <Award size={28} />
              </div>
              <h3>Youth Empowerment</h3>
              <p>Young minds hold the key to structural changes. We equip students with resources, confidence, and leadership to host regional environment chapters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section ("What We Do") */}
      <section id="programs" className="programs-section section-padding reveal">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Our Programs</div>
            <h2 className="section-title">What We Do</h2>
            <p className="section-subtitle">Discover our four core focus areas aimed at fostering sustainable environments and restoring natural habitats.</p>
          </div>

          <div className="programs-grid">
            {programsData.map((program) => (
              <div className="program-card reveal" key={program.id}>
                <div className="program-card-header">
                  <div className="program-icon-wrapper">
                    {program.icon}
                  </div>
                  <h3>{program.title}</h3>
                </div>
                <div className="program-card-body">
                  <p>{program.description}</p>
                  <button className="program-link btn-secondary btn" onClick={() => setSelectedProgram(program)}>
                    Learn More <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="impact-section section-padding reveal">
        <div className="container">
          <div className="impact-grid">
            <div className="impact-left">
              <div className="section-tag" style={{ backgroundColor: 'rgba(30, 77, 43, 0.08)' }}>Our Impact</div>
              <h2>Making a Real, Measurable Difference</h2>
              <p>We measure our success not by promises, but by seeds sown, plastic collected, and minds inspired. Every milestone reflects the energy of volunteers working in unison.</p>
              <p className="impact-statement">"Real change begins when communities act together."</p>
            </div>
            <div className="impact-right-grid">
              <div className="impact-card">
                <div className="impact-card-icon">
                  <Leaf size={24} />
                </div>
                <div className="impact-card-number">
                  <StatCounter target={12500} suffix="+" />
                </div>
                <div className="impact-card-label">Trees Planted</div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="impact-card">
                <div className="impact-card-icon">
                  <Users size={24} />
                </div>
                <div className="impact-card-number">
                  <StatCounter target={8200} suffix="+" />
                </div>
                <div className="impact-card-label">Volunteers Engaged</div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="impact-card">
                <div className="impact-card-icon">
                  <Trash2 size={24} />
                </div>
                <div className="impact-card-number">
                  <StatCounter target={75} suffix="+" />
                </div>
                <div className="impact-card-label">Clean-up Drives</div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="impact-card">
                <div className="impact-card-icon">
                  <BookOpen size={24} />
                </div>
                <div className="impact-card-number">
                  <StatCounter target={40} suffix="+" />
                </div>
                <div className="impact-card-label">Schools Reached</div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="section-padding reveal">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Take Part</div>
            <h2 className="section-title">Ways to Join Us</h2>
            <p className="section-subtitle">Your time, support, or voice can create ripples of positive change. Find the best route for your involvement below.</p>
          </div>

          <div className="get-involved-grid">
            <div className="involve-card reveal">
              <div className="involve-icon-wrapper">
                <Users size={28} />
              </div>
              <h3>Volunteer</h3>
              <p>Join our weekend cleanup drives, tree-plantation events, or education chapters.</p>
              <button className="btn btn-secondary" onClick={() => handleNavClick('contact')}>Sign Up</button>
            </div>
            
            <div className="involve-card reveal">
              <div className="involve-icon-wrapper">
                <Heart size={28} />
              </div>
              <h3>Donate</h3>
              <p>Fuel cleanups, purchase saplings, and supply workshops with necessary teaching tools.</p>
              <button className="btn btn-secondary" onClick={() => setShowDonateModal(true)}>Give Support</button>
            </div>

            <div className="involve-card reveal">
              <div className="involve-icon-wrapper">
                <Calendar size={28} />
              </div>
              <h3>Organize</h3>
              <p>Initiate an environmental drive in your housing complex, school, or corporate block.</p>
              <button className="btn btn-secondary" onClick={() => handleNavClick('contact')}>Get Plan</button>
            </div>

            <div className="involve-card reveal">
              <div className="involve-icon-wrapper">
                <Megaphone size={28} />
              </div>
              <h3>Spread Word</h3>
              <p>Promote sustainable living tips on social networks or run webinars on local habits.</p>
              <button className="btn btn-secondary" onClick={() => handleNavClick('contact')}>Share Toolkit</button>
            </div>
          </div>

          <div className="cta-banner reveal">
            <h2>Be Part of the Change</h2>
            <p>Our efforts depend on people like you. By taking a stand today, you build a sustainable foundation for clean air, water, and green land tomorrow.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button className="btn btn-accent" onClick={() => setShowDonateModal(true)}>
                Donate Funds
              </button>
              <button className="btn btn-primary" style={{ backgroundColor: 'var(--white)', color: 'var(--primary-medium)' }} onClick={() => handleNavClick('contact')}>
                Register as Volunteer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding reveal">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Reach Us</div>
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">Have questions about our initiatives or want to collaborate? Write to us, and we will get back to you shortly.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info-side reveal">
              <div>
                <h2>Contact Info</h2>
                <p>Have an inquiry or proposal? Contact us directly using the details below or follow our social outlets.</p>
                
                <div className="info-items">
                  <div className="info-item">
                    <div className="info-icon">
                      <Mail size={20} />
                    </div>
                    <div className="info-text">
                      <h4>Email Us</h4>
                      <p>hello@ecovana.org</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <Phone size={20} />
                    </div>
                    <div className="info-text">
                      <h4>Call Us</h4>
                      <p>+91 90000 12345</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="info-text">
                      <h4>Our Base</h4>
                      <p>Bengaluru, Karnataka, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="social-links">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
                    <Youtube size={20} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-side reveal">
              {showFormSuccess && (
                <div className="success-alert">
                  <CheckCircle size={24} />
                  <div>
                    <p style={{ margin: 0, color: 'var(--success)' }}>Thank you for reaching out! Your message was sent successfully.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleContactSubmit}>
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name</label>
                    <input 
                      id="contact-name"
                      type="text" 
                      placeholder="Jane Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                    {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address</label>
                    <input 
                      id="contact-email"
                      type="email" 
                      placeholder="jane@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                    {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input 
                    id="contact-subject"
                    type="text" 
                    placeholder="Volunteer opportunity / Partnership Inquiry"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                  />
                  {formErrors.subject && <span className="form-error">{formErrors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea 
                    id="contact-message"
                    placeholder="Hi EcoVana Team, I'd love to help organize..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                  />
                  {formErrors.message && <span className="form-error">{formErrors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <div className="footer-logo">
                <Leaf size={24} className="logo-leaf" fill="currentColor" />
                <span>EcoVana</span>
              </div>
              <p className="footer-desc">
                EcoVana is an environmental NGO mobilizing youth and communities for tree plantation, waste reduction, clean campaigns, and ecological stewardship.
              </p>
              <div className="social-links">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
                  <Youtube size={18} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About Us</a></li>
                <li><a href="#programs" onClick={(e) => { e.preventDefault(); handleNavClick('programs'); }}>Programs</a></li>
                <li><a href="#impact" onClick={(e) => { e.preventDefault(); handleNavClick('impact'); }}>Impact</a></li>
                <li><a href="#get-involved" onClick={(e) => { e.preventDefault(); handleNavClick('get-involved'); }}>Get Involved</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Programs</h4>
              <ul className="footer-links">
                <li><a href="#programs" onClick={(e) => { e.preventDefault(); handleNavClick('programs'); setSelectedProgram(programsData[0]); }}>Tree Plantation</a></li>
                <li><a href="#programs" onClick={(e) => { e.preventDefault(); handleNavClick('programs'); setSelectedProgram(programsData[1]); }}>Clean Community</a></li>
                <li><a href="#programs" onClick={(e) => { e.preventDefault(); handleNavClick('programs'); setSelectedProgram(programsData[2]); }}>Eco Education</a></li>
                <li><a href="#programs" onClick={(e) => { e.preventDefault(); handleNavClick('programs'); setSelectedProgram(programsData[3]); }}>Sustainable Living</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Find Us</h4>
              <div className="footer-contact-info">
                <div className="footer-contact-item">
                  <Mail size={16} />
                  <span>hello@ecovana.org</span>
                </div>
                <div className="footer-contact-item">
                  <Phone size={16} />
                  <span>+91 90000 12345</span>
                </div>
                <div className="footer-contact-item">
                  <MapPin size={16} />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              Copyright &copy; 2026 EcoVana. All rights reserved.
            </p>
            <p className="footer-copyright" style={{ fontSize: '13px' }}>
              Restoring habitats, building greener communities.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="modal-overlay" onClick={() => setSelectedProgram(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProgram(null)} aria-label="Close modal">
              <X size={24} />
            </button>
            <div className="modal-icon">
              {selectedProgram.icon}
            </div>
            <h3>{selectedProgram.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>{selectedProgram.description}</p>
            
            <div style={{ textAlign: 'left', backgroundColor: 'var(--primary-soft)', padding: '20px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
              <h4 style={{ color: 'var(--primary-deep)', fontSize: '15px', marginBottom: '8px' }}>Project Summary</h4>
              <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--text-dark)' }}>{selectedProgram.details}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '12px', fontSize: '13px', fontWeight: 700, color: 'var(--primary-medium)' }}>
                <span>{selectedProgram.stats}</span>
                <span>{selectedProgram.impactGoal}</span>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setSelectedProgram(null); handleNavClick('contact'); }}>
              Support/Volunteer for Program
            </button>
          </div>
        </div>
      )}

      {/* Donation Modal */}
      {showDonateModal && (
        <div className="modal-overlay" onClick={closeDonateModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeDonateModal} aria-label="Close modal">
              <X size={24} />
            </button>

            {donationStep === 1 ? (
              <form onSubmit={handleDonationSubmit}>
                <div className="modal-icon">
                  <Heart size={32} fill="currentColor" />
                </div>
                <h3>Support EcoVana</h3>
                <p>Your contribution directly funds saplings, sorting equipment, and schools-workshop kits.</p>

                <div className="donation-options">
                  <button 
                    type="button" 
                    className={`donation-option-btn ${donationAmount === '500' ? 'selected' : ''}`}
                    onClick={() => { setDonationAmount('500'); setCustomAmount(''); }}
                  >
                    ₹500
                  </button>
                  <button 
                    type="button" 
                    className={`donation-option-btn ${donationAmount === '1000' ? 'selected' : ''}`}
                    onClick={() => { setDonationAmount('1000'); setCustomAmount(''); }}
                  >
                    ₹1,000
                  </button>
                  <button 
                    type="button" 
                    className={`donation-option-btn ${donationAmount === '2500' ? 'selected' : ''}`}
                    onClick={() => { setDonationAmount('2500'); setCustomAmount(''); }}
                  >
                    ₹2,500
                  </button>
                  <button 
                    type="button" 
                    className={`donation-option-btn ${donationAmount === 'custom' ? 'selected' : ''}`}
                    onClick={() => setDonationAmount('custom')}
                    style={{ gridColumn: 'span 3' }}
                  >
                    Custom Amount
                  </button>
                </div>

                {donationAmount === 'custom' && (
                  <div className="custom-donation-input">
                    <span>₹</span>
                    <input 
                      type="number" 
                      placeholder="Enter amount (e.g. 5000)" 
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                    />
                  </div>
                )}
                {donationErrors.amount && <p className="form-error" style={{ textAlign: 'center', marginTop: '-12px', marginBottom: '16px' }}>{donationErrors.amount}</p>}

                <div className="form-group" style={{ textAlign: 'left' }}>
                  <label htmlFor="donation-name">Full Name</label>
                  <input 
                    id="donation-name"
                    type="text" 
                    placeholder="John Doe"
                    value={donationName}
                    onChange={(e) => setDonationName(e.target.value)}
                  />
                  {donationErrors.name && <span className="form-error">{donationErrors.name}</span>}
                </div>

                <div className="form-group" style={{ textAlign: 'left' }}>
                  <label htmlFor="donation-email">Email Address</label>
                  <input 
                    id="donation-email"
                    type="email" 
                    placeholder="john@example.com"
                    value={donationEmail}
                    onChange={(e) => setDonationEmail(e.target.value)}
                  />
                  {donationErrors.email && <span className="form-error">{donationErrors.email}</span>}
                </div>

                <button type="submit" className="btn btn-accent" style={{ width: '100%', marginTop: '8px' }}>
                  Proceed to Pay
                </button>
              </form>
            ) : (
              <div style={{ padding: '10px 0' }}>
                <div className="modal-icon" style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--success)' }}>
                  <CheckCircle size={32} />
                </div>
                <h3>Thank You, {donationName}!</h3>
                <p style={{ marginBottom: '20px' }}>
                  We successfully received your pledge of <strong>₹{donationAmount === 'custom' ? customAmount : donationAmount}</strong>. 
                  A tax deduction receipt and summary report have been sent to <strong>{donationEmail}</strong>.
                </p>
                <div style={{ backgroundColor: 'var(--primary-soft)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px', fontSize: '14px', color: 'var(--primary-medium)' }}>
                  "Every seed sown builds a shield for our climate."
                </div>
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={closeDonateModal}>
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
