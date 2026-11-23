import React, { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Compass, Menu, Phone, Plus, X } from 'lucide-react';
import { articles, firm, practices } from './data.js';

function Mark({ large = false }) {
  return (
    <svg className={large ? 'mark mark--large' : 'mark'} viewBox="0 0 84 94" fill="none" aria-hidden="true">
      <path d="M8 9H76" stroke="currentColor" strokeWidth="1.2" />
      <path d="M14 17V78M69 17V78" stroke="currentColor" strokeWidth="1" opacity=".36" />
      <path d="M26 18V76M58 18L28 48L60 77" stroke="currentColor" strokeWidth="9" strokeLinejoin="miter" />
      <path d="M10 85H74" stroke="currentColor" strokeWidth="1.2" />
      <path d="M15 88H69" stroke="currentColor" strokeWidth=".8" />
    </svg>
  );
}

function Wordmark({ light = false }) {
  return (
    <Link to="/" className={'wordmark' + (light ? ' wordmark--light' : '')} aria-label="Keystone Law Firm, P.A. — home">
      <Mark />
      <span className="wordmark__text">
        <span className="wordmark__name">KEYSTONE</span>
        <span className="wordmark__sub">LAW FIRM, P.A.</span>
      </span>
    </Link>
  );
}

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    let description = 'Keystone Law Firm, P.A. is a Miami-based law firm serving individuals, families and businesses throughout South Florida with litigation and transactional counsel.';
    let title = 'Keystone Law Firm, P.A. | Miami & South Florida';
    const path = location.pathname;
    if (path.startsWith('/practice-areas/')) {
      const match = practices.find((p) => path.endsWith(p.slug));
      if (match) { title = match.title + ' | Keystone Law Firm, P.A.'; description = match.intro; }
    } else if (path.startsWith('/insights/')) {
      const match = articles.find((a) => path.endsWith(a.slug));
      if (match) { title = match.title + ' | Keystone Law Firm, P.A.'; description = match.summary; }
    } else if (path === '/practice-areas') { title = 'Practice Areas | Keystone Law Firm, P.A.'; }
    else if (path === '/our-firm') { title = 'Our Firm | Keystone Law Firm, P.A.'; }
    else if (path === '/insights') { title = 'Resources | Keystone Law Firm, P.A.'; }
    else if (path === '/contact') { title = 'Contact | Keystone Law Firm, P.A.'; }
    else if (path === '/disclaimer') { title = 'Legal Notice | Keystone Law Firm, P.A.'; }
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [location.pathname]);

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -45px 0px', threshold: .08 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [location.pathname]);
  return null;
}

function ProgressBar() {
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty('--scroll', String(pct));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true" />;
}

const navItems = [
  { to: '/practice-areas', label: 'Expertise' },
  { to: '/our-firm', label: 'Our Firm' },
  { to: '/insights', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
];

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('menu-open'); document.removeEventListener('keydown', onKey); };
  }, [open]);
  return (
    <>
      <div className="utility-bar">
        <span>MIAMI BASED · SERVING SOUTH FLORIDA</span>
        <span className="utility-bar__right">PERSPECTIVE IN EVERY DECISION <span aria-hidden="true">✦</span> <a href={firm.phoneHref}>{firm.phone}</a></span>
      </div>
      <header className="site-header">
        <div className="shell site-header__inner">
          <Wordmark />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => <NavLink key={item.to} to={item.to} className={({isActive}) => 'desktop-nav__link' + (isActive ? ' is-active' : '')}>{item.label}</NavLink>)}
          </nav>
          <Link className="header-cta" to="/contact">Begin a conversation <ArrowUpRight size={15} strokeWidth={1.5} /></Link>
          <button className="menu-trigger" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      <div id="mobile-menu" className={'mobile-menu' + (open ? ' mobile-menu--open' : '')} aria-hidden={!open}>
        <div className="mobile-menu__inner shell">
          <p className="eyebrow">EXPLORE KEYSTONE</p>
          {[{to:'/',label:'Home'},...navItems].map((item, i) =>
            <Link key={item.to} to={item.to} tabIndex={open ? 0 : -1} className="mobile-menu__link" onClick={() => setOpen(false)}><span>0{i+1}</span>{item.label}<ArrowUpRight size={25} /></Link>
          )}
          <a href={firm.phoneHref} tabIndex={open ? 0 : -1} className="mobile-menu__phone">Call our office: {firm.phone}</a>
        </div>
      </div>
    </>
  );
}

function SectionLabel({ number, children, light = false }) {
  return <div className={'section-label' + (light ? ' section-label--light' : '')}><span className="section-label__index">{number}</span><span className="section-label__line" /><span>{children}</span></div>;
}

function TextLink({ to, children, inverse = false }) {
  return <Link className={'text-link' + (inverse ? ' text-link--inverse' : '')} to={to}>{children}<span className="text-link__icon"><ArrowUpRight size={18} strokeWidth={1.5}/></span></Link>;
}

function Architecture({ className = '' }) {
  return (
    <div className={'architecture ' + className} aria-hidden="true">
      <div className="architecture__halo" />
      <div className="architecture__outer">
        <div className="architecture__inner">
          <div className="architecture__vault">
            <div className="architecture__light" />
            <div className="architecture__spire" />
          </div>
        </div>
      </div>
      <div className="architecture__horizon" />
      <div className="architecture__caption">FORM · STRUCTURE · PURPOSE <span>01 / 03</span></div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__topline shell">
        <span className="hero__topline-left">LITIGATION · TRANSACTIONS · CONSIDERED COUNSEL</span>
        <span className="hero__topline-right">25°53′ N &nbsp; / &nbsp; 80°11′ W</span>
      </div>
      <div className="hero__grid shell">
        <div className="hero__copy">
          <div className="hero__index"><span className="tiny-cross">✳</span> KEYSTONE LAW FIRM, P.A.</div>
          <h1>The strength<br/><em>behind</em> your<br/>next move<span className="hero__period">.</span></h1>
          <div className="hero__description">
            <div className="hero__description-line" />
            <p>Miami-based counsel for individuals, families, and businesses throughout South Florida. From complex litigation to significant transactions, we help you navigate what comes next.</p>
          </div>
          <div className="hero__actions">
            <Link className="button button--gold" to="/practice-areas">Explore our practice <ArrowUpRight size={18}/></Link>
            <Link className="hero__quiet-link" to="/contact">Speak with our office <ArrowRight size={16}/></Link>
          </div>
        </div>
        <div className="hero__visual">
          <Architecture />
          <div className="hero__visual-text">FOUNDATIONS<br/>FORWARD</div>
        </div>
      </div>
      <div className="hero__bottom shell">
        <span className="hero__scroll"><ArrowDown size={15} /> SCROLL TO EXPLORE</span>
        <span>01 — A DIFFERENT PERSPECTIVE</span>
        <span className="hero__star">✳</span>
      </div>
    </section>
  );
}

function IntroStrip() {
  return (
    <section className="intro-strip">
      <div className="shell intro-strip__inner">
        <div className="intro-strip__eyebrow reveal"><span>01 / THE PERSPECTIVE</span><span className="intro-strip__rule"/></div>
        <p className="intro-strip__quote reveal">From the courtroom to the closing table, <em>every decision</em> deserves thoughtful counsel.</p>
        <div className="intro-strip__aside reveal"><span className="asterisk">✳</span><p>Litigation and transactional representation for South Florida individuals, families, and businesses.</p></div>
      </div>
    </section>
  );
}

function PracticeList({ limit }) {
  const items = limit ? practices.slice(0, limit) : practices;
  return <div className="practice-list">
    {items.map((item, i) =>
      <Link className="practice-row reveal" key={item.slug} to={'/practice-areas/' + item.slug}>
        <span className="practice-row__number">{String(i + 1).padStart(2, "0")}</span>
        <div className="practice-row__main">
          <span className="practice-row__category">{item.category}</span>
          <h3>{item.title}</h3>
        </div>
        <p className="practice-row__summary">{item.short}</p>
        <span className="practice-row__arrow"><ArrowUpRight size={23} strokeWidth={1.3} /></span>
      </Link>
    )}
  </div>;
}

function ExpertiseSection() {
  return (
    <section className="expertise-section section-space">
      <div className="shell">
        <SectionLabel number="02">WHERE WE FOCUS</SectionLabel>
        <div className="section-heading section-heading--split reveal">
          <h2>Every matter<br/>has its <em>weight.</em></h2>
          <div><p>From commercial and construction litigation to corporate, real estate, family, and estate matters, discover how Keystone approaches complex legal needs.</p><TextLink to="/practice-areas">All practice areas</TextLink></div>
        </div>
        <PracticeList limit={6} />
        <div className="practice-preview-more reveal"><span>Explore all 11 areas of practice.</span><TextLink to="/practice-areas">View our full expertise</TextLink></div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="manifesto-section">
      <div className="shell manifesto-section__inner">
        <div className="manifesto-section__copy reveal">
          <SectionLabel number="03" light>OUR PHILOSOPHY</SectionLabel>
          <p className="manifesto-section__overline">STRENGTH IN THE SUBSTANCE</p>
          <h2>Grounded in<br/><em>perspective.</em><br/>Focused on<br/>what matters.</h2>
          <p className="manifesto-section__text">Led by Frank Wolland and Lo Laughlin, Keystone works with individuals, families, and businesses across disputes, transactions, and the decisions that connect them.</p>
          <TextLink to="/our-firm" inverse>Discover the firm</TextLink>
        </div>
        <div className="manifesto-section__graphic reveal" aria-hidden="true">
          <span className="manifesto-section__outline">K</span>
          <span className="manifesto-section__circle"><span>KEYSTONE<br/>LAW FIRM</span><span>EST. IN FLORIDA<br/>2016</span></span>
          <span className="manifesto-section__axis">A SOUND FOUNDATION / A CLEAR DIRECTION</span>
        </div>
      </div>
    </section>
  );
}

function LeadershipSection({ onHome = false }) {
  return (
    <section className="leadership-section section-space">
      <div className="shell">
        <SectionLabel number={onHome ? "04" : "03"}>LEADERSHIP AT KEYSTONE</SectionLabel>
        <div className="section-heading section-heading--split reveal">
          <h2>The people<br/><em>behind the firm.</em></h2>
          <div>
            <p>Keystone is owned and led by Frank Wolland, Head Partner, alongside Lo Laughlin, Managing Partner.</p>
            {onHome && <TextLink to="/our-firm">About our firm</TextLink>}
          </div>
        </div>
        <div className="leadership-grid">
          {firm.leadership.map((leader, index) =>
            <article className="leadership-card reveal" key={leader.name}>
              <div className={'leadership-card__monogram leadership-card__monogram--' + index} aria-hidden="true">
                <div className="leadership-card__arch"><span>{leader.name.split(' ').map(part => part[0]).join('')}</span></div>
                <div className="leadership-card__monogram-footer">KEYSTONE LAW FIRM, P.A. <span>0{index + 1}</span></div>
              </div>
              <div className="leadership-card__body">
                <span className="eyebrow">{leader.role}</span>
                <h3>{leader.name}</h3>
                <p>{leader.note}</p>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    ['01', 'Start with the facts', 'Share what has happened, the documents involved, and the questions you need answered.'],
    ['02', 'Understand the landscape', 'Discuss the relevant issues, possible paths, and what may require closer examination.'],
    ['03', 'Consider what comes next', 'With a clearer view of the matter, determine whether and how to move forward.'],
  ];
  return (
    <section className="process-section section-space">
      <div className="shell">
        <SectionLabel number="05">THE FIRST CONVERSATION</SectionLabel>
        <div className="process-section__head reveal">
          <h2>Clarity is<br/><em>the starting point.</em></h2>
          <p>A legal question can feel complicated before you have the right information. Here's how to prepare for an initial discussion.</p>
        </div>
        <div className="process-grid">
          {steps.map((step, index) => <div className="process-card reveal" key={step[0]}>
            <div className="process-card__top"><span>{step[0]} / 03</span><span className="process-card__symbol">{index === 1 ? '↗' : '✳'}</span></div>
            <div className="process-card__bottom"><h3>{step[1]}</h3><p>{step[2]}</p></div>
          </div>)}
        </div>
      </div>
    </section>
  );
}

function ResourceCards({ limit }) {
  return <div className="resource-grid">
    {(limit ? articles.slice(0, limit) : articles).map((item, i) =>
      <Link className={'resource-card resource-card--' + i + ' reveal'} key={item.slug} to={'/insights/' + item.slug}>
        <div className="resource-card__art" aria-hidden="true">
          <span className="resource-card__art-word">{i === 0 ? 'I.' : i === 1 ? 'II.' : 'III.'}</span>
          <span className="resource-card__art-line"/>
          <span className="resource-card__art-orbit"/>
        </div>
        <div className="resource-card__meta"><span>{item.type}</span><span>{item.minutes}</span></div>
        <h3>{item.title}</h3>
        <div className="resource-card__footer"><span>Read the guide</span><ArrowUpRight size={21} strokeWidth={1.3}/></div>
      </Link>)}
  </div>;
}

function ResourcesSection() {
  return (
    <section className="resources-section section-space">
      <div className="shell">
        <SectionLabel number="06">THINGS WORTH KNOWING</SectionLabel>
        <div className="section-heading section-heading--split reveal">
          <h2>Knowledge is<br/><em>its own advantage.</em></h2>
          <div><p>Plain-language resources to help you approach a legal conversation with better questions.</p><TextLink to="/insights">Explore resources</TextLink></div>
        </div>
        <ResourceCards limit={3}/>
      </div>
    </section>
  );
}

function ContactBanner() {
  return (
    <section className="contact-banner">
      <div className="shell contact-banner__inner">
        <div className="contact-banner__left reveal">
          <span className="eyebrow">YOUR NEXT CHAPTER STARTS WITH A CONVERSATION</span>
          <h2>Let's begin<br/><em>with perspective.</em></h2>
        </div>
        <Link className="contact-banner__action reveal" to="/contact"><span>Get in touch</span><ArrowUpRight size={34} strokeWidth={1.1}/></Link>
      </div>
    </section>
  );
}

function Home() {
  return <><Hero/><IntroStrip/><ExpertiseSection/><ManifestoSection/><LeadershipSection onHome/><ProcessSection/><ResourcesSection/><ContactBanner/></>;
}

function InteriorHero({ index, eyebrow, title, accent, description, tone = 'light' }) {
  return (
    <section className={'interior-hero interior-hero--' + tone}>
      <div className="shell interior-hero__inner">
        <div className="interior-hero__breadcrumbs"><Link to="/">HOME</Link><span>/</span><span>{eyebrow}</span></div>
        <div className="interior-hero__content">
          <div className="interior-hero__title"><span className="interior-hero__number">{index} / KEYSTONE</span><h1>{title}<br/><em>{accent}</em></h1></div>
          <p>{description}</p>
        </div>
        <span className="interior-hero__watermark" aria-hidden="true">K</span>
      </div>
    </section>
  );
}

function PracticeIndex() {
  return (
    <>
      <InteriorHero index="01" eyebrow="EXPERTISE" title="The matters" accent="that matter." description="Explore all 11 practice areas, from civil and commercial litigation to transactional matters, family law, property disputes, and representation of organizations throughout South Florida."/>
      <section className="interior-content section-space">
        <div className="shell">
          <SectionLabel number="01">AREAS OF PRACTICE</SectionLabel>
          <PracticeList/>
          <div className="aside-note reveal"><span>✳</span><p>These are the 11 primary practice areas provided by the firm. The appropriate services and scope of representation will depend on your circumstances.</p></div>
        </div>
      </section>
      <ContactBanner/>
    </>
  );
}

function PracticeDetail() {
  const { slug } = useParams();
  const item = practices.find((p) => p.slug === slug);
  if (!item) return <NotFound/>;
  return (
    <>
      <section className="detail-hero">
        <div className="shell detail-hero__inner">
          <div className="detail-hero__breadcrumbs"><Link to="/">HOME</Link><span>/</span><Link to="/practice-areas">EXPERTISE</Link><span>/</span><span>{item.title.toUpperCase()}</span></div>
          <span className="detail-hero__category">{item.category}</span>
          <h1>{item.headline}</h1>
          <p>{item.intro}</p>
          <div className="detail-hero__actions"><Link className="button button--gold" to="/contact">Discuss your matter <ArrowUpRight size={17}/></Link><Link className="back-link" to="/practice-areas"><ArrowLeft size={17}/> All practice areas</Link></div>
          <div className="detail-hero__symbol" aria-hidden="true"><Mark large/></div>
        </div>
      </section>
      <section className="detail-body section-space">
        <div className="shell detail-body__grid">
          <div className="detail-body__main">
            <SectionLabel number="01">POSSIBLE AREAS OF ASSISTANCE</SectionLabel>
            <h2>Consider the<br/><em>full picture.</em></h2>
            <p>Each matter involves its own documents, timelines, and legal considerations. Here are some of the issues that may arise within this practice area.</p>
            <div className="scope-list">
              {item.scope.map((scope,i) => <div className="scope-list__row" key={scope}><span>0{i+1}</span><h3>{scope}</h3><Plus size={17} strokeWidth={1.3}/></div>)}
            </div>
            <div className="detail-body__note"><span className="asterisk">✳</span><p>{item.note}</p></div>
          </div>
          <aside className="detail-sidebar">
            <span className="eyebrow">A PLACE TO BEGIN</span>
            <h3>Have a question about your situation?</h3>
            <p>Reach out to discuss whether your matter may be a fit for the firm.</p>
            <a href={firm.phoneHref} className="detail-sidebar__phone"><Phone size={17}/>{firm.phone}</a>
            <Link to="/contact" className="detail-sidebar__link">Contact details <ArrowUpRight size={17}/></Link>
            <div className="detail-sidebar__bottom">NORTH MIAMI<br/>FLORIDA</div>
          </aside>
        </div>
      </section>
      <section className="next-practice"><div className="shell next-practice__inner">
        <span className="eyebrow">KEEP EXPLORING</span>
        <TextLink to={'/practice-areas/' + practices[(practices.findIndex(p=>p.slug===slug)+1)%practices.length].slug}>{practices[(practices.findIndex(p=>p.slug===slug)+1)%practices.length].title}</TextLink>
      </div></section>
      <ContactBanner/>
    </>
  );
}

function FirmPage() {
  return (
    <>
      <InteriorHero index="02" eyebrow="OUR FIRM" title="Grounded in" accent="perspective." description="A Miami-based practice serving individuals, families, and businesses throughout South Florida. Led by Head Partner Frank Wolland and Managing Partner Lo Laughlin." tone="dark"/>
      <section className="firm-story section-space">
        <div className="shell firm-story__grid">
          <div className="firm-story__visual reveal"><div className="firm-story__arch"><Mark large/></div><span>STRUCTURE / PURPOSE / CLARITY</span></div>
          <div className="firm-story__copy reveal">
            <SectionLabel number="01">WHO WE ARE</SectionLabel>
            <h2>Good judgment<br/>begins with <em>listening.</em></h2>
            <p>Keystone Law Firm, P.A. is a Miami-based law firm representing individuals, families, and businesses throughout South Florida. The firm is owned and led by Frank Wolland, Head Partner, alongside Managing Partner Lo Laughlin.</p>
            <p>Keystone handles both litigation and transactional matters, including complex business, financial, and property disputes. Its practice spans corporate and real estate concerns, family and probate matters, construction and community association disputes, and issues involving municipalities, nonprofits, and religious organizations.</p>
            <TextLink to="/contact">Connect with the office</TextLink>
          </div>
        </div>
      </section>
      <section className="firm-principles section-space">
        <div className="shell">
          <SectionLabel number="02">OUR POINT OF VIEW</SectionLabel>
          <div className="section-heading reveal"><h2>Principles that<br/><em>make a difference.</em></h2></div>
          <div className="principles-grid">
            {[['01','Consideration','The facts, the timing, and the circumstances deserve attention.'],['02','Clarity','Plain language creates a better foundation for informed choices.'],['03','Perspective','A meaningful decision starts with understanding the available paths.']].map(item=><div key={item[0]} className="principle-card reveal"><span>{item[0]} / 03</span><h3>{item[1]}</h3><p>{item[2]}</p></div>)}
          </div>
        </div>
      </section>
      <LeadershipSection/>
      <ContactBanner/>
    </>
  );
}

function InsightsPage() {
  return <>
    <InteriorHero index="03" eyebrow="RESOURCES" title="A little more" accent="understanding." description="Practical starting points, written in plain language. General information to help you ask the right questions."/>
    <section className="section-space resources-page"><div className="shell"><SectionLabel number="01">KNOWLEDGE LIBRARY</SectionLabel><ResourceCards/></div></section>
    <ContactBanner/>
  </>;
}

function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return <NotFound/>;
  return <>
    <section className="article-hero"><div className="shell article-hero__inner">
      <div className="detail-hero__breadcrumbs"><Link to="/">HOME</Link><span>/</span><Link to="/insights">RESOURCES</Link><span>/</span><span>GUIDE</span></div>
      <div className="article-hero__meta"><span>{article.type}</span><span>{article.minutes}</span></div>
      <h1>{article.title}</h1>
      <p>{article.summary}</p>
      <span className="article-hero__decoration" aria-hidden="true">✳</span>
    </div></section>
    <section className="article-body section-space"><div className="shell article-body__grid">
      <aside><span className="eyebrow">ON THIS PAGE</span>{article.sections.map((s,i)=><a key={s.heading} href={'#section-'+i}><span>0{i+1}</span>{s.heading}</a>)}</aside>
      <div className="article-body__content">
        <p className="article-body__lead">The information below is educational and does not substitute for advice from an attorney familiar with your situation.</p>
        {article.sections.map((section,i)=><section key={section.heading} id={'section-'+i}><span className="article-body__index">0{i+1} / THE ESSENTIALS</span><h2>{section.heading}</h2><p>{section.text}</p></section>)}
        <div className="article-body__disclaimer">This guide provides general information, not legal advice. Reading this page or contacting the firm does not create an attorney-client relationship.</div>
        <TextLink to="/insights">Back to all resources</TextLink>
      </div>
    </div></section>
    <ContactBanner/>
  </>;
}

function ContactPage() {
  return <>
    <InteriorHero index="04" eyebrow="CONTACT" title="A conversation" accent="is a beginning." description="Keystone serves clients throughout South Florida from its North Miami office. For urgent legal deadlines, please call the firm directly." tone="dark"/>
    <section className="contact-page section-space"><div className="shell contact-page__grid">
      <div className="contact-page__left reveal">
        <SectionLabel number="01">GET IN TOUCH</SectionLabel>
        <h2>We're here<br/>to <em>listen.</em></h2>
        <p>Contact Keystone about litigation, business and corporate law, property issues, family matters, estate administration, and other legal needs throughout South Florida.</p>
        <a className="contact-page__call" href={firm.phoneHref}>{firm.phone} <ArrowUpRight size={26}/></a>
        <span className="contact-page__call-caption">CALL KEYSTONE LAW FIRM, P.A.</span>
      </div>
      <div className="contact-page__right reveal">
        <div className="contact-page__info">
          <span className="eyebrow">01 / VISIT THE OFFICE</span>
          <h3>{firm.addressLine1}<br/>{firm.addressLine2}<br/>{firm.cityLine}</h3>
          <a href={firm.directions} rel="noreferrer" target="_blank">Get directions <ArrowUpRight size={18}/></a>
        </div>
        <div className="contact-page__info">
          <span className="eyebrow">02 / CALL THE OFFICE</span>
          <h3>{firm.phone}</h3>
          <a href={firm.phoneHref}>Tap to call <ArrowUpRight size={18}/></a>
        </div>
        <div className="contact-page__info contact-page__info--small">
          <span className="eyebrow">BEFORE REACHING OUT</span>
          <p>Please do not share confidential or sensitive information in an initial inquiry. Contacting the firm does not establish an attorney-client relationship. Office details should be confirmed before traveling.</p>
        </div>
      </div>
    </div></section>
    <section className="contact-map-panel"><div className="shell contact-map-panel__inner">
      <div className="contact-map-panel__art" aria-hidden="true"><div className="contact-map-panel__grid"/><span className="contact-map-panel__point">K<span></span></span></div>
      <div><span className="eyebrow">BASED IN SOUTH FLORIDA</span><h2>North Miami,<br/><em>Florida.</em></h2><a href={firm.directions} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={18}/></a></div>
    </div></section>
  </>;
}

function DisclaimerPage() {
  return <>
    <InteriorHero index="05" eyebrow="LEGAL NOTICE" title="Important" accent="information." description="Please read the following information about using this website."/>
    <section className="legal-page section-space"><div className="shell">
      <h2>General information only</h2><p>Material on this website is provided for general informational purposes and is not legal advice. Laws and procedures change. A legal matter should be evaluated based on its particular facts and the current law.</p>
      <h2>No attorney-client relationship</h2><p>Visiting this website, calling the office, or sending an inquiry does not establish an attorney-client relationship. Do not send confidential information until the firm has agreed to represent you.</p>
      <h2>No promised results</h2><p>Descriptions of practice areas or legal processes are not guarantees, predictions, or promises about any case. Past outcomes, where applicable, do not predict future results.</p>
      <h2>Privacy and external services</h2><p>This initial website does not offer a web intake form or create client accounts. If you choose to follow an external map or directory link, that provider's practices apply. Web hosting infrastructure may process standard technical request information.</p>
      <h2>Accuracy and review</h2><p>Practice area descriptions, telephone information, address details, attorney associations, and all advertising content should be reviewed and confirmed by Keystone Law Firm, P.A. before public launch.</p>
      <TextLink to="/contact">Contact the office</TextLink>
    </div></section>
  </>;
}

function NotFound() {
  return <section className="notfound"><div className="shell"><span className="eyebrow">404 / PAGE NOT FOUND</span><h1>A different path<br/><em>starts here.</em></h1><p>The page you're looking for isn't available.</p><TextLink to="/">Return home</TextLink></div></section>;
}

function Footer() {
  return <footer className="footer">
    <div className="shell">
      <div className="footer__top">
        <div className="footer__brand"><Wordmark light/><p>Litigation and transactional counsel for individuals, families, and businesses across South Florida.</p></div>
        <div className="footer__nav"><span className="eyebrow">EXPLORE</span><Link to="/practice-areas">Expertise</Link><Link to="/our-firm">Our firm</Link><Link to="/insights">Resources</Link><Link to="/contact">Contact</Link></div>
        <div className="footer__office"><span className="eyebrow">NORTH MIAMI OFFICE</span><address>{firm.addressLine1}<br/>{firm.addressLine2}<br/>{firm.cityLine}</address><a href={firm.phoneHref}>{firm.phone}</a></div>
      </div>
      <div className="footer__large-word" aria-hidden="true">KEYSTONE<span>✳</span></div>
      <div className="footer__bottom"><span>© {new Date().getFullYear()} KEYSTONE LAW FIRM, P.A.</span><Link to="/disclaimer">LEGAL NOTICE &amp; PRIVACY</Link><a href="#top" onClick={(event)=>{event.preventDefault();window.scrollTo({top:0,behavior:'smooth'});}}>BACK TO TOP ↑</a></div>
      <p className="footer__disclaimer">General information, not legal advice. No attorney-client relationship arises from using this website or contacting the firm. Contact and advertising details remain subject to final firm review.</p>
    </div>
  </footer>;
}

export default function App() {
  return <>
    <ScrollManager/>
    <ProgressBar/>
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="top"/>
    <Header/>
    <main id="main">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/practice-areas" element={<PracticeIndex/>}/>
        <Route path="/practice-areas/:slug" element={<PracticeDetail/>}/>
        <Route path="/our-firm" element={<FirmPage/>}/>
        <Route path="/insights" element={<InsightsPage/>}/>
        <Route path="/insights/:slug" element={<ArticlePage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/disclaimer" element={<DisclaimerPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </main>
    <Footer/>
  </>;
}
