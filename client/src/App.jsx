import { useEffect, useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Code2, Download, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { profile } from './profile.js';

const filters = ['All work', 'Full-stack', 'Frontend'];

function App() {
  useEffect(() => {
    document.title = `${profile.name} — ${profile.role}`;

    const header = document.querySelector('.site-header');
    const updatePageEffects = () => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
      header?.classList.toggle('is-scrolled', window.scrollY > 16);
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    updatePageEffects();
    const updatePointer = (event) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
    };

    window.addEventListener('scroll', updatePageEffects, { passive: true });
    window.addEventListener('pointermove', updatePointer, { passive: true });

    return () => {
      window.removeEventListener('scroll', updatePageEffects);
      window.removeEventListener('pointermove', updatePointer);
      revealObserver.disconnect();
    };
  }, []);

  const [activeFilter, setActiveFilter] = useState('All work');
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState('idle');
  const [copied, setCopied] = useState(false);
  const visibleProjects = profile.projects.filter((project) => activeFilter === 'All work' || project.category === activeFilter);

  const downloadResume = () => {
    const resume = `${profile.name}\n${profile.role} · ${profile.location}\n${profile.email}\n\nABOUT\n${profile.bio}\n\nEXPERIENCE\n${profile.experience.map((item) => `${item.period} | ${item.role} — ${item.company}\n${item.detail}`).join('\n\n')}\n\nSKILLS\n${profile.skills.map((group) => `${group.title}: ${group.items.join(', ')}`).join('\n')}`;
    const file = new Blob([resume], { type: 'text/plain' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.toLowerCase().replaceAll(' ', '-')}-resume.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const submitContact = (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const message = Object.fromEntries(new FormData(formElement).entries());
    const subject = `Portfolio inquiry from ${message.name}`;
    const body = `Name: ${message.name}\nEmail: ${message.email}\n\n${message.message}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormState('drafted');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label={`${profile.name}, home`} onClick={closeMenu}><span className="wordmark-mark">{profile.name[0]}<span>.</span></span><span className="wordmark-name">{profile.name}</span></a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <button className="nav-resume" onClick={() => { downloadResume(); closeMenu(); }}><Download size={14} /> Résumé</button>
        </nav>
        <a className="header-availability" href="#contact"><span className="status-dot" /> Open to work</a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> SOFTWARE ENGINEER & CREATIVE BUILDER</div>
            <h1 className="hero-headline">Good ideas<br />Deserve <span className="headline-mark">Great</span><br /><span className="software-word"><span className="software-base">"Software"</span><span className="software-fallback">"Application"</span></span><span className="headline-period"></span></h1>
            <p className="hero-intro">{profile.intro} I’m {profile.name.split(' ')[0]}, a full-stack developer focused on the details that make products feel effortless.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={17} /></a>
              <button className="text-link" onClick={downloadResume}><Download size={16} /> Download résumé</button>
            </div>
            <div className="hero-meta"><span><span className="status-dot" /> {profile.availability}</span><span>{profile.location}</span></div>
          </div>
          <div className="hero-visual">
            <div className="portrait-frame"><img src={profile.portrait} alt={`${profile.name}, software developer`} /><span className="portrait-index">01 / THE PERSON BEHIND THE PIXELS</span></div>
            <div className="floating-note"><Code2 size={17} /><span>Thoughtful by design.<br /><strong>Reliable by default.</strong></span></div>
            <div className="hero-stamp" aria-label="Available for collaboration"><span>BUILDING WITH INTENTION</span><ArrowDownRight size={20} /></div>
          </div>
          <a className="scroll-cue" href="#work"><span></span><ArrowDown size={15} /></a>
        </section>

        <section className="work-section section-wrap reveal" id="work">
          <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> SELECTED PROJECTS</div><h2>Made to matter<span className="headline-period">.</span></h2></div><p>A few things I’ve helped bring to life, from the first sketch to the final deploy.</p></div>
          <div className="work-toolbar"><span className="project-count">0{visibleProjects.length} PROJECTS</span><div className="filter-list" aria-label="Filter projects">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'filter-button active' : 'filter-button'} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div></div>
          <div className="project-grid">{visibleProjects.map((project, index) => <article className="project-card" key={project.name}>
            <a className="project-image" href="#contact" aria-label={`Discuss a project like ${project.name}`}><img src={project.image} alt={project.alt} loading="lazy" /><span className="project-number">0{index + 1}</span><span className="project-open"><ArrowUpRight size={20} /></span></a>
            <div className="project-info"><div><span className="project-kind">{project.kind}</span><h3>{project.name}</h3></div><a className="project-discuss" href="#contact" aria-label={`Discuss ${project.name}`}><ArrowUpRight size={18} /></a></div>
            <p className="project-description">{project.description}</p>
            <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>)}</div>
          <div className="work-endnote"><span>HAVE A GOOD ONE IN MIND?</span><a href="#contact">Let’s build it together <ArrowRight size={16} /></a></div>
        </section>

        <section className="about-section reveal" id="about"><div className="section-wrap about-inner">
          <div className="about-title"><div className="eyebrow"><span className="eyebrow-line" /> A LITTLE ABOUT ME</div><h2>Curiosity<br />is part of<br />the process<span className="headline-period">.</span></h2><button className="text-link about-resume" onClick={downloadResume}><Download size={16} /> Get my résumé</button></div>
          <div className="about-content"><p className="about-lead">{profile.bio}</p><div className="journey-panel"><div className="journey-header"><span className="detail-label">DEVELOPMENT JOURNEY</span><span className="journey-tag">Roadmap</span></div><div className="journey-grid"><div className="journey-card"><span className="journey-step">01</span><h3>Discovery</h3><p>Clarify the problem, map the user flow, and shape a clear product direction.</p></div><div className="journey-card"><span className="journey-step">02</span><h3>Prototype</h3><p>Translate ideas into interactive interfaces and validate core assumptions quickly.</p></div><div className="journey-card"><span className="journey-step">03</span><h3>Build</h3><p>Craft scalable systems, connect APIs, and turn clean design into reliable software.</p></div><div className="journey-card"><span className="journey-step">04</span><h3>Launch</h3><p>Ship, measure, improve, and keep iterating with a product-first mindset.</p></div></div></div><div className="journey-panel journey-panel--muted"><div className="journey-header"><span className="detail-label">EXPERIENCE JOURNEY</span><span className="journey-tag">Timeline</span></div><div className="experience-roadmap">{profile.experience.map((item, index) => <div className="experience-roadmap-item" key={item.period}><span className="experience-roadmap-period">{item.period}</span><div className="experience-roadmap-content"><h3>{item.role}</h3><span>{item.company}</span><p>{item.detail}</p></div>{index < profile.experience.length - 1 && <span className="experience-roadmap-line" />}</div>)}</div></div><div className="about-details"><div className="skills-block"><span className="detail-label">MY TOOLKIT</span>{profile.skills.map((group) => <div className="skill-row" key={group.title}><span>{group.title}</span><div>{group.items.map((item) => <span className="skill-chip" key={item}>{item}</span>)}</div></div>)}</div></div></div>
        </div></section>

        <section className="contact-section section-wrap reveal" id="contact"><div className="contact-copy"><div className="eyebrow"><span className="eyebrow-line" /> YOUR TURN</div><h2>Have a good<br />problem to solve<span className="headline-period">?</span></h2><p>I’m always up for talking through a thoughtful idea, an interesting challenge, or how we might work together.</p><button className="email-button" onClick={copyEmail}><span className="email-icon">{copied ? <Check size={18} /> : <Mail size={18} />}</span>{copied ? 'Email copied' : profile.email}<ArrowUpRight size={16} /></button><div className="social-links"><a href={profile.socials.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={13} /></a><a href={profile.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={13} /></a></div></div>
          <form className="contact-form" onSubmit={submitContact}><div className="form-heading"><span>START A CONVERSATION</span><span className="form-required">* REQUIRED</span></div><label htmlFor="name">Your name <span>*</span></label><input id="name" name="name" placeholder="What should I call you?" autoComplete="name" required minLength="2" maxLength="80" /><label htmlFor="email">Email address <span>*</span></label><input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required maxLength="120" /><label htmlFor="message">A little about your project <span>*</span></label><textarea id="message" name="message" placeholder="What are you looking to make?" rows="4" required minLength="10" maxLength="3000" /><button className="button button-primary form-submit" type="submit">Open email draft <ArrowUpRight size={17} /></button>{formState === 'drafted' && <p className="form-feedback success" role="status">Your email app should open with a draft. Send it when you’re ready.</p>}</form>
        </section>
      </main>

      <footer className="site-footer"><a className="wordmark" href="#home"><span className="wordmark-mark">{profile.name[0]}<span>.</span></span><span className="wordmark-name">{profile.name}</span></a><span>DESIGNED WITH INTENTION · BUILT WITH THE MERN STACK</span><a href="#home">BACK TO TOP <ArrowUpRight size={14} /></a><span className="footer-year">© {new Date().getFullYear()}</span></footer>
    </>
  );
}

export default App;