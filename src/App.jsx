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
    const titles={'/':'Keystone Law Firm, P.A. | Miami & South Florida','/practice-areas':'Practice Areas | Keystone Law Firm','/our-firm':'Our Firm | Keystone Law Firm','/insights':'Resources | Keystone Law Firm','/contact':'Contact | Keystone Law Firm','/disclaimer':'Legal Notice | Keystone Law Firm','/privacy':'Privacy Policy | Keystone Law Firm','/terms':'Terms of Use | Keystone Law Firm','/accessibility':'Accessibility | Keystone Law Firm'};
    const pageTitle=practice?practice.title+' | Keystone Law Firm':article?article.title+' | Keystone Law Firm':titles[pathname]||'Keystone Law Firm, P.A.';
    document.title=pageTitle;
    const policyDescriptions={'/disclaimer':'Keystone Law Firm legal notice and attorney advertising disclosures, including prospective client communications and no guarantee of results.','/privacy':'How Keystone Law Firm website data and initial inquiries may be handled, including Vercel hosting and Google Fonts.','/terms':'Website terms and conditions for use of Keystone Law Firm online information and third party services.','/accessibility':'Keystone Law Firm website accessibility information and how to request assistance.'};
    const desc=practice?.intro||article?.summary||policyDescriptions[pathname]||'Keystone Law Firm, P.A. serves individuals, families and businesses throughout South Florida in litigation and transactional matters.';
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
      <div><SmallHeading>Contact information</SmallHeading><h2>Start a conversation.</h2><p>Contacting the firm does not establish an attorney client relationship. Please do not share confidential information until representation has been agreed. <Link to="/disclaimer">Read our legal notice</Link> and <Link to="/privacy">privacy policy</Link> before sharing information.</p></div>
      <div className="contact-details">
        <div><span>Telephone</span><a href={firm.phoneHref}>{firm.phone}<ArrowUpRight size={19}/></a></div>
        <div><span>Office address</span><address>{firm.addressLine1}<br/>{firm.addressLine2}<br/>{firm.cityLine}</address><a className="contact-details__map" href={firm.directions} target="_blank" rel="noreferrer">View map and directions <ArrowUpRight size={17}/></a></div>
        <div><span>Service area</span><p>Miami and South Florida</p></div>
      </div>
    </div></section>
  </>;
}


const policyUpdated = 'November 24, 2026';

function PolicyLayout({label,title,description,sections}) {
  return <>
    <PageHeading label={label} title={title} description={description}/>
    <section className="policy-page section-pad"><div className="container policy-page__layout">
      <aside className="policy-page__side">
        <span className="eyebrow">WEBSITE POLICIES</span>
        <p className="policy-page__date">Last updated<br/><strong>{policyUpdated}</strong></p>
        <nav aria-label={label + ' sections'}>
          {sections.map(section=><a key={section.id} href={'#'+section.id}>{section.title}</a>)}
        </nav>
        <div className="policy-page__side-contact">
          <span>Keystone Law Firm, P.A.</span>
          <p>{firm.addressLine1}<br/>{firm.addressLine2}<br/>{firm.cityLine}</p>
          <a href={firm.phoneHref}>{firm.phone}</a>
        </div>
      </aside>
      <div className="policy-page__main">
        {sections.map((section,i)=><section key={section.id} id={section.id} className="policy-section">
          <span className="policy-section__index">{String(i+1).padStart(2,'0')}</span>
          <h2>{section.title}</h2>
          <div className="policy-section__copy">{section.body}</div>
        </section>)}
      </div>
    </div></section>
  </>;
}

function Disclaimer() {
  const sections=[
    {id:'firm-identity',title:'The firm and this website',body:<>
      <p>This website is published for Keystone Law Firm, P.A., a Florida law firm with an office listed at {firm.addressLine1}, {firm.addressLine2}, {firm.cityLine}. The firm serves individuals, families, businesses, and organizations throughout South Florida. The office may be contacted at <a href={firm.phoneHref}>{firm.phone}</a>.</p>
      <p>Descriptions of practice areas explain the types of legal matters the firm identifies as part of its practice. They do not establish that any particular attorney is available, authorized to act in a particular jurisdiction, or able to accept a specific engagement.</p>
    </>},
    {id:'information-not-advice',title:'General information is not legal advice',body:<>
      <p>Materials on this site, including practice descriptions and resource articles, are provided for general informational purposes. They do not constitute legal advice, a legal opinion, or a recommendation concerning the particular facts of your situation.</p>
      <p>Applicable laws, court procedures, and deadlines change. Do not act or refrain from acting on the basis of website content without obtaining advice from a qualified lawyer who has reviewed the relevant circumstances.</p>
    </>},
    {id:'relationship',title:'No attorney client relationship',body:<>
      <p>Viewing this site, placing a telephone call, requesting information, or otherwise contacting Keystone does not, by itself, establish an attorney client relationship or obligate the firm to represent you. Representation requires the firm's agreement to accept the matter following any necessary conflict review and an appropriate engagement arrangement.</p>
      <p>Until Keystone confirms that it represents you, you remain responsible for protecting your own legal rights, preserving evidence, and meeting any applicable deadlines.</p>
    </>},
    {id:'communications',title:'Unsolicited communications and confidentiality',body:<>
      <p>Do not send confidential, privileged, financial, or highly sensitive information in an initial unsolicited communication. First provide only enough general information to allow the office to respond and consider whether a conflict check or consultation is appropriate.</p>
      <p>An unsolicited message does not necessarily create a duty of confidentiality. Legal duties may nevertheless arise when a lawyer agrees to discuss or consider potential representation under the Rules Regulating The Florida Bar. The treatment of information depends on the nature of the communication and applicable law; this notice does not limit any duties that the law imposes.</p>
      <p>For urgent deadlines, contact an attorney promptly. A website visit or message does not pause any filing or response deadline.</p>
    </>},
    {id:'advertising',title:'Attorney advertising and professional information',body:<>
      <p>This website is information about legal services and may constitute attorney advertising under the Rules Regulating The Florida Bar. The firm's publicly identified leadership is Frank Wolland, Head Partner, and Lo Laughlin, Managing Partner.</p>
      <p>Practice area listings do not represent that an attorney is board certified, a specialist, or an expert, and they do not imply approval or endorsement by The Florida Bar. Any attorney's admission, eligibility, and ability to undertake a matter should be verified for the jurisdiction involved.</p>
    </>},
    {id:'results',title:'No promise of results',body:<>
      <p>No outcome, recovery, settlement, judgment, or timeframe is promised or guaranteed. The result of any matter depends on its facts, the law, procedural developments, the parties, and many other factors.</p>
      <p>The absence of an advertised fee does not mean legal services are free. Fees, expenses, and the scope of any representation are addressed directly with the firm and governed by the applicable engagement agreement.</p>
    </>},
    {id:'jurisdiction',title:'Jurisdiction and geographic scope',body:<>
      <p>Keystone is based in North Miami, Florida, and describes services for clients throughout South Florida. Information on this site is not an offer by an attorney to practice where that attorney is not authorized to do so.</p>
      <p>Legal issues involving other states, countries, or federal forums may require separate jurisdictional analysis or counsel appropriately admitted to practice there.</p>
    </>},
    {id:'third-party',title:'External links and website availability',body:<>
      <p>This site may link to third party resources, such as directions provided through Google Maps. The firm does not control those websites, and links do not necessarily constitute endorsement of their content or practices.</p>
      <p>Website content can be revised, corrected, or removed without advance notice. Access to the website may occasionally be interrupted by maintenance, technical conditions, or hosting services.</p>
    </>},
    {id:'notice-contact',title:'Questions about this notice',body:<>
      <p>For questions about the firm, contact <a href={firm.phoneHref}>{firm.phone}</a> or consult the <Link to="/contact">Contact page</Link>. Information about website data is available in the <Link to="/privacy">Privacy Policy</Link>, and rules for use of the site appear in the <Link to="/terms">Terms of Use</Link>.</p>
    </>}
  ];
  return <PolicyLayout label="Legal notice" title="Legal notice & disclosures." description="Important information about Keystone's website, attorney advertising, legal advice, prospective clients, and representation." sections={sections}/>;
}

function PrivacyPolicy() {
  const sections=[
    {id:'privacy-scope',title:'Who this policy covers',body:<>
      <p>Keystone Law Firm, P.A. provides this notice about personal information associated with use of this public website and initial communications with the firm. The website lists the North Miami office at {firm.addressLine1}, {firm.addressLine2}, {firm.cityLine}; telephone <a href={firm.phoneHref}>{firm.phone}</a>.</p>
      <p>This notice concerns the public website, not necessarily every record or process used in a client engagement. Client and case records may be subject to additional professional, legal, and contractual obligations.</p>
    </>},
    {id:'information-collected',title:'Information that may be collected',body:<>
      <p><strong>Information you choose to provide.</strong> This site's current public interface does not include a contact form, online client account, live chat, or document upload. If you telephone the firm, you may choose to provide your name, contact details, and a general description of your inquiry. Any information received through a telephone consultation or subsequent representation may be handled as part of the firm's intake and legal operations.</p>
      <p><strong>Technical request information.</strong> When you access a page, the hosting and delivery infrastructure may process information such as your IP address, device or browser type, requested page, approximate location derived from IP address, request time, and security or diagnostic data needed to serve and protect the site.</p>
    </>},
    {id:'service-providers',title:'Hosting, fonts, and outside services',body:<>
      <p><strong>Vercel.</strong> The website is deployed using Vercel. Hosting and security systems may process website request and diagnostic information. For Vercel's own published practices, see <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Vercel's Privacy Notice <ArrowUpRight size={14}/></a>.</p>
      <p><strong>Google Fonts.</strong> The website currently requests its display fonts through Google's hosted font service. When those resources load, a visitor's browser contacts Google's servers and may transmit technical request information, including the IP address. For details, see <a href="https://developers.google.com/fonts/faq/privacy" target="_blank" rel="noreferrer">Google Fonts and privacy <ArrowUpRight size={14}/></a>.</p>
      <p><strong>Google Maps.</strong> The Contact page provides an external directions link. Google Maps opens only when you choose to follow the link and is subject to Google's own policies.</p>
    </>},
    {id:'cookies-tracking',title:'Cookies, analytics, and advertising',body:<>
      <p>The current website source does not include a firm operated analytics SDK, advertising pixel, online behavioral advertising script, or marketing consent form. The website does not currently contain a client login that sets an account session.</p>
      <p>That source code observation should not be interpreted as a guarantee that no hosting, browser, or third party security technology may use cookies or similar identifiers. Browser settings can generally be used to manage or block cookies. If new analytics, advertising, or intake tools are introduced, this notice should be updated to describe their actual operation and any required choices.</p>
    </>},
    {id:'purposes',title:'How information may be used',body:<>
      <p>Website technical information may be processed to deliver pages, keep the site working, troubleshoot errors, understand and prevent malicious activity, and meet applicable legal requirements. Information voluntarily provided when contacting the firm may be used to respond to the inquiry, determine whether a consultation is appropriate, and carry out any necessary conflict screening or agreed legal services.</p>
      <p>Nothing in this notice authorizes use or disclosure of information in a manner inconsistent with the firm's professional duties.</p>
    </>},
    {id:'disclosures',title:'When information may be disclosed',body:<>
      <p>Technical website data may be processed by providers involved in hosting, font delivery, and security as described above. Information received by the firm may be disclosed as necessary to respond to an inquiry, operate the firm, comply with law or a lawful process, or provide legal services when authorized, subject to applicable professional obligations.</p>
      <p>No customer database, advertising audience, or sale of visitor information has been identified in the current website code. The firm's broader business practices and any future integrations should be separately reviewed before making a categorical promise about all personal information.</p>
    </>},
    {id:'retention-security',title:'Retention and security',body:<>
      <p>Technical records may be retained by hosting and service providers according to their applicable settings and policies. Information obtained through direct communications or legal representation may need to be maintained for operational, legal, regulatory, or professional reasons. No specific retention period for every category of information is represented here.</p>
      <p>Website and service providers use technical and organizational protections, but no internet transmission or electronic storage method is guaranteed to be completely secure. Avoid sending sensitive documents through an unapproved channel.</p>
    </>},
    {id:'privacy-choices',title:'Your choices and inquiries',body:<>
      <p>You may choose not to provide information beyond what is necessary to browse this site. You can control browser settings and decide whether to open third party links. Depending on your location and the laws that apply, you may have rights to request access, correction, deletion, or other treatment of personal information, subject to legal and professional exceptions.</p>
      <p>To ask about personal information in the firm's possession or to raise a privacy concern, call <a href={firm.phoneHref}>{firm.phone}</a>. The office may need to verify your identity before responding to a request.</p>
    </>},
    {id:'children-and-changes',title:'Children and policy changes',body:<>
      <p>This website is intended to provide general legal information and is not directed to children as a consumer service. It does not provide accounts or request children's information through a web form.</p>
      <p>This notice may change to reflect changes in the website, third party services, or applicable law. The revised policy will show its update date. Review the <Link to="/disclaimer">Legal Notice</Link> and <Link to="/terms">Terms of Use</Link> for related website information.</p>
    </>}
  ];
  return <PolicyLayout label="Privacy policy" title="Your privacy matters." description="What Keystone's public website currently does, which third party services it loads, and how website and inquiry data may be handled." sections={sections}/>;
}

function TermsOfUse() {
  const sections=[
    {id:'acceptance',title:'About these terms',body:<>
      <p>These terms describe use of Keystone Law Firm, P.A.'s public website. The website is intended to help visitors learn about the firm, its practice areas, and ways to get in touch. If you do not wish to use the site under these terms, please discontinue use.</p>
      <p>Nothing here modifies any signed engagement letter or other agreement for legal representation. If a conflict arises, the applicable client agreement and governing professional requirements control the representation.</p>
    </>},
    {id:'permitted-use',title:'Permitted website use',body:<>
      <p>You may access and use the public pages for lawful personal or business informational purposes. You must not interfere with the site's functioning, attempt unauthorized access, knowingly introduce malicious software, impersonate another person, or use the site unlawfully.</p>
    </>},
    {id:'not-legal-advice',title:'No legal advice or representation',body:<>
      <p>Website content is general information only. It does not create an attorney client relationship, provide individualized legal advice, guarantee a result, or constitute an offer to represent you. See the <Link to="/disclaimer">Legal Notice</Link> for additional information about confidential communications, professional responsibility, and deadlines.</p>
    </>},
    {id:'intellectual-property',title:'Site content and permitted sharing',body:<>
      <p>Text, visual design, names, and other materials may be protected by copyright, trademark, or other rights held by the firm or their respective owners. You may view the site and make limited copies for personal reference as permitted by law. Reproduction for commercial publication or use of Keystone's name to imply endorsement requires appropriate permission.</p>
      <p>Third party fonts, icons, and linked materials remain subject to their respective licenses and terms.</p>
    </>},
    {id:'accuracy',title:'Accuracy and availability',body:<>
      <p>The firm aims to keep information useful, but materials may become incomplete or outdated. The availability of services, deadlines, or requirements for any legal matter cannot be determined from a public website alone.</p>
      <p>The firm may correct, update, or withdraw content and website features as necessary. Temporary interruptions may occur.</p>
    </>},
    {id:'external-links',title:'Links and third party services',body:<>
      <p>External resources, including mapping and font services, are operated by third parties. Keystone is not responsible for third party content or for changes in those providers' terms or privacy practices. An external link does not itself constitute an endorsement.</p>
    </>},
    {id:'limitations',title:'Responsibility and applicable law',body:<>
      <p>Use of the website is at your own discretion. To the extent permitted by applicable law, Keystone does not promise that the public site will always be available, uninterrupted, or free of technical errors. These terms do not disclaim or limit rights, obligations, or professional duties that cannot lawfully be waived.</p>
      <p>Florida law may govern website related matters to the extent applicable, without overriding any mandatory law or rules of professional conduct.</p>
    </>},
    {id:'contact-and-updates',title:'Changes and questions',body:<>
      <p>These terms may be revised as the site or applicable law changes. The date above identifies this version. For questions, contact Keystone at <a href={firm.phoneHref}>{firm.phone}</a> or review the <Link to="/contact">Contact page</Link>. See also the <Link to="/privacy">Privacy Policy</Link>.</p>
    </>}
  ];
  return <PolicyLayout label="Terms of use" title="Website terms of use." description="Conditions for browsing and using Keystone's public website, including third party resources and the relationship between website content and legal representation." sections={sections}/>;
}

function Accessibility() {
  const sections=[
    {id:'accessibility-commitment',title:'Accessible information',body:<>
      <p>Keystone Law Firm, P.A. aims to make its public website usable by people with a broad range of abilities and assistive technologies. The site is designed with text based navigation, descriptive links, keyboard operable navigation, and responsive layouts.</p>
      <p>This statement does not claim that the site has been independently audited or certified as conforming to a specific accessibility standard.</p>
    </>},
    {id:'accessibility-help',title:'Need assistance?',body:<>
      <p>If any information or feature is difficult for you to access, please call <a href={firm.phoneHref}>{firm.phone}</a>. Tell the office which page or feature created the difficulty and what alternative format or assistance would help. The firm can discuss available options for accessing the information.</p>
    </>},
    {id:'accessibility-third-party',title:'Third party content and updates',body:<>
      <p>Links to outside services such as maps lead to websites Keystone does not control. Their accessibility features may differ.</p>
      <p>Feedback about the accessibility of this website may be considered in future updates. For other website policies, see our <Link to="/privacy">Privacy Policy</Link>, <Link to="/terms">Terms of Use</Link>, and <Link to="/disclaimer">Legal Notice</Link>.</p>
    </>}
  ];
  return <PolicyLayout label="Accessibility" title="Accessibility statement." description="Information about accessibility, assistance, and how to report a problem using Keystone's website." sections={sections}/>;
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
    <div className="footer__bottom"><span>© {new Date().getFullYear()} Keystone Law Firm, P.A.</span><nav className="footer__legal-nav" aria-label="Website policies"><Link to="/disclaimer">Legal notice</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/accessibility">Accessibility</Link></nav><span>North Miami · South Florida</span></div>
    <p className="footer__disclaimer">Attorney advertising. General information only, not legal advice. Use of this site or an unsolicited inquiry does not by itself establish an attorney client relationship. Do not send confidential information before the firm has agreed to discuss representation.</p>
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
      <Route path="/privacy" element={<PrivacyPolicy/>}/>
      <Route path="/terms" element={<TermsOfUse/>}/>
      <Route path="/accessibility" element={<Accessibility/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </main><Footer/></>;
}
