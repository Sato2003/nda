export const NDA_TEMPLATES = [
  {
    label: 'Unilateral NDA',
    shortLabel: 'UNI',
    level: 'Standard',
    category: 'One-way disclosure',
    desc: 'One party shares confidential material while the other is bound to protect and return it.',
    highlight: 'Clear protection for one-sided disclosures and handoffs.',
    bestFor: 'Vendor onboarding, demos, product evaluations',
    clauses: ['Single discloser', 'Return of materials', 'Limited-use terms'],
    colors: {
      accent: '#2563eb',
      soft: '#dbeafe',
      border: '#93c5fd',
      ink: '#1d4ed8',
    },
    document: {
      agreementTitle: 'UNILATERAL NON-DISCLOSURE AGREEMENT',
      purpose:
        'This Unilateral Non-Disclosure Agreement is used when one party discloses sensitive business, technical, financial, or operational information to another party solely for evaluating or supporting a defined business purpose.',
      definition:
        'Confidential Information includes all non-public materials supplied by the Disclosing Party, including product plans, pricing, customer data, source materials, methods, prototypes, and any information a reasonable person would understand to be confidential.',
      obligations: [
        'Use the Confidential Information only for the approved evaluation or business purpose described by the Disclosing Party.',
        'Protect the Confidential Information with at least the same degree of care used for the Receiving Party\'s own sensitive information.',
        'Limit access to employees, advisers, and representatives who have a strict need to know and who are bound by similar confidentiality duties.',
      ],
      exclusions: [
        'Information that becomes public without breach by the Receiving Party.',
        'Information already lawfully known by the Receiving Party before disclosure.',
        'Information independently developed without use of the Confidential Information.',
      ],
      specialClauseTitle: 'NON-DISCLOSURE AND RETURN',
      specialClauseBody:
        'Upon request or at the end of the engagement, the Receiving Party must promptly return or securely destroy all Confidential Information and any copies, extracts, or summaries derived from it, except for records required by law or routine archival backup systems.',
      term:
        'This Agreement begins on the Effective Date and continues through the stated expiration date. Confidentiality obligations survive for three (3) years after termination, or longer to the extent trade secret law applies.',
      governingLaw:
        'This Agreement is governed by the laws identified in the governing-law section and is intended to support injunctive relief if unauthorized disclosure occurs.',
    },
  },
  {
    label: 'Mutual NDA',
    shortLabel: 'MUT',
    level: 'Standard',
    category: 'Two-way disclosure',
    desc: 'Both parties exchange confidential information and owe the same protection duties to one another.',
    highlight: 'Balanced terms built for collaboration and joint review.',
    bestFor: 'Partnership talks, integrations, joint projects',
    clauses: ['Mutual duty', 'Symmetric obligations', 'Shared disclosures'],
    colors: {
      accent: '#1d4ed8',
      soft: '#dbeafe',
      border: '#60a5fa',
      ink: '#1e40af',
    },
    document: {
      agreementTitle: 'MUTUAL NON-DISCLOSURE AGREEMENT',
      purpose:
        'This Mutual Non-Disclosure Agreement governs the reciprocal exchange of confidential information between the parties while they explore, negotiate, or perform a potential business relationship.',
      definition:
        'Confidential Information means any non-public information disclosed by either party, whether in oral, written, visual, electronic, or other tangible form, including technical information, financial records, customer information, strategic plans, and trade secrets.',
      obligations: [
        'Each party must protect the other party\'s Confidential Information using reasonable safeguards and internal access controls.',
        'Neither party may disclose Confidential Information to third parties except to bound representatives with a legitimate business need to know.',
        'Neither party may use the other party\'s Confidential Information except to evaluate or perform the contemplated relationship.',
      ],
      exclusions: [
        'Public information not made public through a breach of this Agreement.',
        'Information received lawfully from a third party without confidentiality restrictions.',
        'Information independently created without reference to the disclosed material.',
      ],
      specialClauseTitle: 'RECIPROCAL PROTECTION',
      specialClauseBody:
        'Because both parties may disclose sensitive information, the obligations in this Agreement apply equally to each party whenever it acts as a Receiving Party. No ownership rights or license are transferred except the limited right to evaluate the contemplated relationship.',
      term:
        'This Agreement takes effect on the Effective Date and remains in force until the expiration date stated in the document, with confidentiality obligations continuing for three (3) years after the final disclosure unless a longer period is required by law.',
      governingLaw:
        'The parties agree that equitable relief may be appropriate in addition to any other legal remedies if either party improperly uses or discloses Confidential Information.',
    },
  },
  {
    label: 'Multilateral NDA',
    shortLabel: 'MLT',
    level: 'Advanced',
    category: 'Multi-party disclosure',
    desc: 'A coordinated agreement for three or more parties sharing or receiving sensitive information.',
    highlight: 'Designed to reduce multiple side agreements in one negotiation.',
    bestFor: 'Consortium bids, multi-party diligence, structured deals',
    clauses: ['Multi-party coverage', 'Aligned duties', 'Single framework'],
    colors: {
      accent: '#0f766e',
      soft: '#ccfbf1',
      border: '#5eead4',
      ink: '#115e59',
    },
    document: {
      agreementTitle: 'MULTILATERAL NON-DISCLOSURE AGREEMENT',
      purpose:
        'This Multilateral Non-Disclosure Agreement enables multiple participating parties to exchange and receive confidential information within a single framework while pursuing a shared transaction, project, or opportunity.',
      definition:
        'Confidential Information includes non-public information disclosed by any participating party, whether directly or through joint meetings, data rooms, memoranda, presentations, software, financial records, or technical specifications.',
      obligations: [
        'Each Receiving Party must protect Confidential Information from every Disclosing Party under the same standard of care.',
        'No party may disclose another party\'s Confidential Information outside the approved project group without prior written consent.',
        'Each party is responsible for ensuring its employees, advisers, subcontractors, and affiliates comply with these obligations.',
      ],
      exclusions: [
        'Information that becomes public through no fault of the Receiving Party.',
        'Information already possessed lawfully by the Receiving Party before participation.',
        'Information independently developed without using another party\'s confidential data.',
      ],
      specialClauseTitle: 'PROJECT RING-FENCING',
      specialClauseBody:
        'Confidential Information may be used only for the shared project named in this Agreement. No party may repurpose another participant\'s data for a separate bid, competing proposal, or unrelated commercial initiative without express written permission.',
      term:
        'This Agreement remains active for the project period and through the stated expiration date. Confidentiality obligations continue for four (4) years after a party\'s participation ends unless trade secret law requires longer protection.',
      governingLaw:
        'Each party acknowledges that unauthorized disclosure in a multi-party setting may cause immediate and difficult-to-measure harm, making injunctive relief an available remedy.',
    },
  },
  {
    label: 'Employee NDA',
    shortLabel: 'EMP',
    level: 'Standard',
    category: 'Workforce protection',
    desc: 'Protects internal know-how, trade secrets, and company information during and after employment.',
    highlight: 'Employment-focused confidentiality with IP and access discipline.',
    bestFor: 'Hiring, role changes, privileged system access',
    clauses: ['Employment scope', 'Trade secrets', 'Post-employment duties'],
    colors: {
      accent: '#7c3aed',
      soft: '#ede9fe',
      border: '#c4b5fd',
      ink: '#6d28d9',
    },
    document: {
      agreementTitle: 'EMPLOYEE NON-DISCLOSURE AGREEMENT',
      purpose:
        'This Employee NDA protects the employer\'s confidential business information, trade secrets, systems, and intellectual property made available to the employee during employment or engagement.',
      definition:
        'Confidential Information includes internal policies, source code, customer records, product roadmaps, compensation data, research, security controls, inventions, and any information developed or accessed through employment that is not public.',
      obligations: [
        'The employee must use Confidential Information only to perform assigned duties for the employer.',
        'The employee must not remove, copy, transmit, or retain confidential files except as authorized for work purposes.',
        'The employee must promptly report any suspected unauthorized access, loss, or disclosure of company information.',
      ],
      exclusions: [
        'Information that becomes public without breach by the employee.',
        'Information the employee can document as known before employment and not subject to another duty of confidentiality.',
        'Information lawfully obtained from a third party without restriction.',
      ],
      specialClauseTitle: 'POST-EMPLOYMENT PROTECTION',
      specialClauseBody:
        'The employee\'s confidentiality duties continue after employment ends. Upon separation, the employee must return company devices, credentials, documents, and work product and must not retain copies except where legally required.',
      term:
        'This Agreement applies throughout the employee\'s service period and continues after termination for three (3) years, with trade secret obligations surviving as long as the information remains a trade secret.',
      governingLaw:
        'This Agreement may be enforced together with the employer\'s acceptable use, IP assignment, and information security policies where applicable.',
    },
  },
  {
    label: 'Contractor/Vendor NDA',
    shortLabel: 'VND',
    level: 'Standard',
    category: 'Third-party access',
    desc: 'Limits how outside service providers handle internal systems, data, and deliverables.',
    highlight: 'Built for outsourced work, system access, and service delivery.',
    bestFor: 'Agencies, consultants, implementation vendors',
    clauses: ['Vendor controls', 'Subcontractor limits', 'Data return'],
    colors: {
      accent: '#ea580c',
      soft: '#ffedd5',
      border: '#fdba74',
      ink: '#c2410c',
    },
    document: {
      agreementTitle: 'CONTRACTOR OR VENDOR NON-DISCLOSURE AGREEMENT',
      purpose:
        'This Contractor/Vendor NDA governs confidential information shared with an external contractor, consultant, supplier, or service provider while that party performs services or evaluates a proposed engagement.',
      definition:
        'Confidential Information includes operational records, credentials, architecture details, datasets, customer environments, proposals, implementation plans, and any materials supplied for the contracted work.',
      obligations: [
        'The contractor or vendor may use Confidential Information only to deliver or assess the agreed services.',
        'Access must be restricted to personnel who are directly assigned to the work and bound by confidentiality duties at least as protective as these terms.',
        'The contractor or vendor must maintain reasonable administrative, technical, and physical safeguards against unauthorized access or disclosure.',
      ],
      exclusions: [
        'Information already public without fault of the contractor or vendor.',
        'Information lawfully received from another source without restrictions.',
        'Information independently developed without reference to the disclosed material.',
      ],
      specialClauseTitle: 'SUBCONTRACTORS AND ACCESS CONTROL',
      specialClauseBody:
        'No subcontractor may receive Confidential Information without prior approval from the Disclosing Party. The contractor or vendor remains responsible for all acts and omissions of approved subcontractors, temporary staff, and support personnel who access the information.',
      term:
        'This Agreement remains effective through the duration of the services and until the stated expiration date. Confidentiality obligations continue for three (3) years after the services end.',
      governingLaw:
        'The parties agree that breach of vendor confidentiality obligations may justify immediate suspension of access, equitable relief, and recovery of direct damages.',
    },
  },
  {
    label: 'Investor NDA',
    shortLabel: 'INV',
    level: 'Advanced',
    category: 'Fundraising diligence',
    desc: 'Protects financials, market strategy, and business plans during investor discussions.',
    highlight: 'Sharper investor-facing language for diligence and pitch materials.',
    bestFor: 'Funding rounds, investor meetings, private data rooms',
    clauses: ['Financial disclosures', 'No deal commitment', 'Diligence scope'],
    colors: {
      accent: '#b45309',
      soft: '#fef3c7',
      border: '#fcd34d',
      ink: '#92400e',
    },
    document: {
      agreementTitle: 'INVESTOR NON-DISCLOSURE AGREEMENT',
      purpose:
        'This Investor NDA applies when confidential business, financial, product, market, or strategic information is disclosed in connection with an actual or potential investment, acquisition, or financing transaction.',
      definition:
        'Confidential Information includes capitalization details, forecasts, valuations, customer metrics, financial statements, fundraising materials, strategic roadmaps, proprietary technology, and due diligence responses.',
      obligations: [
        'The Receiving Party may use Confidential Information solely to evaluate a potential investment or financing relationship.',
        'The Receiving Party must not disclose the existence, status, or substance of discussions except to bound advisers with a need to know.',
        'The Receiving Party must protect digital diligence materials against copying, forwarding, or unauthorized retention.',
      ],
      exclusions: [
        'Information that becomes public without violation of this Agreement.',
        'Information already known by the Receiving Party without confidentiality obligations.',
        'Information independently generated without access to the disclosed materials.',
      ],
      specialClauseTitle: 'NO COMMITMENT TO TRANSACTION',
      specialClauseBody:
        'Disclosure of Confidential Information does not obligate either party to consummate an investment or continue discussions. Neither party makes a representation that any transaction will occur unless and until definitive agreements are executed.',
      term:
        'This Agreement continues through the negotiation period and until the expiration date stated herein. Confidentiality obligations continue for four (4) years after the last disclosure, subject to longer protection for trade secrets.',
      governingLaw:
        'The parties acknowledge that fundraising and diligence records are commercially sensitive and that misuse may support claims for injunctive relief and damages.',
    },
  },
  {
    label: 'Customer NDA',
    shortLabel: 'CUS',
    level: 'Standard',
    category: 'Client relationship',
    desc: 'Protects client information, service data, and implementation details exchanged with customers.',
    highlight: 'Tailored for ongoing service delivery and customer trust.',
    bestFor: 'Client onboarding, managed services, custom delivery',
    clauses: ['Client data', 'Service confidentiality', 'Account access'],
    colors: {
      accent: '#0284c7',
      soft: '#e0f2fe',
      border: '#7dd3fc',
      ink: '#0369a1',
    },
    document: {
      agreementTitle: 'CUSTOMER NON-DISCLOSURE AGREEMENT',
      purpose:
        'This Customer NDA protects confidential information exchanged between a service provider and a customer in connection with onboarding, delivery, support, or a continuing business relationship.',
      definition:
        'Confidential Information includes customer records, account information, implementation details, support communications, pricing, technical environments, usage analytics, and sensitive information shared during service delivery.',
      obligations: [
        'Confidential Information may be used only to deliver, receive, or support the agreed products or services.',
        'Each receiving party must prevent unauthorized disclosure of customer business, personal, or operational data.',
        'Access to customer-related confidential information must be limited to personnel directly involved in servicing the account.',
      ],
      exclusions: [
        'Information publicly available without breach of this Agreement.',
        'Information lawfully known before the customer relationship began.',
        'Information independently obtained from a source with the right to disclose it.',
      ],
      specialClauseTitle: 'CUSTOMER RELATIONSHIP PROTECTION',
      specialClauseBody:
        'Neither party may use confidential customer relationship information to solicit the other party\'s internal personnel, misuse account access, or expose implementation details outside the approved business relationship.',
      term:
        'This Agreement remains in effect during the customer relationship and through the stated expiration date, with confidentiality obligations surviving for three (3) years after the relationship ends.',
      governingLaw:
        'The parties agree that customer confidence is central to the relationship and that any unauthorized disclosure may cause material reputational and business harm.',
    },
  },
  {
    label: 'Standard/General NDA',
    shortLabel: 'GEN',
    level: 'Standard',
    category: 'General-purpose protection',
    desc: 'A flexible baseline NDA for routine confidentiality needs across common business relationships.',
    highlight: 'Broad, clean, and easy to adapt for everyday use.',
    bestFor: 'General business discussions, light diligence, routine sharing',
    clauses: ['Broad coverage', 'Simple terms', 'Fast to deploy'],
    colors: {
      accent: '#475569',
      soft: '#e2e8f0',
      border: '#cbd5e1',
      ink: '#334155',
    },
    document: {
      agreementTitle: 'STANDARD NON-DISCLOSURE AGREEMENT',
      purpose:
        'This Standard NDA provides a general framework for protecting confidential information disclosed in ordinary commercial, professional, or exploratory business interactions.',
      definition:
        'Confidential Information includes any non-public commercial, technical, operational, or strategic information disclosed by the Disclosing Party and reasonably understood to be confidential.',
      obligations: [
        'Use Confidential Information only for the agreed business purpose.',
        'Do not disclose Confidential Information to anyone other than approved representatives who need access and are bound by confidentiality obligations.',
        'Exercise reasonable care to prevent unauthorized use, duplication, or disclosure.',
      ],
      exclusions: [
        'Information already public without breach of this Agreement.',
        'Information already lawfully known before disclosure.',
        'Information independently developed or lawfully received from a third party.',
      ],
      specialClauseTitle: 'GENERAL RESTRICTIONS',
      specialClauseBody:
        'Nothing in this Agreement grants ownership, license rights, or authority to commercialize the Confidential Information. All confidential materials remain the property of the disclosing source unless otherwise agreed in writing.',
      term:
        'This Agreement remains effective until the expiration date stated in the document, and the confidentiality duties continue for three (3) years after termination unless a longer period is required by law.',
      governingLaw:
        'This Agreement is intended to serve as a practical default confidentiality instrument for routine disclosures and may be enforced through legal and equitable remedies.',
    },
  },
  {
    label: 'Confidentiality Agreement',
    shortLabel: 'CFG',
    level: 'Standard',
    category: 'Broad secrecy terms',
    desc: 'A broad confidentiality form emphasizing non-disclosure, secure handling, and restricted sharing.',
    highlight: 'Plain-language protective terms when the relationship is still forming.',
    bestFor: 'Early talks, internal sharing, non-technical disclosures',
    clauses: ['Broad definition', 'Handling controls', 'Disclosure limits'],
    colors: {
      accent: '#0891b2',
      soft: '#cffafe',
      border: '#67e8f9',
      ink: '#0e7490',
    },
    document: {
      agreementTitle: 'CONFIDENTIALITY AGREEMENT',
      purpose:
        'This Confidentiality Agreement creates a broad obligation to protect sensitive information disclosed in meetings, communications, documents, demonstrations, and working sessions between the parties.',
      definition:
        'Confidential Information includes all private or sensitive information disclosed in any form, whether or not labeled confidential, if its nature or context indicates that it should reasonably be treated as confidential.',
      obligations: [
        'Maintain the confidentiality of all covered information and protect it from careless handling or unauthorized exposure.',
        'Do not share Confidential Information outside the approved circle of representatives needed for the relationship.',
        'Promptly notify the Disclosing Party if unauthorized access, loss, or misuse is suspected.',
      ],
      exclusions: [
        'Information that enters the public domain through no breach of this Agreement.',
        'Information lawfully obtained from another source with no duty of confidentiality.',
        'Information independently developed without use of the disclosed material.',
      ],
      specialClauseTitle: 'SECURE HANDLING',
      specialClauseBody:
        'The Receiving Party must maintain appropriate storage, transmission, and access safeguards for Confidential Information and must avoid discussing sensitive information in unsecured settings or through unauthorized tools and platforms.',
      term:
        'This Agreement remains active until the stated expiration date, and confidentiality duties survive for three (3) years after the relationship or disclosures end.',
      governingLaw:
        'The parties intend this Agreement to support prompt legal remedies where a disclosure threat would cause irreparable harm.',
    },
  },
  {
    label: 'Non-Circumvention Agreement',
    shortLabel: 'NCA',
    level: 'Advanced',
    category: 'Relationship protection',
    desc: 'Prevents one party from bypassing another to exploit introduced contacts, deals, or opportunities.',
    highlight: 'Built to protect intermediaries, brokers, and sourced relationships.',
    bestFor: 'Brokered deals, sourcing, introductions, channel relationships',
    clauses: ['Introduced contacts', 'No bypass', 'Protected opportunities'],
    colors: {
      accent: '#dc2626',
      soft: '#fee2e2',
      border: '#fca5a5',
      ink: '#b91c1c',
    },
    document: {
      agreementTitle: 'NON-CIRCUMVENTION AGREEMENT',
      purpose:
        'This Non-Circumvention Agreement protects business opportunities, counterparties, and introductions shared between the parties so that no party bypasses the introducing party to capture value directly.',
      definition:
        'Protected Information includes introduced contacts, deal structures, opportunity details, pricing frameworks, referral channels, counterparties, lead sources, and any supporting confidential data associated with the introduced relationship.',
      obligations: [
        'A receiving party must not contact, negotiate with, or transact directly with a protected contact in a way that bypasses the introducing party.',
        'Protected Information may be used only for the contemplated transaction or relationship described in this Agreement.',
        'No party may restructure a transaction or relationship for the purpose of avoiding compensation, participation, or consent obligations owed to the introducing party.',
      ],
      exclusions: [
        'A contact or opportunity already documented as independently known before introduction.',
        'Information that becomes public without breach of this Agreement.',
        'Direct contact expressly approved in writing by the introducing party.',
      ],
      specialClauseTitle: 'NON-CIRCUMVENTION COVENANT',
      specialClauseBody:
        'For the protected period, each party agrees not to circumvent the introducing party by bypassing established communication paths, excluding the introducing party from negotiations, or taking direct benefit from introduced relationships without written consent.',
      term:
        'This Agreement remains effective through the stated expiration date, and non-circumvention duties continue for two (2) years after the most recent protected introduction unless the parties agree otherwise in writing.',
      governingLaw:
        'The parties recognize that circumvention can deprive the introducing party of difficult-to-measure commercial value and may justify equitable relief in addition to damages.',
    },
  },
  {
    label: 'Non-Use NDA',
    shortLabel: 'NUD',
    level: 'Advanced',
    category: 'Use restriction',
    desc: 'Prevents not only disclosure but also any unauthorized internal or commercial use of confidential data.',
    highlight: 'Best when the risk is misuse, not just leakage.',
    bestFor: 'R&D access, prototypes, licensing, product review',
    clauses: ['No use outside scope', 'Misuse protection', 'Tighter control'],
    colors: {
      accent: '#9333ea',
      soft: '#f3e8ff',
      border: '#d8b4fe',
      ink: '#7e22ce',
    },
    document: {
      agreementTitle: 'NON-USE AND NON-DISCLOSURE AGREEMENT',
      purpose:
        'This Non-Use NDA is intended for situations where confidential information may be highly sensitive and must not be used for any internal, competitive, developmental, or commercial purpose outside the expressly approved scope.',
      definition:
        'Confidential Information includes all non-public technical, commercial, scientific, strategic, or operational information disclosed by the Disclosing Party, including prototypes, methods, research, datasets, and know-how.',
      obligations: [
        'The Receiving Party must not use Confidential Information for any purpose other than the specifically authorized evaluation or engagement.',
        'The Receiving Party must not incorporate Confidential Information into products, roadmaps, analyses, or competitive strategies without written permission.',
        'The Receiving Party must restrict copies, testing, analysis, and internal distribution to the minimum necessary for the approved purpose.',
      ],
      exclusions: [
        'Information that becomes public without breach of this Agreement.',
        'Information already lawfully known before disclosure.',
        'Information independently created without reference to the Confidential Information.',
      ],
      specialClauseTitle: 'STRICT NON-USE COVENANT',
      specialClauseBody:
        'The Receiving Party may not derive, benchmark, train, commercialize, reverse engineer, or otherwise exploit the Confidential Information except as expressly authorized in writing. The prohibition on unauthorized use applies even if no third-party disclosure occurs.',
      term:
        'This Agreement remains effective until the stated expiration date, and non-use and confidentiality obligations continue for four (4) years after termination unless a longer term is required by law for trade secrets.',
      governingLaw:
        'Because misuse can occur without public disclosure, the parties agree that unauthorized internal or commercial use may constitute a material breach subject to equitable and monetary relief.',
    },
  },
];

export const NDA_TEMPLATE_MAP = Object.fromEntries(
  NDA_TEMPLATES.map((template) => [template.label, template]),
);

export const NDA_TEMPLATE_NAMES = NDA_TEMPLATES.map((template) => template.label);

export const getNdaTemplate = (label) =>
  NDA_TEMPLATE_MAP[label] || NDA_TEMPLATE_MAP['Standard/General NDA'];
