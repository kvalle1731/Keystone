import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ArrowLeft, Menu, X, Phone, Plus, CornerDownRight } from 'lucide-react';
import { firm, practices, articles } from './data.js';

const groups = [
  { id: 'disputes', number: '01', name: 'Disputes & litigation', description: 'Representation when financial, commercial, and property matters become contested.', slugs: ['civil-commercial-litigation', 'construction-litigation', 'foreclosure-bankruptcy-litigation', 'condominium-hoa-disputes', 'contract-disputes-debt-collection', 'code-enforcement-zoning-municipal-law'] },
  { id: 'business', number: '02', name: 'Business & property', description: 'Counsel for business, organizational, real estate, and transactional matters.', slugs: ['business-corporate-law', 'real-estate-property-law', 'nonprofit-religious-organizations'] },
  { id: 'people', number: '03', name: 'Individuals & families', description: 'Considered guidance through significant personal and family decisions.', slugs: ['family-law-divorce', 'probate-estate-guardianship'] },
];
const nav = [['/practice-areas','Expertise'], ['/our-firm','Our firm'], ['/insights','Journal'], ['/contact','Contact']];

function KSymbol() {
  return <span className="k-symbol" aria-hidden="true"><span>K</span></span>;
}

function Brand({ invert=false }) {
  return <Link to="/" aria-label="Keystone Law Firm, P.A. home" className={'brand' + (invert ? ' brand--inverse' : '')}>
    <KSymbol />
    <span className="brand__copy"><strong>Keystone</strong><small>LAW FIRM, P.A.</small></span>
  </Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    const handleKey = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => { document.body.classList.remove('nav-open'); document.removeEventListener('keydown', handleKey); };
  }, [open]);
  return <>
    <div className="topline"><div className="frame topline__inner"><span>INDEPENDENT LEGAL COUNSEL</span><span>MIAMI · SOUTH FLORIDA</span></div></div>
    <header className="header">
      <div className="frame header__inner">
        <Brand />
        <nav className="header__nav" aria-label="Primary">
          {nav.map(([to, text],i) => <NavLink to={to} key={to} className={({isActive})=>isActive?'nav-link active':'nav-link'}><sup>0{i+1}</sup>{text}</NavLink>)}
        </nav>
        <Link className="header__call" to="/contact">Discuss a matter <ArrowUpRight size={18}/></Link>
        <button className="header__menu" type="button" aria-controls="mobile-menu" aria-expanded={open} aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<X size={27}/>:<Menu size={27}/>}</button>
      </div>
    </header>
    <div id="mobile-menu" className={'mobile-nav' + (open?' mobile-nav--open':'')} aria-hidden={!open}>
      <div className="frame mobile-nav__inner">
        <p className="eyebrow">THE INDEX</p>
        {[['/','Home'],...nav].map(([to,text],i) => <Link to={to} key={to} tabIndex={open?0:-1} onClick={()=>setOpen(false)}><span>0{i+1}</span><strong>{text}</strong><ArrowUpRight size={22}/></Link>)}
        <a href={firm.phoneHref} tabIndex={open?0:-1}>{firm.phone} · CALL THE OFFICE</a>
      </div>
    </div>
  </>;
}

function RouteEffects() {
  const {pathname}=useLocation();
  useEffect(()=>{
    window.scrollTo(0,0);
    let name='Keystone Law Firm, P.A.';
    let desc='Keystone Law Firm, P.A. represents individuals, families, and businesses throughout South Florida in litigation and transactional matters.';
    const practice=practices.find(p=>pathname==='/practice-areas/'+p.slug);
    const article=articles.find(a=>pathname==='/insights/'+a.slug);
    if(practice){ name=practice.title+' | '+name; desc=practice.intro; }
    else if(article){ name=article.title+' | '+name; desc=article.summary; }
    else if(pathname!=='/'){ const titles={'/our-firm':'Our Firm','/practice-areas':'Expertise','/insights':'Journal','/contact':'Contact','/disclaimer':'Legal Notice'};name=(titles[pathname]||'Page')+' | '+name; }
    document.title=name;
    document.querySelector('meta[name="description"]')?.setAttribute('content',desc);
  },[pathname]);
  return null;
}

function ArrowText({to,children,light=false}) {
  return <Link to={to} className={'arrow-text'+(light?' arrow-text--light':'')}><span>{children}</span><ArrowUpRight size={19} strokeWidth={1.5}/></Link>;
}

function SectionKicker({index,children,muted=false}) {
  return <p className={'section-kicker'+(muted?' section-kicker--muted':'')}><span>{index}</span><i/><strong>{children}</strong></p>;
}

function HomeHero(){
  return <section className="opening">
    <div className="frame opening__frame">
      <div className="opening__head"><span>LEGAL PRACTICE, RECONSIDERED</span><span>ISSUE 001 &nbsp; / &nbsp; EST. SOUTH FLORIDA</span></div>
      <div className="opening__core">
        <div className="opening__vertical"><span>KEYSTONE / LEGAL COUNSEL</span><span>01 — 05</span></div>
        <div className="opening__type">
          <span className="opening__small">FOR WHAT COMES NEXT.</span>
          <h1>Consider<br/><em>the whole</em><br/>picture<span className="opening__dot">.</span></h1>
          <div className="opening__bottom">
            <p>Litigation and transactional counsel for the decisions, disputes, and circumstances that shape your future.</p>
            <ArrowText to="/practice-areas">Explore the practice</ArrowText>
          </div>
        </div>
        <aside className="opening__aside">
          <div className="opening__seal" aria-hidden="true"><span>K</span><span>✳</span></div>
          <div className="opening__aside-bottom">
            <p className="eyebrow">AT THE INTERSECTION OF</p>
            <p>People.<br/>Property.<br/>Business.</p>
            <span>MIAMI, FLORIDA<br/>SERVING SOUTH FLORIDA</span>
          </div>
        </aside>
      </div>
      <div className="opening__foot"><span>REASONED. RESPONSIVE. PRESENT.</span><span>SCROLL TO DISCOVER ↓</span></div>
    </div>
  </section>;
}

function Intro() {
  return <section className="statement"><div className="frame statement__grid">
    <div><SectionKicker index="A">THE FIRM</SectionKicker><span className="statement__corner">✳</span></div>
    <div><p>Some situations need a litigator. Others need a careful negotiator. Often, <em>you need someone who sees both sides of the equation.</em></p>
      <div className="statement__tail"><p>Keystone Law Firm, P.A. works with individuals, families, and businesses throughout South Florida on matters involving disputes, transactions, property, and financial interests.</p><ArrowText to="/our-firm">Get to know Keystone</ArrowText></div>
    </div>
  </div></section>;
}

function PracticeDirectory({compact=false}) {
  const [active,setActive]=useState('all');
  const filtered=useMemo(()=>active==='all'?practices:practices.filter(p=>groups.find(g=>g.id===active)?.slugs.includes(p.slug)),[active]);
  return <div className="directory">
    <div className="directory__tabs" role="group" aria-label="Filter practice areas">
      <button type="button" className={active==='all'?'selected':''} onClick={()=>setActive('all')}>All matters <span>11</span></button>
      {groups.map(g=><button type="button" key={g.id} className={active===g.id?'selected':''} onClick={()=>setActive(g.id)}>{g.name}<span>{String(g.slugs.length).padStart(2,'0')}</span></button>)}
    </div>
    <div className="directory__grid">
      {filtered.map((p)=>{
        const n=practices.indexOf(p)+1;
        return <Link to={'/practice-areas/'+p.slug} className="directory__item" key={p.slug}>
          <div className="directory__item-top"><span>{String(n).padStart(2,'0')} / 11</span><ArrowUpRight size={23} strokeWidth={1.3}/></div>
          <h3>{p.title}</h3>
          <p>{p.short}</p>
          <div className="directory__item-foot"><span>{p.category}</span><span>VIEW AREA ↗</span></div>
        </Link>;
      })}
    </div>
    {compact && <div className="directory__more"><span>ELEVEN PRIMARY PRACTICE AREAS. ONE FIRM.</span><ArrowText to="/practice-areas">View the full index</ArrowText></div>}
  </div>;
}

function ExpertiseHome(){
  return <section className="expertise-home"><div className="frame">
    <SectionKicker index="B">LEGAL PRACTICE INDEX</SectionKicker>
    <div className="editorial-head"><h2>Work that<br/><em>matters.</em></h2><p>A broad practice with a close eye on the details. Explore Keystone's principal areas of representation.</p></div>
    <PracticeDirectory compact/>
  </div></section>;
}

function TwoModes() {
  return <section className="modes">
    <div className="frame"><SectionKicker index="C" muted>THE APPROACH</SectionKicker>
      <div className="modes__layout">
        <div className="modes__heading"><h2>Different<br/>questions.<br/><em>One clear view.</em></h2><span className="modes__mark" aria-hidden="true">✳</span></div>
        <div className="modes__ledger">
          <div className="modes__entry"><span>01 / WHEN THE MATTER IS CONTESTED</span><h3>Litigation</h3><p>From civil and commercial cases to construction, foreclosure, association, municipal and contract disputes, the focus is understanding what is at stake.</p><ArrowText light to="/practice-areas">Explore dispute work</ArrowText></div>
          <div className="modes__entry"><span>02 / WHEN THE DECISION IS FORWARD LOOKING</span><h3>Transactions</h3><p>Business and corporate matters, real estate and property interests, and organizational questions call for careful consideration before decisions are made.</p><ArrowText light to="/practice-areas">Explore advisory work</ArrowText></div>
        </div>
      </div>
    </div>
  </section>;
}

function Partners({home=false}) {
  return <section className="partners"><div className="frame">
    <SectionKicker index={home?'D':'02'}>PEOPLE AT KEYSTONE</SectionKicker>
    <div className="partners__head"><h2>Leadership,<br/><em>not a stock photo.</em></h2><p>The firm is led by two partners whose names deserve to be front and center. No invented portraits, biographies, or credentials.</p></div>
    <div className="partners__list">{firm.leadership.map((partner,i)=>
      <div className="partner" key={partner.name}>
        <div className="partner__number">0{i+1} / LEADERSHIP</div>
        <div className="partner__identity"><span className="partner__initials" aria-hidden="true">{partner.name.split(' ').map(x=>x.charAt(0)).join('')}</span><div><h3>{partner.name}</h3><p>{partner.role}</p></div></div>
        <p className="partner__desc">{partner.note}</p><span className="partner__star">✳</span>
      </div>)}
    </div>
    {home && <div className="partners__link"><ArrowText to="/our-firm">Our firm & leadership</ArrowText></div>}
  </div></section>;
}

function JournalList({limit=3}) {
  return <div className="journal-list">{articles.slice(0,limit).map((a,i)=>
    <Link className="journal-list__entry" key={a.slug} to={'/insights/'+a.slug}>
      <span>0{i+1}</span><div><span className="journal-list__type">{a.type} · {a.minutes}</span><h3>{a.title}</h3><p>{a.summary}</p></div><ArrowUpRight size={23} strokeWidth={1.3}/>
    </Link>)}</div>;
}

function JournalHome(){
  return <section className="journal-home"><div className="frame journal-home__grid">
    <div><SectionKicker index="E">THE READING ROOM</SectionKicker><h2>A little<br/><em>perspective.</em></h2><p>Clear information for complicated questions. These general guides are not a substitute for case specific legal advice.</p><ArrowText to="/insights">Browse the journal</ArrowText></div>
    <JournalList />
  </div></section>;
}

function ContactClose(){
  return <section className="contact-close"><div className="frame contact-close__grid">
    <div><p className="eyebrow">AN OPEN INVITATION</p><h2>Start with<br/><em>a conversation.</em></h2></div>
    <div className="contact-close__right"><p>Whether your matter is personal, commercial, or somewhere in between, the first step is a conversation about what you need.</p><ArrowText light to="/contact">Contact Keystone</ArrowText></div>
  </div></section>;
}

function Home() {
  return <><HomeHero/><Intro/><ExpertiseHome/><TwoModes/><Partners home/><JournalHome/><ContactClose/></>;
}

function PageHead({num,tag,first,second,copy,dark=false}) {
  return <section className={'page-head'+(dark?' page-head--dark':'')}><div className="frame">
    <div className="page-head__top"><Link to="/">← BACK TO HOME</Link><span>{tag} / {num}</span></div>
    <div className="page-head__bottom"><div><span className="eyebrow">{tag}</span><h1>{first}<br/><em>{second}</em></h1></div><p>{copy}</p></div>
  </div></section>;
}

function PracticePage(){
  return <><PageHead num="01" tag="EXPERTISE" first="The full" second="picture." copy="Eleven primary practice areas. Litigation and transactional representation for people, families, businesses, and organizations across South Florida."/>
    <section className="expertise-index"><div className="frame"><SectionKicker index="01">SELECT A PRACTICE AREA</SectionKicker><PracticeDirectory/></div></section><ContactClose/>
  </>;
}

function PracticeDetail(){
  const {slug}=useParams();const p=practices.find(x=>x.slug===slug);if(!p)return <NotFound/>;
  const n=practices.indexOf(p)+1;
  const next=practices[n%practices.length];
  return <>
    <section className="practice-hero"><div className="frame"><div className="practice-hero__top"><Link to="/practice-areas"><ArrowLeft size={15}/> EXPERTISE INDEX</Link><span>{String(n).padStart(2,'0')} / 11</span></div>
      <p className="eyebrow">{p.category}</p><h1>{p.title}</h1><div className="practice-hero__base"><p>{p.intro}</p><span>KEYSTONE / SOUTH FLORIDA</span></div>
    </div></section>
    <section className="practice-body"><div className="frame practice-body__grid">
      <aside><SectionKicker index="01">THE MATTER</SectionKicker><h2>{p.headline}</h2><p>{p.note}</p></aside>
      <div><p className="eyebrow">ISSUES WE CAN DISCUSS</p><div className="issue-list">{p.scope.map((s,i)=><div key={s}><span>0{i+1}</span><h3>{s}</h3><Plus size={16}/></div>)}</div><p className="practice-body__notice">Scope and availability of representation depend on the facts and any engagement with the firm. Website information is not legal advice.</p><ArrowText to="/contact">Speak with the firm</ArrowText></div>
    </div></section>
    <section className="next-matter"><div className="frame"><span>CONTINUE READING / NEXT AREA</span><Link to={'/practice-areas/'+next.slug}>{next.title}<ArrowUpRight size={25}/></Link></div></section>
    <ContactClose/>
  </>;
}

function FirmPage(){
  return <>
    <PageHead num="02" tag="OUR FIRM" first="People before" second="the paperwork." copy="Miami-based counsel serving South Florida. Built around informed decisions, careful preparation, and the particulars of every matter." dark/>
    <section className="firm-intro"><div className="frame firm-intro__grid"><SectionKicker index="01">THE PRACTICE</SectionKicker><div><h2>A broader view of<br/><em>what is at stake.</em></h2>
      <p>Keystone Law Firm, P.A. serves individuals, families, and businesses throughout South Florida. The firm handles both litigation and transactional matters, including complex commercial, financial, property, and family related concerns.</p>
      <p>Its practice encompasses civil and commercial litigation, business and corporate law, real estate, family matters, probate and guardianship, construction and association disputes, financial litigation, municipal matters, and nonprofit and religious organization representation.</p>
      <p>Keystone is owned and led by Frank Wolland, Head Partner, alongside Managing Partner Lo Laughlin.</p>
    </div></div></section>
    <Partners/>
    <section className="firm-bridge"><div className="frame"><span className="eyebrow">THE DISTINCTION</span><h2>Both sides<br/>of the <em>equation.</em></h2><p>Disputes and transactions require different methods of thinking. Clients benefit from counsel that considers the practical implications as well as the legal questions.</p><ArrowText to="/practice-areas">Explore what we do</ArrowText></div></section>
    <ContactClose/>
  </>;
}

function InsightsPage(){
  return <><PageHead num="03" tag="THE JOURNAL" first="Knowledge is" second="a starting point." copy="Plain language resources for informed conversations. General education, never a prediction about the result of a particular matter."/>
    <section className="journal-page"><div className="frame"><SectionKicker index="01">LATEST NOTES</SectionKicker><JournalList limit={articles.length}/></div></section><ContactClose/>
  </>;
}

function ArticlePage(){
  const {slug}=useParams();const a=articles.find(x=>x.slug===slug);if(!a)return <NotFound/>;
  return <><section className="article-hero"><div className="frame"><Link to="/insights" className="article-back"><ArrowLeft size={16}/> RETURN TO JOURNAL</Link>
    <p className="eyebrow">{a.type} &nbsp; / &nbsp; {a.minutes}</p><h1>{a.title}</h1><p>{a.summary}</p>
  </div></section>
  <article className="article-content"><div className="frame article-content__grid">
    <aside><strong>KEYSTONE JOURNAL</strong><span>FOR GENERAL INFORMATION ONLY</span></aside>
    <div><p className="article-content__lead">This resource is educational and is not legal advice. An attorney must evaluate the specific facts of your situation.</p>
      {a.sections.map((s,i)=><section key={s.heading}><span className="eyebrow">0{i+1} / {String(a.sections.length).padStart(2,'0')}</span><h2>{s.heading}</h2><p>{s.text}</p></section>)}
      <div className="article-content__note">Reading this article or contacting the firm does not establish an attorney-client relationship.</div><ArrowText to="/insights">Back to journal</ArrowText>
    </div>
  </div></article><ContactClose/></>;
}

function ContactPage(){
  return <><PageHead num="04" tag="CONTACT" first="Let's start" second="with the facts." copy="Contact Keystone about a legal matter. Do not send confidential information until an attorney-client relationship has been established." dark/>
  <section className="contact-info"><div className="frame">
    <div className="contact-info__row"><span>01 / CALL</span><div><h2>{firm.phone}</h2><p>For time sensitive legal matters, please call.</p></div><a href={firm.phoneHref} aria-label={'Call '+firm.phone}><Phone size={24}/></a></div>
    <div className="contact-info__row"><span>02 / VISIT</span><div><h2>{firm.addressLine1}<br/>{firm.addressLine2}</h2><p>{firm.cityLine} · Serving South Florida</p></div><a href={firm.directions} target="_blank" rel="noreferrer" aria-label="Get office directions"><ArrowUpRight size={27}/></a></div>
    <div className="contact-info__row contact-info__row--small"><span>03 / PLEASE NOTE</span><p>Contacting Keystone does not establish an attorney-client relationship. Please confirm office details and appointment availability directly before visiting. Do not send confidential documents unless instructed by the firm.</p></div>
  </div></section>
  <section className="contact-end"><div className="frame"><span>BASED IN MIAMI</span><h2>Here for<br/><em>South Florida.</em></h2><a href={firm.directions} target="_blank" rel="noreferrer">OPEN MAP DIRECTIONS <ArrowUpRight size={17}/></a></div></section>
  </>;
}

function Disclaimer(){
  return <><PageHead num="05" tag="LEGAL NOTICE" first="The important" second="details." copy="Legal notices and limitations concerning the information contained on this website."/>
    <section className="disclaimer"><div className="frame"><div className="disclaimer__content">
      <h2>Information, not legal advice</h2><p>This site contains general information about Keystone Law Firm, P.A. and legal topics. It is not a substitute for advice from a lawyer familiar with your particular circumstances. Laws and rules may change.</p>
      <h2>No attorney-client relationship</h2><p>Using this website, calling the firm, or making an inquiry does not establish an attorney-client relationship. Do not send confidential information until representation has been expressly agreed.</p>
      <h2>No guarantees</h2><p>The description of practice areas and possible legal issues is not a promise about the availability or result of representation. Outcomes depend on facts, law, and circumstances.</p>
      <h2>Privacy and third parties</h2><p>This website currently does not include a contact form or client portal. External mapping services and fonts may be subject to the privacy practices of their providers. Hosting may process standard technical request information.</p>
      <h2>Accuracy</h2><p>Before public launch, the firm should approve its leadership descriptions, attorney advertising content, address and phone number, and any required disclosures.</p>
      <ArrowText to="/contact">Contact Keystone</ArrowText>
    </div></div></section>
  </>;
}

function NotFound(){
  return <section className="not-found"><div className="frame"><span className="eyebrow">404 / NOT FOUND</span><h1>That page isn't<br/><em>in the index.</em></h1><ArrowText to="/">Back to Keystone</ArrowText></div></section>;
}

function Footer(){
  return <footer className="footer"><div className="frame">
    <div className="footer__top"><Brand invert/><p>Legal counsel for the decisions, disputes, and circumstances that shape what comes next.</p><div><strong>DIRECTORY</strong>{nav.map(([to,t])=><Link to={to} key={to}>{t}</Link>)}</div><div><strong>OFFICE</strong><address>{firm.addressLine1}<br/>{firm.addressLine2}<br/>{firm.cityLine}</address><a href={firm.phoneHref}>{firm.phone}</a></div></div>
    <div className="footer__word" aria-hidden="true">KEYSTONE<span>✳</span></div>
    <div className="footer__bottom"><span>© {new Date().getFullYear()} KEYSTONE LAW FIRM, P.A.</span><Link to="/disclaimer">LEGAL NOTICE & PRIVACY</Link><a href="#top" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}}>BACK TO TOP ↑</a></div>
    <p className="footer__fineprint">General information only, not legal advice. Contacting the firm does not create an attorney-client relationship. Final content and contact details are subject to the firm's review before launch.</p>
  </div></footer>;
}

export default function App(){
  return <><RouteEffects/><div id="top"/><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main">
    <Routes><Route path="/" element={<Home/>}/><Route path="/practice-areas" element={<PracticePage/>}/><Route path="/practice-areas/:slug" element={<PracticeDetail/>}/><Route path="/our-firm" element={<FirmPage/>}/><Route path="/insights" element={<InsightsPage/>}/><Route path="/insights/:slug" element={<ArticlePage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="/disclaimer" element={<Disclaimer/>}/><Route path="*" element={<NotFound/>}/></Routes>
  </main><Footer/></>;
}
