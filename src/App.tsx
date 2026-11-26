import { FormEvent, ReactNode, useEffect, useState } from 'react'

type Route = '/' | '/about' | '/services' | '/case-studies' | '/endorsements' | '/insights' | '/careers' | '/contact'

const nav: { label: string; path: Route }[] = [
  { label: 'Overview', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Capabilities', path: '/services' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Client Endorsements', path: '/endorsements' },
  { label: 'Insights', path: '/insights' },
  { label: 'Careers', path: '/careers' },
]

const serviceGroups = [
  {
    id: 'software',
    index: '01',
    name: 'Software Development',
    intro: 'Purpose-built systems that translate complex operations into dependable digital workflows.',
    services: [
      ['Custom Software Solutions', 'Bespoke enterprise software engineered to streamline operations, improve business logic, and support organizational workflows.'],
      ['Web Application Development', 'High-performance, scalable web applications built with modern frameworks and technologies.'],
      ['Android Application Development', 'Enterprise mobile applications for field operations, offline-first workflows, and POS hardware.'],
      ['Enterprise Systems', 'Mission-critical platforms supporting real-time operations, high-volume transactions, and multi-branch management.'],
      ['ERP & Business Management Systems', 'Integrated solutions for procurement, inventory, accounting, management, and enterprise workflows.'],
      ['API Development & Integration', 'Secure APIs, gateways, and enterprise integrations connecting different systems and services.'],
    ],
  },
  {
    id: 'digital',
    index: '02',
    name: 'Digital Solutions',
    intro: 'Customer-facing platforms and connected experiences designed to move business forward.',
    services: [
      ['Website Development', 'Authoritative corporate websites with responsive design, professional aesthetics, and search-ready architecture.'],
      ['E-Commerce Platforms', 'B2B and B2C storefronts with local payments, inventory synchronization, and multi-currency capabilities.'],
      ['Booking & Ordering Systems', 'Real-time reservation, scheduling, and order processing for hospitality, healthcare, and other industries.'],
      ['Digital Business Transformation', 'Strategic digitization of operational workflows, cloud integration, automation, and change execution.'],
    ],
  },
  {
    id: 'infrastructure',
    index: '03',
    name: 'Technology Infrastructure',
    intro: 'Resilient foundations that protect continuity and keep every layer of the organization connected.',
    services: [
      ['Hardware-Enabled Services', 'Server procurement, workstation and POS deployment, network hardware, and lifecycle management.'],
      ['IT Infrastructure', 'Structured networks, enterprise Wi-Fi, virtualization, cloud architecture, and network infrastructure.'],
      ['Technical Support & Maintenance', 'Preventive monitoring, incident response, maintenance, and dedicated systems administration.'],
      ['Cybersecurity Solutions', 'Firewalls, vulnerability assessments, endpoint protection, detection, and compliance hardening.'],
    ],
  },
  {
    id: 'creative',
    index: '04',
    name: 'Marketing & Creative',
    intro: 'Brand systems and digital campaigns that turn business value into clear market presence.',
    services: [
      ['Digital Marketing', 'Search optimization, social media management, paid campaigns, and data-driven content governance.'],
      ['Advertising Campaigns', 'Branded content, promotional video assets, social advertising, and campaign management.'],
      ['Graphic Design', 'Corporate collateral, visual reports, environmental signage, and high-impact communication systems.'],
      ['Branding & Creative Production', 'Comprehensive identities, audiovisual assets, and multimedia marketing materials.'],
    ],
  },
  {
    id: 'ai',
    index: '05',
    name: 'AI & Innovation',
    intro: 'Responsible, practical intelligence applied to real operational opportunities.',
    dark: true,
    services: [
      ['AI-Powered Solutions', 'Custom generative AI systems, intelligent assistants, automated workflows, and business-specific tools.'],
      ['Intelligent Automation', 'Process automation, robotic process automation, and interconnected AI-powered business systems.'],
      ['Research & Development', 'Technical experimentation, software innovation, and proof-of-concept development.'],
      ['Emerging Technology Solutions', 'Strategic exploration and integration of next-generation technologies for industrial applications.'],
    ],
  },
]

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
    spark: <><path d="m12 3-1.4 4.1a5.5 5.5 0 0 1-3.5 3.5L3 12l4.1 1.4a5.5 5.5 0 0 1 3.5 3.5L12 21l1.4-4.1a5.5 5.5 0 0 1 3.5-3.5L21 12l-4.1-1.4a5.5 5.5 0 0 1-3.5-3.5L12 3Z" /></>,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
    play: <path d="m8 5 11 7-11 7V5Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    code: <><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" /></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name] ?? paths.spark}</svg>
}

function LinkButton({ to, children, secondary = false }: { to: Route; children: ReactNode; secondary?: boolean }) {
  return <a href={to} data-link className={secondary ? 'button button-secondary' : 'button'}>{children}<Icon name="arrow" size={17} /></a>
}

function Header({ route }: { route: Route }) {
  const [open, setOpen] = useState(false)
  return <>
    <div className="info-bar"><div className="container info-inner"><span>Extreme Wisdom in Enterprise Technology</span><span className="info-right">Engineering with purpose · Addis Ababa, Ethiopia</span></div></div>
    <header className="header">
      <div className="container nav-wrap">
        <a href="/" data-link className="brand" aria-label="ExSofós home"><img src="/assets/exsofos-logo.png" alt="ExSofós System GEN" /></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(item => <a key={item.path} href={item.path} data-link className={route === item.path ? 'active' : ''}>{item.label}</a>)}
        </nav>
        <a href="/contact" data-link className="nav-cta">Schedule consultation <Icon name="arrow" size={16} /></a>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation"><Icon name={open ? 'close' : 'menu'} size={24} /></button>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">
        {nav.map(item => <a key={item.path} href={item.path} data-link onClick={() => setOpen(false)}>{item.label}</a>)}
        <a href="/contact" data-link onClick={() => setOpen(false)}>Schedule consultation</a>
      </nav>}
    </header>
  </>
}

function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <img src="/assets/exsofos-logo.png" alt="ExSofós System GEN" />
        <p>Engineering useful, dependable technology for organizations building their place in a connected world.</p>
        <div className="socials" aria-label="Social channels">{['in', 'yt', 'x', 'ig', 'fb', 'tg', 'wa', 'tk'].map(x => <span key={x} title="Official account link pending verification">{x}</span>)}</div>
      </div>
      <div><h3>Core practices</h3><a href="/services" data-link>Software & ERP Engineering</a><a href="/services" data-link>Digital & E-Commerce</a><a href="/services" data-link>Infrastructure & Security</a><a href="/services" data-link>AI & R&D</a></div>
      <div><h3>Company</h3><a href="/about" data-link>About ExSofós</a><a href="/case-studies" data-link>Case Studies</a><a href="/endorsements" data-link>Client Perspectives</a><a href="/insights" data-link>Insights</a><a href="/careers" data-link>Careers</a></div>
      <div><h3>Enterprise desk</h3><a href="mailto:enterprise@exsofos.com">enterprise@exsofos.com</a><a href="mailto:support@exsofos.com">support@exsofos.com</a><p>Addis Ababa & Regional Hubs, Ethiopia</p></div>
    </div>
    <div className="container footer-bottom"><span>© 2026 ExSofós System GEN. All Rights Reserved.</span><span>Security Policy · Service Governance · Privacy & Data Protection</span></div>
  </footer>
}

function SectionHead({ label, title, text, center = false }: { label: string; title: string; text?: string; center?: boolean }) {
  return <div className={`section-head ${center ? 'center' : ''}`}><span className="eyebrow">{label}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
}

function PageHero({ label, title, text }: { label: string; title: string; text: string }) {
  return <section className="page-hero"><div className="container"><span className="eyebrow light">{label}</span><h1>{title}</h1><p>{text}</p></div><div className="hero-orbit" /></section>
}

function Home() {
  return <>
    <main>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Digital services for business</span>
            <h1>Technology that works <em>for your business.</em></h1>
            <p>ExSofós System GEN is an integrated technology partner delivering software engineering, digital transformation, resilient IT infrastructure, and intelligent systems that help organizations move forward.</p>
            <div className="button-row"><LinkButton to="/contact">Talk to our team</LinkButton><LinkButton to="/services" secondary>Explore our services</LinkButton></div>
            <div className="proof-row">
              <div><Icon name="shield" /><span><strong>Security-first</strong>Engineering by default</span></div>
              <div><Icon name="layers" /><span><strong>Integrated</strong>End-to-end delivery</span></div>
              <div><Icon name="people" /><span><strong>Human-centered</strong>Built for real users</span></div>
            </div>
          </div>
          <div className="hero-image">
            <img src="/assets/enterprise-collaboration.png" alt="Technology professionals collaborating around a digital solution" />
            <div className="image-note"><span>01 / Partnership</span><strong>Listen deeply.<br />Engineer deliberately.</strong></div>
          </div>
        </div>
      </section>

      <section className="section philosophy"><div className="container split">
        <div><SectionHead label="Who we are" title="Rooted in Extreme Wisdom. Built for Execution." /></div>
        <div className="large-copy"><p>ExSofós brings together the pursuit of wisdom and the discipline of systems engineering. We simplify complexity, challenge assumptions, and turn the right ideas into technology that holds up in the real world.</p><a href="/about" data-link className="text-link">Read our corporate philosophy <Icon name="arrow" size={17} /></a></div>
      </div></section>

      <section className="section intro-cards"><div className="container card-grid four">
        {[
          ['Our Services', 'Explore digital, software, security, and IT solutions.', '/services', '01'],
          ['About ExSofós', 'Learn about our company and how we work.', '/about', '02'],
          ['Portfolio', 'View selected projects and implemented solutions.', '/case-studies', '03'],
          ['Client Stories', 'Hear directly from people who have worked with us.', '/endorsements', '04'],
        ].map(([title, text, href, n]) => <a href={href} data-link className="nav-card" key={title}><span>{n}</span><Icon name="arrow" /><h3>{title}</h3><p>{text}</p></a>)}
      </div></section>

      <section className="section sage"><div className="container split align-center">
        <div className="process-visual"><div className="process-core">ExS</div>{['Strategy', 'Engineering', 'Security', 'Support'].map((x, i) => <span key={x} className={`node node-${i}`}>{x}</span>)}</div>
        <div><SectionHead label="What we do" title="A digital services partner for your business." /><p className="body-large">From the first architecture decision to long-term support, our practices work as one. That means less fragmentation, better accountability, and technology shaped around the way your organization actually operates.</p><LinkButton to="/services">Explore all capabilities</LinkButton></div>
      </div></section>

      <section className="section media-section"><div className="container">
        <div className="media-top"><SectionHead label="Proof, not promotion" title="Verified Client Interviews & Executive Perspectives" text="We believe trust should be documented. This space is reserved for approved client interviews, deployment walkthroughs, and real project experiences." /><div className="zero-badge"><Icon name="check" /><span><strong>Zero Synthetic</strong> Endorsements</span></div></div>
        <div className="media-placeholder media-video">
          <div className="video-embed">
            <iframe src="https://www.youtube.com/embed/Jw7s42Op2ao?si=CbJQSoEesfH-BuXt" title="Verified ExSofós client interview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" />
          </div>
          <div className="media-video-copy"><span>Verified client interview</span><h3>A client perspective, in their own words.</h3><p>Watch the complete conversation and hear directly about the experience of working with ExSofós.</p><LinkButton to="/endorsements" secondary>View client perspectives</LinkButton></div>
        </div>
      </div></section>

      <section className="section trust"><div className="container">
        <SectionHead label="Executive endorsements" title="Trusted by Operational Leaders" text="We never manufacture social proof. Genuine statements will be published here with client approval and clear attribution." />
        <div className="empty-testimonials"><div><Icon name="shield" size={30} /><h3>Authenticity comes first.</h3><p>Verified quotations, names, roles, and organizations are intentionally withheld until approved testimonial material is available.</p></div></div>
      </div></section>
      <CTA />
    </main>
  </>
}

function About() {
  const values = [
    ['spark', 'Innovation', 'Pushing the frontier of digital engineering beyond conventional frameworks.'],
    ['shield', 'Security', 'Implementing strict, industry-leading safety controls by default.'],
    ['layers', 'Scalability', 'Designing modern architectures that scale cleanly with organizational demand.'],
    ['people', 'Human-Centered', 'Focusing systems design on practical user convenience and experience.'],
  ]
  return <main><PageHero label="What is ExSofós?" title="The meaning behind ExSofós System GEN" text="Three ideas form one operating philosophy: wisdom, systems discipline, and a commitment to what comes next." />
    <section className="section"><div className="container about-grid">
      <div className="meaning-copy"><span className="dropcap">Ex</span><p>The name <strong>ExSofós</strong> is derived from the Greek word “σοφός”, meaning wisdom, combined with the prefix “Ex” to represent Excess and Extremity. Together, it represents <strong>Extreme Wisdom</strong>—wisdom beyond traditional limitations.</p><p><strong>System</strong> represents the structured engineering principles we adhere to. Everything we output is governed by rigorous technical logic.</p><p><strong>GEN</strong> defines the next generation of intelligent systems. We build tools not just for current business realities, but for the future landscape of hyper-automation and AI orchestration.</p></div>
      <div className="vision-stack">
        <article><span>01 / Our vision</span><h3>A future where useful technology is within reach.</h3><p>To be a trusted technology partner for businesses building their place in a connected world.</p></article>
        <article className="dark"><span>02 / Our mission</span><h3>Make technology useful, dependable, and clear.</h3><p>We help organizations plan, build, protect, and maintain the digital tools they need to serve customers and run their business.</p></article>
      </div>
    </div></section>
    <section className="section sage"><div className="container"><SectionHead label="How we operate" title="Our Core Operating Values" center /><div className="card-grid four values">{values.map(([icon, name, desc], i) => <article key={name}><span className="value-index">0{i + 1}</span><Icon name={icon} size={27} /><h3>{name}</h3><p>{desc}</p></article>)}</div></div></section>
    <CTA />
  </main>
}

function Services() {
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? serviceGroups : serviceGroups.filter(g => g.id === filter)
  return <main><PageHero label="Capabilities & Solutions" title="Comprehensive Enterprise Technology Services" text="One accountable partner across software, digital experience, infrastructure, creative systems, and applied intelligence." />
    <div className="category-nav"><div className="container category-scroll">
      <button className={filter === 'all' ? 'selected' : ''} onClick={() => setFilter('all')}>All Practices</button>
      {serviceGroups.map(g => <button className={filter === g.id ? 'selected' : ''} onClick={() => setFilter(g.id)} key={g.id}>{g.name}</button>)}
    </div></div>
    {visible.map(group => <section key={group.id} className={`section service-group ${group.dark ? 'dark-group' : ''}`} id={group.id}><div className="container">
      <div className="service-heading"><div><span>Category {group.index}</span><h2>{group.name}</h2></div><div><p>{group.intro}</p><a href="/contact" data-link className="text-link">Discuss this practice <Icon name="arrow" size={16} /></a></div></div>
      <div className="card-grid services">{group.services.map(([name, text], i) => <article className="service-card" key={name}><span>{group.index}.{String(i + 1).padStart(2, '0')}</span><div className="service-icon"><Icon name={group.id === 'infrastructure' ? 'shield' : group.id === 'software' ? 'code' : group.id === 'ai' ? 'spark' : 'layers'} /></div><h3>{name}</h3><p>{text}</p><a href="/contact" data-link aria-label={`Ask about ${name}`}><Icon name="arrow" /></a></article>)}</div>
    </div></section>)}
    <CTA />
  </main>
}

function CaseStudies() {
  const cases = [
    ['01', 'Hospitality / Web Platform', 'Yeabsira Hotel Website Development', 'Yeabsira Hotel', 'A public-facing digital presence designed to make the hotel easier to discover and understand.', 'Website design and development', 'Approved project imagery, implementation detail, and outcomes will be added after client verification.'],
    ['02', 'International Trade / Web Platform', 'Damene Balcha General Trading Website', 'Damene Balcha General Trading', 'A structured company presence for communicating services and supporting business credibility.', 'Website design and development', 'Approved screenshots and documented project outcomes are pending company publication.'],
  ]
  return <main><PageHero label="Projects & Portfolio" title="Real work. Documented with care." text="A transparent view of selected engagements—without invented metrics, hidden assumptions, or overstated outcomes." />
    <section className="section"><div className="container"><div className="portfolio-note"><Icon name="shield" /><p><strong>Evidence standard:</strong> Only projects identified by the company are listed. Unverified technical details and performance claims are intentionally omitted.</p></div>
      <div className="case-list">{cases.map(([n, category, title, client, challenge, solution, outcome], i) => <article className="case-study" key={title}>
        <div className={`case-visual case-${i}`}><img src={i === 0 ? '/assets/case-study-yeabsira.png' : '/assets/case-study-damene.png'} alt={`${title} approved project screenshot`} loading="lazy" /><span>Approved project screenshot</span></div>
        <div className="case-content"><span className="case-label">Case {n} — {category}</span><h2>{title}</h2><p className="client">{client}</p>
          <dl><div><dt>Context</dt><dd>{challenge}</dd></div><div><dt>Verified scope</dt><dd>{solution}</dd></div><div><dt>Publication status</dt><dd>{outcome}</dd></div></dl>
          <LinkButton to="/contact" secondary>Discuss a similar project</LinkButton>
        </div>
      </article>)}</div>
    </div></section><CTA />
  </main>
}

function Endorsements() {
  return <main><PageHero label="What our customers say about ExSofós" title="Verified perspectives from decision-makers" text="A home for real conversations about partnership, implementation, and the operational value of technology." />
    <section className="section"><div className="container">
      <div className="video-stage"><div className="video-empty video-player"><iframe src="https://www.youtube.com/embed/Jw7s42Op2ao?si=CbJQSoEesfH-BuXt" title="Featured verified ExSofós client interview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><aside><span>Verified client interview</span><h3>A genuine client perspective.</h3><p>Watch the full interview to hear directly from an ExSofós client about their experience and project journey.</p><div className="verified-line"><Icon name="check" /> Verified source material</div></aside></div>
      <SectionHead label="Client perspectives" title="The interview archive" text="Approved interviews and deployment walkthroughs will be organized here for easy review." />
      <div className="perspective-grid">{[1, 2, 3].map(i => <article key={i}><div><Icon name="play" /></div><span>Interview {String(i).padStart(2, '0')}</span><h3>Awaiting verified client material</h3><p>Reserved for an approved interview, attribution, and full recording.</p></article>)}</div>
    </div></section>
    <section className="section founder"><div className="container founder-grid"><div><span className="eyebrow light">Founder’s message</span><h2>Technology should create lasting opportunities.</h2></div><blockquote>
      <p>ExSofós was founded on a simple belief: technology should solve real problems and create lasting opportunities.</p><p>Across Africa, organizations, schools, and institutions have incredible potential, yet many are held back by outdated systems and inefficient processes.</p><p>We are committed to designing intelligent software, modern digital infrastructure, and innovative solutions that help organizations work smarter, grow faster, and prepare confidently for the future.</p><p>We see ourselves not merely as service providers, but as long-term technology partners invested in the success of the organizations we serve.</p><p>Together, we are not simply adopting technology—we are engineering a smarter future.</p>
      <footer><strong>Abenezer Samuel</strong><span>Founder & Chief Executive Officer</span></footer>
    </blockquote></div></section>
    <CTA />
  </main>
}

const insightArticles = [
  { category: 'Enterprise Architecture', title: 'Designing digital foundations that can evolve with the business', summary: 'A practical framework for making architecture decisions that preserve flexibility without adding unnecessary complexity.', read: '6 min read', featured: true },
  { category: 'Cybersecurity', title: 'Security by default: moving protection earlier in the delivery cycle', summary: 'Why resilient organizations make security part of planning, design, and implementation—not a final checklist.', read: '5 min read' },
  { category: 'Digital Operations', title: 'From disconnected workflows to one operational picture', summary: 'How thoughtful integration can reduce friction between teams, tools, and critical business information.', read: '7 min read' },
  { category: 'Applied AI', title: 'Where intelligent automation creates practical value', summary: 'A grounded approach to identifying AI opportunities that support people and produce measurable operational value.', read: '8 min read' },
  { category: 'Engineering', title: 'Building dependable software for unpredictable environments', summary: 'Principles for creating responsive, maintainable systems where connectivity and operational conditions can change.', read: '6 min read' },
  { category: 'Leadership', title: 'The questions to ask before beginning a digital transformation', summary: 'A concise decision guide for leaders aligning technology investment with real organizational priorities.', read: '4 min read' },
]

function Insights() {
  const [category, setCategory] = useState('All')
  const categories = ['All', ...Array.from(new Set(insightArticles.map(a => a.category)))]
  const articles = category === 'All' ? insightArticles : insightArticles.filter(a => a.category === category)
  const featured = insightArticles[0]
  return <main>
    <PageHero label="Ideas & Intelligence" title="Insight for decisions that shape what comes next." text="Practical perspectives from our technology practices—written to help leaders turn complexity into clear, durable action." />
    <section className="section insight-feature"><div className="container">
      <article className="featured-insight">
        <div className="insight-art"><div className="insight-rings"><span /><span /><span /></div><span>ExS / Field Notes 01</span></div>
        <div className="featured-copy"><span className="case-label">{featured.category} · Featured</span><h2>{featured.title}</h2><p>{featured.summary}</p><div className="article-meta"><span>{featured.read}</span><span>ExSofós Strategy Desk</span></div><a href="mailto:enterprise@exsofos.com?subject=Insight%20request" className="text-link">Request the full brief <Icon name="arrow" size={16} /></a></div>
      </article>
    </div></section>
    <section className="section insight-library"><div className="container">
      <div className="library-head"><SectionHead label="Knowledge library" title="Explore our thinking" text="Clear guidance across the disciplines that keep modern organizations moving." /><div className="insight-filter" aria-label="Filter insights">{categories.map(x => <button key={x} className={category === x ? 'selected' : ''} onClick={() => setCategory(x)}>{x}</button>)}</div></div>
      <div className="insight-grid">{articles.map((article, i) => <article key={article.title} className="insight-card"><div className="insight-card-top"><span>0{i + 1}</span><Icon name={article.category === 'Cybersecurity' ? 'shield' : article.category === 'Applied AI' ? 'spark' : 'layers'} /></div><span className="case-label">{article.category}</span><h3>{article.title}</h3><p>{article.summary}</p><div className="article-meta"><span>{article.read}</span><span>Perspective</span></div></article>)}</div>
    </div></section>
    <section className="insight-subscribe"><div className="container"><div><span className="eyebrow light">Executive briefing</span><h2>Useful thinking, without the noise.</h2><p>Ask our enterprise desk for the latest practice notes and technical briefings relevant to your organization.</p></div><a className="button" href="mailto:enterprise@exsofos.com?subject=Subscribe%20to%20ExSofos%20Insights">Request briefings <Icon name="arrow" size={17} /></a></div></section>
  </main>
}

const talentTracks = [
  ['Engineering', 'Software engineering, mobile systems, platform architecture, quality, and DevOps.'],
  ['Infrastructure & Security', 'Networks, cloud systems, systems administration, cybersecurity, and technical support.'],
  ['Product & Experience', 'Product thinking, user experience, research, content, and interface design.'],
  ['Business & Delivery', 'Project delivery, client success, operations, partnerships, and growth.'],
]

function Careers() {
  const [query, setQuery] = useState('')
  const [track, setTrack] = useState('All')
  const filtered = talentTracks.filter(([name, description]) => (track === 'All' || name === track) && `${name} ${description}`.toLowerCase().includes(query.toLowerCase()))
  return <main>
    <section className="career-hero"><div className="career-overlay" /><img src="/assets/enterprise-collaboration.png" alt="Technology professionals collaborating at ExSofós" /><div className="container career-hero-content"><span className="eyebrow light">Careers at ExSofós</span><h1>Build technology that earns its place.</h1><p>Join people who bring curiosity, discipline, and care to the systems organizations depend on.</p><div className="career-search"><Icon name="spark" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by discipline or capability..." aria-label="Search career disciplines" /><a href="#opportunities" aria-label="View matching opportunities"><Icon name="arrow" /></a></div></div></section>
    <section className="section career-section" id="opportunities"><div className="container">
      <div className="career-intro"><SectionHead label="Find your place" title="Do your best work with people who care." text="We value sound judgment, thoughtful execution, and the willingness to keep learning. Explore our talent disciplines and register your interest for future verified openings." /><div className="career-principles">{['Solve real problems', 'Work with discipline', 'Learn continuously'].map((x, i) => <div key={x}><span>0{i + 1}</span>{x}</div>)}</div></div>
      <div className="career-board">
        <aside className="career-filters"><h3>Filter disciplines</h3><span>Practice</span>{['All', ...talentTracks.map(x => x[0])].map(x => <label key={x}><input type="radio" name="track" checked={track === x} onChange={() => setTrack(x)} /> <span>{x}</span></label>)}<div className="availability-note"><Icon name="shield" /><p><strong>Verified roles only.</strong> We publish a position only after it is approved for recruitment.</p></div></aside>
        <div className="career-results"><div className="results-head"><div><span>Talent disciplines</span><h2>{filtered.length} areas to explore</h2></div><span>Current vacancies: <strong>None published</strong></span></div>
          {filtered.length ? filtered.map(([name, description], i) => <article className="career-card" key={name}><div className="career-card-icon"><span>0{i + 1}</span></div><div><span>Talent community</span><h3>{name}</h3><p>{description}</p><div className="career-card-meta"><span>Addis Ababa & flexible delivery</span><span>Future opportunities</span></div></div><a href={`mailto:enterprise@exsofos.com?subject=${encodeURIComponent(`${name} talent network interest`)}`} className="button button-secondary">Register interest <Icon name="arrow" size={15} /></a></article>) : <div className="career-empty"><h3>No disciplines match that search.</h3><p>Try a broader capability or clear the current filter.</p><button onClick={() => { setQuery(''); setTrack('All') }}>Clear filters</button></div>}
        </div>
      </div>
    </div></section>
    <section className="career-culture"><div className="container"><div><span className="eyebrow light">How we work</span><h2>Extreme wisdom is a team practice.</h2></div><p>We do not separate ambition from responsibility. Our teams ask better questions, make decisions with evidence, communicate clearly, and build for the people who will rely on the result.</p><a href="/about" data-link className="button">Meet ExSofós <Icon name="arrow" size={16} /></a></div></section>
  </main>
}

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [notice, setNotice] = useState('')
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const service = String(data.get('service') || '')
    const details = String(data.get('details') || '').trim()
    const next: Record<string, string> = {}
    if (!name) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address.'
    if (!service) next.service = 'Please choose a service.'
    setErrors(next)
    if (Object.keys(next).length) { setNotice('Please review the highlighted fields.'); return }
    const message = `Hello ExSofós System GEN,\n\nMy name is ${name} (${email}).\nI am interested in: ${service}.\n${details ? `\nAdditional context:\n${details}\n` : ''}\nI would like to discuss the next steps.`
    setNotice('Your WhatsApp draft is ready. Review it there before sending.')
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }
  const services = ['Software Development', 'ERP & Business Systems', 'Website Development', 'Android Applications', 'E-Commerce Solutions', 'Booking & Ordering Systems', 'IT Infrastructure', 'Cybersecurity', 'Digital Marketing', 'Branding & Graphic Design', 'AI & Automation', 'Hardware Services', 'Technical Support', 'Other']
  return <main className="contact-page"><div className="contact-orb" /><section className="container contact-grid">
    <div className="contact-copy"><span className="eyebrow light">Begin the conversation</span><h1>Your next advantage starts with a <em>better question.</em></h1><p>Tell us where your business needs to go. We’ll help you define the clearest, most secure route forward.</p><div className="contact-details"><a href="mailto:enterprise@exsofos.com"><Icon name="mail" /> enterprise@exsofos.com</a><span><Icon name="pin" /> Addis Ababa & Regional Hubs, Ethiopia</span></div></div>
    <form className="contact-form" onSubmit={submit} noValidate><span>Enterprise inquiry</span><h2>Tell us a little about it</h2><p>Choose what you need. We’ll prepare a WhatsApp draft for you to review before sending.</p>
      <label>Your Name<input name="name" placeholder="Your full name" aria-invalid={!!errors.name} />{errors.name && <small>{errors.name}</small>}</label>
      <label>Email Address<input name="email" type="email" placeholder="you@company.com" aria-invalid={!!errors.email} />{errors.email && <small>{errors.email}</small>}</label>
      <label>What are you looking for?<select name="service" defaultValue="" aria-invalid={!!errors.service}><option value="" disabled>Select a service</option>{services.map(x => <option key={x}>{x}</option>)}</select>{errors.service && <small>{errors.service}</small>}</label>
      <label>Anything else? <i>Optional</i><textarea name="details" rows={4} placeholder="A little context helps us prepare..." /></label>
      <button className="button" type="submit">Continue in WhatsApp <Icon name="arrow" size={17} /></button>
      {notice && <div className="form-notice" role="status">{notice}</div>}
      <p className="form-footnote">You’ll review and send the message yourself. Opening WhatsApp does not mean it has been delivered.</p>
    </form>
  </section></main>
}

function CTA() {
  return <section className="cta-section"><div className="container cta-inner"><div><span className="eyebrow light">Your next move</span><h2>Ready to digitize your operations?</h2><p>Reach our engineering and architecture desk to scope your software, infrastructure, security, or AI integration requirements.</p></div><div className="button-row"><LinkButton to="/contact">Start a conversation</LinkButton><LinkButton to="/case-studies" secondary>Inspect case studies</LinkButton></div></div></section>
}

function App() {
  const getRoute = () => (nav.some(n => n.path === window.location.pathname) || window.location.pathname === '/contact' ? window.location.pathname : '/') as Route
  const [route, setRoute] = useState<Route>(getRoute)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-link]')
      if (!link || link.target === '_blank' || e.metaKey || e.ctrlKey) return
      e.preventDefault()
      history.pushState({}, '', link.getAttribute('href')!)
      setRoute(getRoute())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const pop = () => setRoute(getRoute())
    document.addEventListener('click', onClick)
    window.addEventListener('popstate', pop)
    return () => { document.removeEventListener('click', onClick); window.removeEventListener('popstate', pop) }
  }, [])
  useEffect(() => {
    const titles: Record<Route, string> = { '/': 'ExSofós System GEN | Enterprise Technology', '/about': 'About ExSofós System GEN', '/services': 'Enterprise Technology Services | ExSofós', '/case-studies': 'Case Studies | ExSofós System GEN', '/endorsements': 'Client Endorsements | ExSofós', '/insights': 'Technology Insights | ExSofós System GEN', '/careers': 'Careers | ExSofós System GEN', '/contact': 'Schedule a Consultation | ExSofós' }
    document.title = titles[route]
  }, [route])
  const pages: Record<Route, ReactNode> = { '/': <Home />, '/about': <About />, '/services': <Services />, '/case-studies': <CaseStudies />, '/endorsements': <Endorsements />, '/insights': <Insights />, '/careers': <Careers />, '/contact': <Contact /> }
  return <><Header route={route} />{pages[route]}<Footer /></>
}

export default App
