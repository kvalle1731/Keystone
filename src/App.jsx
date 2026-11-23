import React, { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ArrowLeft, Menu, X, Phone } from 'lucide-react';
import { firm, practices, articles } from './data.js';

const categories = [
  {
    name: 'Disputes & litigation',
    description: 'Litigation involving businesses, property, contracts and financial interests.',
    slugs: ['civil-commercial-litigation','construction-litigation','foreclosure-bankruptcy-litigation','condominium-hoa-disputes','contract-disputes-debt-collection','code-enforcement-zoning-municipal-law']
  },
  {
    name: 'Business & property',
    description: 'Legal support for organizations, transactions and property matters.',
    slugs: ['business-corporate-law','real-estate-property-law','nonprofit-religious-organizations']
  },
  {
    name: 'Individuals & families',
    description: 'Representation in family, estate and guardianship matters.',
    slugs: ['family-law-divorce','probate-estate-guardianship']
  }
];

const navigation = [
  {to:'/practice-areas',label:'Practice areas'},
  {to:'/our-firm',label:'Our firm'},
  {to:'/insights',label:'Resources'},
  {to:'/contact',label:'Contact'}
];

function Wordmark({inverse=false}) {
  return <Link to="/" aria-label="Keystone Law Firm, P.A. home" className={'wordmark'+(inverse?' wordmark--inverse':'')}>
    <span className="wordmark__main">KEYSTONE</span>
    <span className="wordmark__detail">LAW FIRM, P.A.</span>
  </Link>;
}

function Header() {
  const [open,setOpen]=useState(false);
  const location=useLocation();
  useEffect(()=>setOpen(false),[location.pathname]);
  useEffect(()=>{
    document.body.classList.toggle('menu-open',open);
    function handleEsc(e){if(e.key==='Escape')setOpen(false)}
    document.addEventListener('keydown',handleEsc);
    return()=>{document.body.classList.remove('menu-open');document.removeEventListener('keydown',handleEsc)};
  },[open]);
  return <>
    <header className="site-header">
      <div className="container site-header__inner">
        <Wordmark/>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(item=><NavLink to={item.to} key={item.to} className={({isActive})=>isActive?'active':''}>{item.label}</NavLink>)}
        </nav>
        <Link to="/contact" className="header-action">Get in touch <ArrowUpRight size={17} aria-hidden="true"/></Link>
        <button type="button" className="menu-button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?<X size={25}/>:<Menu size={25}/>}</button>
      </div>
    </header>
    <div className={'mobile-navigation'+(open?' mobile-navigation--open':'')} id="mobile-navigation" aria-hidden={!open}>
      <nav aria-label="Mobile navigation" className="container mobile-navigation__inner">
        {[{to:'/',label:'Home'},...navigation].map(item=><Link key={item.to} to={item.to} tabIndex={open?0:-1} onClick={()=>setOpen(false)}>{item.label}<ArrowUpRight size={18}/></Link>)}
        <a tabIndex={open?0:-1} href={firm.phoneHref}>Call {firm.phone}</a>
      </nav>
    </div>
  </>;
}

function PageEffects() {
  const {pathname}=useLocation();
  useEffect(()=>{
    window.scrollTo(0,0);
    const practice=practices.find(p=>pathname==='/practice-areas/'+p.slug);
    const article=articles.find(a=>pathname==='/insights/'+a.slug);
    const titles={'/':'Keystone Law Firm, P.A. | Miami & South Florida','/practice-areas':'Practice Areas | Keystone Law Firm','/our-firm':'Our Firm | Keystone Law Firm','/insights':'Resources | Keystone Law Firm','/contact':'Contact | Keystone Law Firm','/disclaimer':'Legal Notice | Keystone Law Firm'};
    const pageTitle=practice?practice.title+' | Keystone Law Firm':article?article.title+' | Keystone Law Firm':titles[pathname]||'Keystone Law Firm, P.A.';
    document.title=pageTitle;
    const desc=practice?.intro||article?.summary||'Keystone Law Firm, P.A. serves individuals, families and businesses throughout South Florida in litigation and transactional matters.';
    document.querySelector('meta[name="description"]')?.setAttribute('content',desc);
  },[pathname]);
  return null;
}

function LinkArrow({to,children,quiet=false}) {
  return <Link className={'link-arrow'+(quiet?' link-arrow--quiet':'')} to={to}>{children}<ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true"/></Link>;
}

function SmallHeading({children}) {
  return <h2 className="small-heading">{children}</h2>;
}

function Hero() {
  return <section className="home-hero">
    <div className="home-hero__copy">
      <div className="home-hero__meta"><span>KEYSTONE LAW FIRM, P.A.</span><span>MIAMI, FLORIDA</span></div>
      <div className="home-hero__content">
        <span className="eyebrow">A DIFFERENT APPROACH TO LEGAL COUNSEL</span>
        <h1>More than<br/>a case.<br/><em>More than</em><br/>a contract.</h1>
        <p>Law impacts the things people build, own and care about. Keystone represents individuals, families and businesses in litigation and transactional matters across South Florida.</p>
        <Link to="/contact" className="home-hero__primary">Discuss your matter <ArrowUpRight size={22}/></Link>
      </div>
      <div className="home-hero__foot"><span>OUR PERSPECTIVE, YOUR NEXT MOVE</span><span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span></div>
    </div>
    <aside className="home-hero__folio" aria-label="Our work at a glance">
      <div className="home-hero__folio-top"><span>THE KEYSTONE INDEX</span><span>01 / 03</span></div>
      <div className="home-hero__folio-body">
        <span className="home-hero__folio-label">REPRESENTATION ACROSS</span>
        <Link to="/practice-areas/civil-commercial-litigation"><span>Litigation</span><ArrowUpRight size={24}/></Link>
        <Link to="/practice-areas/business-corporate-law"><span>Business</span><ArrowUpRight size={24}/></Link>
        <Link to="/practice-areas/real-estate-property-law"><span>Property</span><ArrowUpRight size={24}/></Link>
        <Link to="/practice-areas/family-law-divorce"><span>Family</span><ArrowUpRight size={24}/></Link>
      </div>
      <div className="home-hero__folio-foot"><strong>11</strong><p>PRIMARY<br/>PRACTICE AREAS</p><Link to="/practice-areas">VIEW THE FULL INDEX ↗</Link></div>
    </aside>
  </section>;
}
function PracticeIndex({forHome=false}){
  return <div className={'practice-directory'+(forHome?' practice-directory--home':'')}>
    {categories.map(category=><section className="practice-group" key={category.name}>
      <div className="practice-group__header">
        <h3>{category.name}</h3>
        {!forHome&&<p>{category.description}</p>}
      </div>
      <div className="practice-group__links">
        {category.slugs.map(slug=>{
          const p=practices.find(item=>item.slug===slug);
          if(!p)return null;
          return <Link key={slug} to={'/practice-areas/'+slug} className="practice-link">
            <span>{p.title}</span><ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true"/>
          </Link>;
        })}
      </div>
    </section>)}
  </div>;
}

function HomePractice() {
  const [active,setActive]=useState(0);
  const group=categories[active];
  return <section className="home-practice" id="expertise">
    <div className="container">
      <div className="home-practice__intro">
        <div><span className="eyebrow">01 / THE WORK</span><h2>The right approach<br/><em>depends on the matter.</em></h2></div>
        <p>From negotiations to the courtroom, our work crosses industries, relationships and legal disciplines. Choose a category to see where Keystone can assist.</p>
      </div>
      <div className="practice-explorer">
        <div className="practice-explorer__menu" role="group" aria-label="Explore practice categories">
          {categories.map((category,i)=><button type="button" key={category.name} onClick={()=>setActive(i)} aria-pressed={active===i} className={active===i?'active':''}>
            <span>0{i+1}</span><strong>{category.name}</strong><ArrowUpRight size={17}/>
          </button>)}
          <div className="practice-explorer__note"><span>KEYSTONE / AREAS OF REPRESENTATION</span><p>11 primary practice areas.<br/>Litigation and transactional work.</p></div>
        </div>
        <div className="practice-explorer__content" key={group.name}>
          <div className="practice-explorer__top"><span>{group.name.toUpperCase()}</span><span>{String(group.slugs.length).padStart(2,'0')} PRACTICES</span></div>
          <p className="practice-explorer__description">{group.description}</p>
          <div className="practice-explorer__links">
            {group.slugs.map((slug,i)=>{const practice=practices.find(p=>p.slug===slug);return practice?<Link key={slug} to={'/practice-areas/'+slug}><span className="practice-explorer__count">{String(i+1).padStart(2,'0')}</span><span>{practice.title}</span><ArrowUpRight size={19}/></Link>:null})}
          </div>
          <LinkArrow to="/practice-areas">Full practice directory</LinkArrow>
        </div>
      </div>
    </div>
  </section>;
}
function HomeAbout() {
  return <section className="home-about">
    <div className="container home-about__layout">
      <div className="home-about__lead">
        <span className="eyebrow">02 / THE FIRM</span>
        <h2>There is no<br/><em>standard</em> case.</h2>
        <div className="home-about__signature"><span>KEYSTONE LAW FIRM, P.A.</span><span>MIAMI / SOUTH FLORIDA</span></div>
      </div>
      <div className="home-about__story">
        <p>Every dispute has its circumstances. Every transaction has its consequences. We work across both, bringing legal perspective to the questions facing our clients.</p>
        <p>Keystone Law Firm, P.A. is based in Miami and serves individuals, families and businesses throughout South Florida, including complex business, financial and property matters.</p>
        <LinkArrow quiet to="/our-firm">More about our firm</LinkArrow>
      </div>
    </div>
  </section>;
}
function Leaders({compact=false}){
  return <div className={'leaders'+(compact?' leaders--compact':'')}>
    {firm.leadership.map(person=><div className="leader" key={person.name}>
      <h3>{person.name}</h3><p>{person.role}</p>
    </div>)}
  </div>;
}

function HomeLeaders() {
  return <section className="home-leaders">
    <div className="container">
      <div className="home-leaders__top">
        <span className="eyebrow">03 / FIRM LEADERSHIP</span>
        <div><h2>The people<br/><em>behind Keystone.</em></h2><p>Frank Wolland and Lo Laughlin lead Keystone's practice.</p></div>
      </div>
      <div className="home-leaders__grid">
        {firm.leadership.map((person,i)=><div className={'home-leader home-leader--'+i} key={person.name}>
          <div className="home-leader__top"><span>0{i+1}</span><span>KEYSTONE LAW FIRM, P.A.</span></div>
          <div className="home-leader__identity"><span className="home-leader__role">{person.role}</span><h3>{person.name}</h3></div>
          <div className="home-leader__bottom"><span>SOUTH FLORIDA</span><span aria-hidden="true">↗</span></div>
        </div>)}
      </div>
      <div className="home-leaders__more"><LinkArrow to="/our-firm">Learn about our firm</LinkArrow></div>
    </div>
  </section>;
}
function ContactBand() {
  return <section className="contact-band">
    <div className="container contact-band__layout">
      <div><span className="eyebrow">START HERE</span><h2>Have a legal<br/><em>matter to discuss?</em></h2></div>
      <div className="contact-band__right"><p>We work with individuals, families, businesses and organizations throughout South Florida.</p><Link to="/contact" className="contact-band__action">Contact Keystone <ArrowUpRight size={23}/></Link><a className="contact-band__phone" href={firm.phoneHref}>{firm.phone}</a></div>
    </div>
  </section>;
}
function Home(){
  return <><Hero/><HomePractice/><HomeAbout/><HomeLeaders/><ContactBand/></>;
}

function PageHeading({label,title,description}){
  return <section className="page-heading"><div className="container page-heading__inner">
    <div className="page-heading__breadcrumbs"><Link to="/">Home</Link><span>/</span><span>{label}</span></div>
    <span className="eyebrow">{label}</span><h1>{title}</h1>
    <p>{description}</p>
  </div></section>;
}

function Practices(){
  return <>
    <PageHeading label="Practice areas" title="Our practice." description="Keystone advises and represents individuals, families, businesses and organizations in litigation and transactional matters throughout South Florida."/>
    <section className="practice-overview section-pad"><div className="container">
      <div className="practice-overview__intro"><SmallHeading>Areas of representation</SmallHeading><p>Select a practice area to explore the types of matters we handle.</p></div>
      <PracticeIndex/>
    </div></section><ContactBand/>
  </>;
}

function PracticeDetail(){
  const {slug}=useParams();const practice=practices.find(p=>p.slug===slug);
  if(!practice)return <NotFound/>;
  const next=practices[(practices.indexOf(practice)+1)%practices.length];
  return <>
    <section className="detail-heading"><div className="container">
      <Link to="/practice-areas" className="back-link"><ArrowLeft size={16}/> All practice areas</Link>
      <span className="eyebrow">{practice.category}</span><h1>{practice.title}</h1><p>{practice.intro}</p>
    </div></section>
    <section className="detail-body section-pad"><div className="container detail-body__grid">
      <div><SmallHeading>Our focus</SmallHeading><h2>{practice.headline}</h2><p>Every matter has its own circumstances, priorities and legal requirements.</p></div>
      <div className="detail-body__right">
        <h3>Matters in this area</h3>
        <ul>{practice.scope.map(s=><li key={s}>{s}</li>)}</ul>
        <p className="detail-body__note">{practice.note} An initial discussion can help determine whether the firm can assist.</p>
        <LinkArrow to="/contact">Discuss your matter</LinkArrow>
      </div>
    </div></section>
    <section className="next-practice"><div className="container next-practice__inner"><span>Explore another practice</span><Link to={'/practice-areas/'+next.slug}>{next.title}<ArrowRight size={19}/></Link></div></section>
  </>;
}

function Firm(){
  return <>
    <PageHeading label="Our firm" title="Keystone Law Firm, P.A." description="A Miami based law firm serving clients throughout South Florida."/>
    <section className="firm-overview section-pad"><div className="container firm-overview__grid">
      <div><SmallHeading>Who we are</SmallHeading><h2>Representation that considers the whole matter.</h2></div>
      <div className="rich-copy"><p>Keystone Law Firm, P.A. serves individuals, families and businesses across South Florida. Our work spans civil and commercial litigation, business and corporate law, real estate, family law, probate and guardianship, and disputes involving construction, financial matters, community associations and municipalities.</p>
      <p>We represent nonprofit and religious organizations and handle both litigation and transactional matters. The right legal approach begins with an understanding of the facts, the issues and the client's objectives.</p>
      <LinkArrow quiet to="/practice-areas">See our practice areas</LinkArrow></div>
    </div></section>
    <section className="firm-leadership section-pad"><div className="container">
      <div className="firm-leadership__head"><SmallHeading>Firm leadership</SmallHeading><p>The firm is owned and led by Frank Wolland alongside Lo Laughlin.</p></div>
      <Leaders/>
      <p className="firm-leadership__foot">Additional attorney information and approved portraits can be added when provided by the firm.</p>
    </div></section>
    <ContactBand/>
  </>;
}

function Insights(){
  return <>
    <PageHeading label="Resources" title="Legal information." description="Plain language introductions to selected legal topics and common questions. These resources are general information, not legal advice."/>
    <section className="resources-section section-pad"><div className="container">
      {articles.map((a,i)=><Link to={'/insights/'+a.slug} key={a.slug} className="resource-link">
        <span className="resource-link__category">{a.type}</span>
        <div><h2>{a.title}</h2><p>{a.summary}</p></div>
        <ArrowUpRight size={20} strokeWidth={1.5}/>
      </Link>)}
    </div></section>
    <ContactBand/>
  </>;
}

function Article(){
  const {slug}=useParams();const article=articles.find(a=>a.slug===slug);
  if(!article)return <NotFound/>;
  return <>
    <section className="article-header"><div className="container">
      <Link className="back-link" to="/insights"><ArrowLeft size={16}/> All resources</Link><span className="eyebrow">{article.type}</span>
      <h1>{article.title}</h1><p>{article.summary}</p>
    </div></section>
    <article className="article-content section-pad"><div className="container article-content__grid">
      <aside>General information only.<br/>Not legal advice.</aside>
      <div><p className="article-content__lead">The information below is intended to help you prepare for a conversation with an attorney.</p>
        {article.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}
        <div className="article-content__notice">This resource is educational and does not create an attorney client relationship or predict the outcome of any legal matter.</div>
        <LinkArrow quiet to="/insights">Back to resources</LinkArrow>
      </div>
    </div></article>
  </>;
}

function Contact(){
  return <>
    <PageHeading label="Contact" title="Get in touch." description="Reach Keystone Law Firm, P.A. in North Miami, Florida. For time sensitive legal matters, call the office directly."/>
    <section className="contact-page section-pad"><div className="container contact-page__grid">
      <div><SmallHeading>Contact information</SmallHeading><h2>Start a conversation.</h2><p>Contacting the firm does not establish an attorney client relationship. Please do not share confidential information until representation has been agreed.</p></div>
      <div className="contact-details">
        <div><span>Telephone</span><a href={firm.phoneHref}>{firm.phone}<ArrowUpRight size={19}/></a></div>
        <div><span>Office address</span><address>{firm.addressLine1}<br/>{firm.addressLine2}<br/>{firm.cityLine}</address><a className="contact-details__map" href={firm.directions} target="_blank" rel="noreferrer">View map and directions <ArrowUpRight size={17}/></a></div>
        <div><span>Service area</span><p>Miami and South Florida</p></div>
      </div>
    </div></section>
  </>;
}

function Disclaimer(){
  return <>
    <PageHeading label="Legal notice" title="Important information." description="Information about the content of this website and contacting the firm."/>
    <section className="legal-page section-pad"><div className="container">
      <div className="legal-page__body">
        <h2>General information</h2><p>This website provides general information about Keystone Law Firm, P.A. and selected legal matters. It does not constitute legal advice. Legal requirements and procedures may change and depend on the facts of each matter.</p>
        <h2>No attorney client relationship</h2><p>Visiting this website, reviewing its content, or contacting the firm does not create an attorney client relationship. Do not send sensitive or confidential information before the firm has expressly agreed to represent you.</p>
        <h2>No guarantees</h2><p>The website does not promise, predict, or guarantee any legal result. The services appropriate to a matter depend on its facts, law, and the terms of any engagement.</p>
        <h2>Privacy</h2><p>This site currently does not offer a web inquiry form or client account. Third party mapping and font providers may apply their own privacy policies. Website hosting may process standard request information.</p>
        <h2>Final review</h2><p>Practice areas, leadership descriptions, contact information and all advertising content should be approved by the firm before publication.</p>
      </div>
    </div></section>
  </>;
}

function NotFound(){
  return <section className="not-found"><div className="container"><h1>Page not found.</h1><p>We couldn't find the page you're looking for.</p><LinkArrow to="/">Return to homepage</LinkArrow></div></section>;
}

function Footer(){
  return <footer className="footer"><div className="container">
    <div className="footer__main">
      <div><Wordmark inverse/><p>Litigation and transactional legal counsel for individuals, families and businesses throughout South Florida.</p></div>
      <nav aria-label="Footer navigation">{navigation.map(item=><Link to={item.to} key={item.to}>{item.label}</Link>)}</nav>
      <div className="footer__contact"><span>North Miami office</span><address>{firm.addressLine1}<br/>{firm.addressLine2}<br/>{firm.cityLine}</address><a href={firm.phoneHref}>{firm.phone}</a></div>
    </div>
    <div className="footer__bottom"><span>© {new Date().getFullYear()} Keystone Law Firm, P.A.</span><Link to="/disclaimer">Legal notice & privacy</Link><span>Miami · South Florida</span></div>
    <p className="footer__disclaimer">For general information only. This website does not provide legal advice or create an attorney client relationship. Contact and advertising details are subject to firm approval.</p>
  </div></footer>;
}

export default function App(){
  return <><PageEffects/><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/practice-areas" element={<Practices/>}/>
      <Route path="/practice-areas/:slug" element={<PracticeDetail/>}/>
      <Route path="/our-firm" element={<Firm/>}/>
      <Route path="/insights" element={<Insights/>}/>
      <Route path="/insights/:slug" element={<Article/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/disclaimer" element={<Disclaimer/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </main><Footer/></>;
}
