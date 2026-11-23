export const firm = {
  name: 'Keystone Law Firm, P.A.',
  location: 'North Miami, Florida',
  addressLine1: '12865 West Dixie Highway',
  addressLine2: 'Second Floor',
  cityLine: 'North Miami, FL 33161',
  phone: '(305) 899-8588',
  phoneHref: 'tel:+13058998588',
  directions: 'https://www.google.com/maps/search/?api=1&query=12865+West+Dixie+Highway+North+Miami+FL+33161',
};

// Practice areas are based on a 2026 Keystone recruiting listing.
// The firm should verify each description, current availability, attorney roster,
// and all contact details before publishing the website.
export const practices = [
  {
    slug: 'civil-litigation',
    title: 'Civil Litigation',
    short: 'Disputes deserve a considered strategy, not a one-size-fits-all response.',
    category: 'Dispute resolution',
    headline: 'A clear approach to complex disputes.',
    intro: 'When a dispute begins to affect your business, property, or daily life, understanding the process and the options available matters.',
    scope: ['Pre-suit analysis and dispute assessment', 'Civil claims and defense matters', 'Negotiation and settlement considerations', 'Court proceedings and litigation support'],
    note: 'Every dispute turns on its own facts, applicable law, and procedural posture.'
  },
  {
    slug: 'family-law',
    title: 'Family Law',
    short: 'Thoughtful guidance for decisions that are both legal and deeply personal.',
    category: 'Individuals & families',
    headline: 'Careful counsel for personal turning points.',
    intro: 'Family matters can involve significant personal, financial, and practical questions. A clear understanding of the issues can make the next decision more manageable.',
    scope: ['Divorce and related proceedings', 'Parenting and time-sharing questions', 'Support and financial arrangements', 'Family-related legal disputes'],
    note: 'The appropriate path will depend on your family circumstances and Florida law.'
  },
  {
    slug: 'probate-guardianship',
    title: 'Probate & Guardianship',
    short: 'Helping families understand responsibilities, processes, and next steps.',
    category: 'Estate matters',
    headline: 'Clarity when responsibility matters most.',
    intro: 'Probate and guardianship questions often arise during periods of transition. Understanding roles, obligations, and legal procedures is an important first step.',
    scope: ['Probate administration questions', 'Estate and fiduciary considerations', 'Guardianship proceedings', 'Court-supervised family matters'],
    note: 'This is general information and not an assessment of any estate or guardianship matter.'
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    short: 'Legal perspective for property matters and consequential transactions.',
    category: 'Property & transactions',
    headline: 'Move forward with the details in view.',
    intro: 'Property issues often involve overlapping contractual, financial, and procedural concerns. Reviewing the details early can help clarify available options.',
    scope: ['Real estate disputes', 'Contract and document review questions', 'Property ownership matters', 'Transaction-related legal issues'],
    note: 'Specific representation and services should be confirmed directly with the firm.'
  },
  {
    slug: 'general-litigation',
    title: 'General Litigation',
    short: 'An organized response to disputes with real consequences.',
    category: 'Dispute resolution',
    headline: 'Understand the issues. Assess the path.',
    intro: 'Litigation can raise difficult questions about timing, exposure, evidence, and available remedies. A considered approach starts with the specifics.',
    scope: ['Initial case assessments', 'Claims and defenses', 'Negotiation and dispute resolution', 'Civil court proceedings'],
    note: 'Case strategy and outcomes always depend on the facts and law.'
  },
];

export const articles = [
  {
    slug: 'preparing-for-a-consultation',
    type: 'CLIENT GUIDE',
    title: 'How to prepare for your first legal consultation',
    summary: 'A little organization can help make your first conversation more useful.',
    minutes: '3 MIN READ',
    sections: [
      { heading: 'Start with a short timeline', text: 'Write down the significant dates, events, and people involved in your situation. A concise chronology can make it easier to explain the matter.' },
      { heading: 'Gather the documents you already have', text: 'Depending on the issue, these may include agreements, court notices, correspondence, property records, or other relevant records. Do not alter or discard documents.' },
      { heading: 'Know what you want to ask', text: 'Bring questions about possible approaches, timelines, expected costs, and what information may be needed next.' },
      { heading: 'Be candid about the facts', text: 'An attorney can assess a matter more accurately when the discussion includes difficult details, not just the favorable ones.' },
    ],
  },
  {
    slug: 'understanding-civil-litigation',
    type: 'LEGAL BASICS',
    title: 'Civil litigation: understanding the general stages',
    summary: 'A practical overview of what happens after a civil dispute becomes a legal proceeding.',
    minutes: '4 MIN READ',
    sections: [
      { heading: 'Before a lawsuit', text: 'Many disputes begin with communication, document review, demand letters, or possible negotiation. A lawsuit is not the only potential avenue.' },
      { heading: 'Pleadings and responses', text: 'A civil case typically begins with formal filings that describe allegations and responses. Court rules and deadlines vary with the matter.' },
      { heading: 'Information gathering', text: 'Discovery is a stage in which parties may exchange documents, request information, and take testimony under applicable rules.' },
      { heading: 'Resolution', text: 'Cases may resolve through settlement, motion practice, trial, or other procedures. The most appropriate path depends on the circumstances.' },
    ],
  },
  {
    slug: 'probate-questions',
    type: 'CLIENT GUIDE',
    title: 'Questions families often ask about probate',
    summary: 'Understanding the terminology and responsibilities can make a difficult process clearer.',
    minutes: '3 MIN READ',
    sections: [
      { heading: 'What is probate?', text: 'Probate is a court-supervised legal process that may be required to administer a deceased person’s estate. Requirements depend on the assets and circumstances.' },
      { heading: 'Who has responsibility?', text: 'A personal representative, when appointed, generally has duties to the estate under applicable law and court supervision.' },
      { heading: 'Does every estate use the same process?', text: 'No. Different procedures may apply depending on the estate and Florida legal requirements.' },
      { heading: 'Why get individualized guidance?', text: 'Questions about creditors, beneficiaries, deadlines, and property can be fact-specific. General reading cannot replace legal advice for a particular estate.' },
    ],
  },
];
