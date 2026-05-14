import { useEffect, useRef, useState } from 'react';
import { api } from '../api';
import { MyNDAs } from './MyNDAs';
import { RequestNewNDA } from './RequestNewNDA';
import { Templates } from './Templates';
import { Parties } from './Parties';
import { Settings } from './Settings';
import { ActivityLog } from './ActivityLog';
import { NDA_TEMPLATES } from '../data/ndaTemplates';
import { openNdaPrintPreview } from '../utils/ndaDocument';
import { useResponsive } from '../hooks/useResponsive';
import { Reports } from './Reports';

const getNotificationStorageKey = (email) => `nda_notifications_read_${email}`;
const SHARED_NDA_TYPES = NDA_TEMPLATES.map((template) => ({
  icon: template.shortLabel,
  label: template.label,
}));

const NDA_TYPES = [
  { icon: '↔️', label: 'Unilateral NDA' },
  { icon: '🔄', label: 'Mutual NDA' },
  { icon: '🌐', label: 'Multilateral NDA' },
  { icon: '👤', label: 'Employee NDA' },
  { icon: '🔧', label: 'Contractor/Vendor NDA' },
  { icon: '💼', label: 'Investor NDA' },
  { icon: '🛒', label: 'Customer NDA' },
  { icon: '📄', label: 'Standard/General NDA' },
  { icon: '🤝', label: 'Confidentiality Agreement' },
  { icon: '🚫', label: 'Non-Circumvention Agreement' },
  { icon: '🔒', label: 'Non-Use NDA' },
];

const NDA_INFO = {
  'Unilateral NDA': {
    title: 'About Unilateral NDA',
    description: 'A Unilateral NDA is a one-way confidentiality agreement where only one party discloses confidential information while the other agrees to protect it.',
    points: [
      'Only one party discloses information',
      'Receiving party is bound to confidentiality',
      'Common in employer–employee relationships',
      'Protects trade secrets and proprietary data',
    ],
  },
  'Mutual NDA': {
    title: 'About Mutual NDA',
    description: "A Mutual Non-Disclosure Agreement (NDA) is a legal contract between two or more parties where each party agrees to protect the other's confidential information.",
    points: [
      'Both parties share confidential information',
      'Both parties are equally bound to protect the information',
      'Used in partnerships, joint ventures, or collaborations',
      'Creates a foundation of trust and legal protection',
    ],
  },
  'Multilateral NDA': {
    title: 'About Multilateral NDA',
    description: 'A Multilateral NDA involves three or more parties where at least one shares confidential information and all receiving parties are bound to maintain strict confidentiality.',
    points: [
      'Involves three or more parties',
      'Eliminates need for multiple bilateral NDAs',
      'Common in multi-party business negotiations',
      'All parties share equal confidentiality obligations',
    ],
  },
  'Employee NDA': {
    title: 'About Employee NDA',
    description: 'An Employee NDA protects company intellectual property, trade secrets, internal systems, and operational information from being disclosed during and after employment.',
    points: [
      'Protects company trade secrets',
      'Covers data shared during employment',
      'Obligations often survive termination',
      'Standard in most employment agreements',
    ],
  },
  'Contractor/Vendor NDA': {
    title: 'About Contractor/Vendor NDA',
    description: 'Ensures external contractors or vendors cannot disclose or misuse confidential company information accessed during the course of their work.',
    points: [
      'Covers third-party service providers',
      'Restricts use of accessed company data',
      'Time-bound to the contract period',
      'Includes return/destruction of materials',
    ],
  },
  'Investor NDA': {
    title: 'About Investor NDA',
    description: 'Protects sensitive business and financial information shared during investment discussions, including valuations, projections, and proprietary data.',
    points: [
      'Protects financial disclosures',
      'Covers business plans and strategies',
      'Used in funding rounds and pitches',
      'Guards against investor misuse of data',
    ],
  },
  'Customer NDA': {
    title: 'About Customer NDA',
    description: 'Protects customer-related confidential information exchanged between a business and its clients during the course of a business relationship.',
    points: [
      'Protects client data and transactions',
      'Defines what customer info is confidential',
      'Builds client trust and legal safety',
      'Commonly used in service agreements',
    ],
  },
  'Standard/General NDA': {
    title: 'About Standard NDA',
    description: 'A general confidentiality agreement used for basic protection of sensitive business information in common business relationships.',
    points: [
      'Broadly applicable to most situations',
      'Flexible and customizable terms',
      'Simple and straightforward language',
      'Covers general business confidentiality',
    ],
  },
  'Confidentiality Agreement': {
    title: 'About Confidentiality Agreement',
    description: 'A legal agreement ensuring that all shared confidential information remains protected and is not disclosed or misused by the receiving party.',
    points: [
      'Legally restricts disclosure of private info',
      'Can be mutual or one-sided',
      'Enforceable under contract law',
      'Often used interchangeably with NDA',
    ],
  },
  'Non-Circumvention Agreement': {
    title: 'About Non-Circumvention Agreement',
    description: 'Prevents parties from bypassing intermediaries to directly exploit business relationships, opportunities, or contacts introduced through the agreement.',
    points: [
      'Protects business introductions',
      'Prevents bypassing of intermediaries',
      'Common in deal-making and brokerage',
      'Enforceable for a defined period',
    ],
  },
  'Non-Use NDA': {
    title: 'About Non-Use NDA',
    description: 'Restricts the receiving party from using confidential information for any purpose other than the agreed business objectives, beyond just prohibiting disclosure.',
    points: [
      'Goes beyond standard confidentiality',
      'Restricts all unauthorized use',
      'Protects against internal misuse',
      'Common in R&D and licensing deals',
    ],
  },
};

const NAV_ITEMS = [
  { icon: HomeIcon, label: 'Dashboard', key: 'dashboard' },
  { icon: FileIcon, label: 'My NDAs', key: 'my-ndas' },
  { icon: PlusCircleIcon, label: 'Request New NDA', key: 'request' },
  { icon: TemplateIcon, label: 'Templates', key: 'templates' },
  { icon: UsersIcon, label: 'Parties', key: 'parties' },
  { icon: BarChartIcon, label: 'Reports', key: 'reports' },
  { icon: SettingsIcon, label: 'Settings', key: 'settings' },
  { icon: ActivityIcon, label: 'Activity Log', key: 'activity' },
];

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function FileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function PlusCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}
function TemplateIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function BarChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function ActivityIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

const getStatusBadge = (status, expirationDate) => {
  if (status === 'revoked') return { text: 'REVOKED', color: '#7c3aed', bg: '#ede9fe' };
  if (status === 'signed') {
    const days = Math.ceil((new Date(expirationDate) - new Date()) / 86400000);
    if (days < 0) return { text: 'EXPIRED', color: '#dc2626', bg: '#fee2e2' };
    if (days < 30) return { text: 'EXPIRING SOON', color: '#ea580c', bg: '#ffedd5' };
    return { text: 'SIGNED', color: '#16a34a', bg: '#dcfce7' };
  }
  return { text: 'PENDING', color: '#d97706', bg: '#fef3c7' };
};

const downloadPDF = (nda) => {
  const html = `<!DOCTYPE html><html><head><title>${nda.ndaId}</title>
  <style>
    body { font-family: 'Times New Roman', serif; margin: 60px; line-height: 1.8; color: #1f2937; }
    h1 { text-align: center; font-size: 22px; border-bottom: 2px solid #000; padding-bottom: 16px; margin-bottom: 24px; }
    .meta { color: #555; font-size: 13px; text-align: right; margin-bottom: 8px; }
    .box { border: 1px solid #ddd; background: #f9fafb; padding: 14px; margin: 12px 0; border-radius: 4px; }
    .section-title { font-weight: bold; font-size: 14px; margin-top: 24px; margin-bottom: 8px; background: #f3f4f6; padding: 6px; }
    p { margin-bottom: 10px; text-align: justify; }
    .sig { display: flex; justify-content: space-between; margin-top: 60px; }
    .sig-box { width: 45%; }
    .sig-line { border-top: 1px solid #000; margin-top: 40px; padding-top: 6px; font-size: 12px; }
    .footer { margin-top: 40px; font-size: 10px; text-align: center; color: #9ca3af; }
  </style>
  </head><body>
  <div class="meta">Document ID: ${nda.ndaId} &nbsp;|&nbsp; Type: ${nda.ndaType || 'Standard NDA'} &nbsp;|&nbsp; Status: ${(nda.status || '').toUpperCase()}</div>
  <h1>NON-DISCLOSURE AGREEMENT</h1>
  <div class="box"><strong>Disclosing Party:</strong> ${nda.companyName || 'TechGuard Solutions Inc.'}<br>Address: ${nda.disclosingAddress || '123 Business Ave, Wilmington, DE 19801'}</div>
  <div class="box"><strong>Receiving Party:</strong> ${nda.signerName}<br>Email: ${nda.signerEmail}<br>Address: ${nda.receivingAddress || '[To be provided]'}</div>
  <div class="box"><strong>Partner / Company:</strong> ${nda.partnerName}<br>Email: ${nda.partnerEmail}</div>
  <div class="section-title">1. PURPOSE</div>
  <p>The Company possesses certain confidential and proprietary information including but not limited to trade secrets, source code, customer data, business strategies, and technical specifications. The Recipient agrees to protect such information as outlined below.</p>
  <div class="section-title">2. DEFINITION OF CONFIDENTIAL INFORMATION</div>
  <p>"Confidential Information" includes all information disclosed by the Company, whether orally, in writing, or electronically, including source code, algorithms, customer lists, pricing information, security protocols, financial data, business plans, and any information marked as "Confidential".</p>
  <div class="section-title">3. OBLIGATIONS OF RECIPIENT</div>
  <p>The Recipient agrees to hold all Confidential Information in strict confidence, not disclose it to any third party, use it only for authorized business purposes, not copy or reverse engineer any confidential materials, and return or destroy all Confidential Information upon agreement termination.</p>
  <div class="section-title">4. EXCLUSIONS</div>
  <p>Confidential Information does not include information that is publicly available through no fault of Recipient, was already in Recipient's possession before disclosure, is independently developed, or is required to be disclosed by law.</p>
  <div class="section-title">5. TERM</div>
  <p>This Agreement commences on ${new Date(nda.generatedDate).toLocaleDateString()} and expires on ${new Date(nda.expirationDate).toLocaleDateString()}. Obligations survive termination for an additional three (3) years.</p>
  <div class="section-title">6. GOVERNING LAW</div>
  <p>This Agreement shall be governed by the laws of the State of Delaware. Any disputes shall be resolved in the courts of Wilmington, Delaware.</p>
  ${nda.notes ? `<div class="section-title">7. ADDITIONAL NOTES</div><p>${nda.notes}</p>` : ''}
  <div class="sig">
    <div class="sig-box">
      <div>FOR THE COMPANY:</div>
      <div class="sig-line">_________________________<br>Authorized Signature<br><br>_________________________<br>Printed Name<br><br>${new Date().toLocaleDateString()}<br>Date</div>
    </div>
    <div class="sig-box">
      <div>FOR THE RECIPIENT:</div>
      <div class="sig-line">_________________________<br>Signature<br><br>${nda.signerName}<br>Printed Name<br><br>${nda.status === 'signed' && nda.signedAt ? new Date(nda.signedAt).toLocaleDateString() : '_______________'}<br>Date</div>
    </div>
  </div>
  <div class="footer">NDA ID: ${nda.ndaId} — This document is legally binding and electronically tracked by NDA Guardian.</div>
  </body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    alert('Please allow popups for localhost to view/print the NDA.');
    return;
  }
  setTimeout(() => win.print(), 800);
};

export const EmployeeDashboard = ({ user, onLogout }) => {
  const { isMobile, isTablet } = useResponsive();
  const [ndas, setNdas] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [activeNdaType, setActiveNdaType] = useState('Mutual NDA');
  const [showNewNdaForm, setShowNewNdaForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [readNotificationIds, setReadNotificationIds] = useState([]);

  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [disclosingAddress, setDisclosingAddress] = useState('');
  const [receivingAddress, setReceivingAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('1');
  const [loading, setLoading] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    fetchMyNDAs();
    fetchActivityLogs();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(getNotificationStorageKey(user.email));
    if (!stored) {
      setReadNotificationIds([]);
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setReadNotificationIds(Array.isArray(parsed) ? parsed : []);
    } catch (_error) {
      setReadNotificationIds([]);
    }
  }, [user.email]);

  useEffect(() => {
    if (!showNotifications) return undefined;

    const handlePointerDown = (event) => {
      if (!notificationRef.current?.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [showNotifications]);

  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const fetchMyNDAs = async () => {
    try {
      const data = await api.getNdas(user.email);
      setNdas(data);
    } catch (err) { console.error(err); }
  };

  const fetchActivityLogs = async () => {
    try {
      const data = await api.getActivityLogs(user.email);
      setActivityLogs(data);
    } catch (err) { console.error(err); }
  };

  const generateNDA = async () => {
    if (!partnerName || !partnerEmail) { alert('Please fill in partner name and email'); return; }
    setLoading(true);
    try {
      const ndaId = `NDA-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + parseInt(duration));
      const generatedDate = new Date().toISOString();

      const ndaData = {
        ndaId,
        ndaType: activeNdaType,
        signerName: user.displayName || user.email,
        signerEmail: user.email,
        partnerName,
        partnerEmail,
        companyName: 'TechGuard Solutions Inc.',
        disclosingAddress: disclosingAddress || '123 Business Ave, Wilmington, DE 19801',
        receivingAddress: receivingAddress || '[To be provided]',
        notes,
        generatedDate,
        expirationDate: expirationDate.toISOString(),
        status: 'pending',
      };

      await api.createNda(ndaData);

      await fetchMyNDAs();
      await fetchActivityLogs();
      setModalSuccess(ndaData);
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowNewNdaForm(false);
    setModalSuccess(null);
    setPartnerName(''); setPartnerEmail('');
    setDisclosingAddress(''); setReceivingAddress('');
    setNotes(''); setDuration('1');
  };

  const signNDA = async (ndaId) => {
    await api.signNda(ndaId, {
      signedAt: new Date().toISOString(),
      signerEmail: user.email,
      signerName: user.displayName || user.email,
    });
    await fetchMyNDAs();
    await fetchActivityLogs();
  };

  const stats = {
    total: ndas.length,
    signed: ndas.filter(n => n.status === 'signed').length,
    pending: ndas.filter(n => n.status === 'pending').length,
    expiringSoon: ndas.filter(n => {
      const days = Math.ceil((new Date(n.expirationDate) - new Date()) / 86400000);
      return n.status === 'signed' && days >= 0 && days < 30;
    }).length,
  };

  const userInitials = (user.displayName || user.email || '?')
    .split(/[\s@]/).filter(Boolean).slice(0, 2).map(s => s[0].toUpperCase()).join('');
  const displayName = user.displayName || user.email?.split('@')[0] || 'User';
  const info = NDA_INFO[activeNdaType] || NDA_INFO['Mutual NDA'];
  const recentNDAs = ndas.slice(0, 5);
  const notifications = [
    ...ndas
      .filter((nda) => nda.status === 'pending')
      .slice(0, 3)
      .map((nda) => ({
        id: `pending-${nda.id}`,
        title: 'Signature pending',
        message: `${nda.partnerName} is waiting on ${nda.ndaType || 'NDA'}.`,
        time: nda.generatedDate,
        tone: '#d97706',
        bg: '#fff7ed'
      })),
    ...ndas
      .filter((nda) => {
        const days = Math.ceil((new Date(nda.expirationDate) - new Date()) / 86400000);
        return nda.status === 'signed' && days >= 0 && days < 30;
      })
      .slice(0, 2)
      .map((nda) => ({
        id: `expiring-${nda.id}`,
        title: 'Expiring soon',
        message: `${nda.partnerName} expires on ${new Date(nda.expirationDate).toLocaleDateString()}.`,
        time: nda.expirationDate,
        tone: '#dc2626',
        bg: '#fee2e2'
      })),
    ...activityLogs.slice(0, 4).map((log) => ({
      id: log.id,
      title: log.type === 'signed' ? 'NDA signed' : log.type === 'revoked' ? 'NDA revoked' : 'New NDA created',
      message: log.description,
      time: log.timestamp,
      tone: log.type === 'signed' ? '#16a34a' : log.type === 'revoked' ? '#dc2626' : '#2563eb',
      bg: log.type === 'signed' ? '#dcfce7' : log.type === 'revoked' ? '#fee2e2' : '#eff6ff'
    }))
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 6);
  const unreadNotificationCount = notifications.filter((item) => !readNotificationIds.includes(item.id)).length;

  const persistReadNotifications = (nextIds) => {
    setReadNotificationIds(nextIds);
    localStorage.setItem(getNotificationStorageKey(user.email), JSON.stringify(nextIds));
  };

  const markNotificationAsRead = (notificationId) => {
    if (readNotificationIds.includes(notificationId)) return;
    persistReadNotifications([...readNotificationIds, notificationId]);
  };

  const markAllNotificationsAsRead = () => {
    persistReadNotifications(notifications.map((item) => item.id));
  };

  const formatNotificationTime = (iso) => {
    const diffMs = new Date() - new Date(iso);
    const diffHours = Math.floor(diffMs / 3600000);
    if (diffHours < 1) {
      const diffMinutes = Math.max(1, Math.floor(diffMs / 60000));
      return `${diffMinutes}m ago`;
    }
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`dashboard-shell${sidebarOpen ? ' sidebar-open' : ''}`} style={{ background: '#f8fafc' }}>
      <div className="dashboard-overlay" onClick={() => setSidebarOpen(false)} />

      {/* SIDEBAR */}
      <div className="dashboard-sidebar" style={{ width: '220px', minWidth: '220px' }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: '700', fontSize: '16px', lineHeight: 1 }}>NDA</div>
              <div style={{ color: '#64748b', fontSize: '10px', marginTop: '2px' }}>Secure Agreements</div>
            </div>
          </div>
        </div>

        <nav style={{ padding: '12px 10px', flex: 1 }}>
          {NAV_ITEMS.map(item => {
            const isActive = activeNav === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveNav(item.key);
                  setSidebarOpen(false);
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  width: '100%', padding: '9px 12px', borderRadius: '8px',
                  border: 'none', cursor: 'pointer', marginBottom: '2px',
                  background: isActive ? '#1e40af' : 'transparent',
                  color: isActive ? 'white' : '#94a3b8',
                  fontSize: '13.5px', fontWeight: isActive ? '600' : '400',
                  textAlign: 'left', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#cbd5e1'; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; } }}
              >
                <item.icon />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '8px', marginBottom: '4px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: 'white', flexShrink: 0 }}>{userInitials}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: '#f1f5f9', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayName}</div>
              <div style={{ color: '#64748b', fontSize: '10.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
              <div style={{ marginTop: '3px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                <span style={{ color: '#64748b', fontSize: '10px' }}>Employee</span>
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'transparent', color: '#94a3b8', fontSize: '13px', textAlign: 'left' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#f87171'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}
          >
            <LogoutIcon /> Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="dashboard-main">

        {/* Top bar */}
        <div className="dashboard-topbar" style={{ minHeight: isMobile ? 'auto' : '60px' }}>
          <div className="dashboard-title-group">
            {isMobile && (
              <button
                className="dashboard-mobile-toggle"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            )}
            <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
              {NAV_ITEMS.find(n => n.key === activeNav)?.label || 'Dashboard'}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Welcome back, {displayName.split(' ')[0]}!</div>
          </div>
          </div>
          <div className="dashboard-top-actions">
            <div className="dashboard-actions-row">
              <button
                onClick={() => { setShowNewNdaForm(true); setModalSuccess(null); }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#2563eb', color: 'white', padding: '9px 18px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13.5px', width: isMobile ? '100%' : 'auto' }}
              >
                <span style={{ fontSize: '16px' }}>+</span> Request New NDA
              </button>
              <div className="dashboard-icon-actions">
                <div ref={notificationRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowNotifications((current) => !current)}
                    style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', background: 'white', cursor: 'pointer' }}
                  >
                    <BellIcon />
                  </button>
                  {unreadNotificationCount > 0 && (
                    <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '16px', height: '16px', borderRadius: '50%', background: '#ef4444', color: 'white', fontSize: '9px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Math.min(unreadNotificationCount, 9)}</span>
                  )}
                  {showNotifications && (
                    <div style={{ position: 'absolute', top: '46px', right: isMobile ? '-48px' : '0', width: isMobile ? 'min(92vw, 320px)' : '320px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '14px', boxShadow: '0 18px 45px rgba(15,23,42,0.12)', overflow: 'hidden', zIndex: 20 }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Notifications</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {notifications.length > 0 && unreadNotificationCount > 0 && (
                        <button onClick={markAllNotificationsAsRead} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>Mark all as read</button>
                      )}
                      <button onClick={() => setActiveNav('activity')} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>View log</button>
                    </div>
                  </div>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '20px 16px', fontSize: '12.5px', color: '#94a3b8' }}>No notifications yet.</div>
                  ) : (
                    <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                      {notifications.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            markNotificationAsRead(item.id);
                            setShowNotifications(false);
                            if (item.title === 'Signature pending' || item.title === 'Expiring soon') {
                              setActiveNav('my-ndas');
                              return;
                            }
                            setActiveNav('activity');
                          }}
                          style={{ width: '100%', border: 'none', background: 'white', borderBottom: '1px solid #f8fafc', padding: '12px 16px', textAlign: 'left', cursor: 'pointer' }}
                        >
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: readNotificationIds.includes(item.id) ? '#cbd5e1' : item.tone, marginTop: '6px', flexShrink: 0 }} />
                            <div style={{ minWidth: 0 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'center' }}>
                                <span style={{ fontSize: '12.5px', fontWeight: readNotificationIds.includes(item.id) ? '600' : '700', color: '#0f172a' }}>{item.title}</span>
                                <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{formatNotificationTime(item.time)}</span>
                              </div>
                              <div style={{ fontSize: '12px', color: readNotificationIds.includes(item.id) ? '#94a3b8' : '#475569', marginTop: '4px', lineHeight: '1.45' }}>{item.message}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    setActiveNav('settings');
                  }}
                  title="Open settings"
                  style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: 'white', cursor: 'pointer', border: 'none' }}
                >
                  {userInitials}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="dashboard-main-scroll">

          {activeNav === 'dashboard' && (
            <div className="dashboard-main-padding">
              {/* Stats */}
              <div className="dashboard-stats-grid" style={{ marginBottom: '24px' }}>
                {[
                  { label: 'Total NDAs', sub: 'All time', value: stats.total, icon: '📋', iconBg: '#eff6ff' },
                  { label: 'Signed', sub: 'This year', value: stats.signed, icon: '✅', iconBg: '#dcfce7' },
                  { label: 'Pending', sub: 'Awaiting signature', value: stats.pending, icon: '⏰', iconBg: '#fef3c7' },
                  { label: 'Expiring Soon', sub: 'Within 30 days', value: stats.expiringSoon, icon: '📅', iconBg: '#fee2e2' },
                ].map((s, i) => (
                  <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#475569', marginTop: '3px' }}>{s.label}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent NDAs table */}
              <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', marginBottom: '20px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Recent NDA Records</div>
                  <button onClick={() => setActiveNav('my-ndas')} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>View all</button>
                </div>
                {ndas.length === 0 ? (
                  <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
                    <div style={{ fontWeight: '600', fontSize: '15px' }}>No NDAs yet</div>
                    <div style={{ fontSize: '13px', marginTop: '4px' }}>Click "Request New NDA" to get started</div>
                  </div>
                ) : (
                  <div className="responsive-table-wrap">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc' }}>
                          {['NDA ID', 'TYPE', 'PARTNER', 'CREATED', 'EXPIRES', 'STATUS', 'ACTIONS'].map(h => (
                            <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.8px', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {recentNDAs.map(nda => {
                          const badge = getStatusBadge(nda.status, nda.expirationDate);
                          return (
                            <tr key={nda.id} style={{ borderBottom: '1px solid #f8fafc' }}
                              onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                              onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                              <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontSize: '12px', color: '#475569', fontWeight: '500' }}>{nda.ndaId}</td>
                              <td style={{ padding: '14px 16px', fontSize: '13px', color: '#334155' }}>{nda.ndaType || '—'}</td>
                              <td style={{ padding: '14px 16px' }}>
                                <div style={{ fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>{nda.partnerName}</div>
                                <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>{nda.partnerEmail}</div>
                              </td>
                              <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>{new Date(nda.generatedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                              <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>{new Date(nda.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                              <td style={{ padding: '14px 16px' }}>
                                <span style={{ background: badge.bg, color: badge.color, padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>{badge.text}</span>
                              </td>
                              <td style={{ padding: '14px 16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                  {nda.status !== 'signed' && (
                                    <button onClick={() => signNDA(nda.id)} style={{ background: '#dcfce7', color: '#16a34a', padding: '5px 10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11.5px', fontWeight: '500' }}>✍️ Sign</button>
                                  )}
                                  <button onClick={() => openNdaPrintPreview(nda)} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#eff6ff', color: '#2563eb', padding: '5px 10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}><EyeIcon /> View</button>
                                  <button onClick={() => openNdaPrintPreview(nda)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', color: '#475569', padding: '5px 10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}><DownloadIcon /> PDF</button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* NDA Info panel */}
              <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', padding: '24px', display: 'flex', alignItems: 'flex-start', gap: '24px', overflow: 'hidden', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><ShieldIcon /></div>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{info.title}</h3>
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.6', margin: '0 0 14px' }}>{info.description}</p>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#2563eb', marginBottom: '10px' }}>Key Points:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {info.points.map((point, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <span style={{ fontSize: '13px', color: '#334155' }}>{point}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '18px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {SHARED_NDA_TYPES.map(t => (
                      <button key={t.label} onClick={() => setActiveNdaType(t.label)} style={{ padding: '4px 10px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '11.5px', fontWeight: '500', background: activeNdaType === t.label ? '#2563eb' : '#f1f5f9', color: activeNdaType === t.label ? 'white' : '#64748b' }}>{t.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'my-ndas' && <MyNDAs user={user} />}

          {/* ✅ FIX: Pass initialType to RequestNewNDA */}
          {activeNav === 'request' && (
            <RequestNewNDA
              user={user}
              onSuccess={() => setActiveNav('my-ndas')}
              initialType={activeNdaType}
            />
          )}

          {/* ✅ FIX: Templates now correctly sets activeNdaType before navigating */}
          {activeNav === 'templates' && (
            <Templates
              onSelectTemplate={(type) => {
                setActiveNdaType(type);
                setActiveNav('request');
              }}
            />
          )}

          {activeNav === 'parties' && <Parties />}
          {activeNav === 'reports' && <Reports user={user} />}
          {activeNav === 'settings' && <Settings user={user} onLogout={onLogout} />}
          {activeNav === 'activity' && <ActivityLog user={user} />}
        </div>
      </div>

      {/* NEW NDA MODAL */}
      {showNewNdaForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>

            {modalSuccess ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '52px', marginBottom: '16px' }}>✅</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>NDA Generated!</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>{modalSuccess.ndaType}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#2563eb', background: '#eff6ff', padding: '6px 14px', borderRadius: '8px', display: 'inline-block', marginBottom: '20px' }}>{modalSuccess.ndaId}</div>

                <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px', fontWeight: '700', textTransform: 'uppercase' }}>Details</div>
                  <div style={{ fontSize: '13px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <div><strong>Partner:</strong> {modalSuccess.partnerName}</div>
                    <div><strong>Email:</strong> {modalSuccess.partnerEmail}</div>
                    <div><strong>Type:</strong> {modalSuccess.ndaType}</div>
                    <div><strong>Expires:</strong> {new Date(modalSuccess.expirationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    <div><strong>Status:</strong> <span style={{ color: '#d97706', fontWeight: '600' }}>PENDING</span></div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button onClick={() => openNdaPrintPreview(modalSuccess)} style={{ background: '#2563eb', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>📄 View / Print PDF</button>
                  <button onClick={() => { closeModal(); setActiveNav('my-ndas'); }} style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Go to My NDAs</button>
                  <button onClick={() => setModalSuccess(null)} style={{ background: 'transparent', color: '#94a3b8', border: 'none', padding: '8px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>+ Generate Another NDA</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ margin: 0, color: '#0f172a', fontSize: '18px', fontWeight: '700' }}>Request New NDA</h3>
                  <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>✕</button>
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>NDA Type</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {SHARED_NDA_TYPES.map(t => (
                      <button key={t.label} onClick={() => setActiveNdaType(t.label)} style={{ padding: '5px 11px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '500', background: activeNdaType === t.label ? '#2563eb' : '#f1f5f9', color: activeNdaType === t.label ? 'white' : '#64748b' }}>{t.label}</button>
                    ))}
                  </div>
                </div>

                {[
                  { label: 'Partner / Company Name *', placeholder: 'e.g. Acme Corporation', value: partnerName, setter: setPartnerName, type: 'text' },
                  { label: 'Partner Email *', placeholder: 'partner@company.com', value: partnerEmail, setter: setPartnerEmail, type: 'email' },
                  { label: 'Disclosing Party Address', placeholder: '123 Business Ave, Wilmington, DE', value: disclosingAddress, setter: setDisclosingAddress, type: 'text' },
                  { label: 'Receiving Party Address', placeholder: 'Your address', value: receivingAddress, setter: setReceivingAddress, type: 'text' },
                ].map((f, i) => (
                  <div key={i} style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={f.value} onChange={e => f.setter(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13.5px', boxSizing: 'border-box', outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = '#2563eb'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </div>
                ))}

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>Additional Notes (optional)</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any special terms or clauses..."
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13.5px', boxSizing: 'border-box', outline: 'none', resize: 'vertical', minHeight: '70px' }}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>Duration</label>
                  <select value={duration} onChange={e => setDuration(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13.5px', boxSizing: 'border-box', outline: 'none' }}>
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={generateNDA} disabled={loading} style={{ flex: 1, background: loading ? '#94a3b8' : '#2563eb', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '700', fontSize: '14px' }}>
                    {loading ? '⏳ Generating...' : '✅ Generate NDA'}
                  </button>
                  <button onClick={closeModal} style={{ flex: 1, background: '#f1f5f9', color: '#475569', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
