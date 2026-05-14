// Helper functions
const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const formatDate = (value) => {
  if (!value) return 'Not specified';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not specified';
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// Import ALL 11 templates
import { UnilateralNDA } from '../components/nda/templates/UnilateralNDA.jsx';
import { MutualNDA } from '../components/nda/templates/MutualNDA.jsx';
import { MultilateralNDA } from '../components/nda/templates/MultilateralNDA.jsx';
import { EmployeeNDA } from '../components/nda/templates/EmployeeNDA.jsx';
import { ContractorVendorNDA } from '../components/nda/templates/ContractorVendorNDA.jsx';
import { InvestorNDA } from '../components/nda/templates/InvestorNDA.jsx';
import { CustomerNDA } from '../components/nda/templates/CustomerNDA.jsx';
import { StandardNDA } from '../components/nda/templates/StandardNDA.jsx';
import { ConfidentialityAgreement } from '../components/nda/templates/ConfidentialityAgreement.jsx';
import { NonCircumventionNDA } from '../components/nda/templates/NonCircumventionNDA.jsx';
import { NonUseNDA } from '../components/nda/templates/NonUseNDA.jsx';

// Map NDA types to specific templates
const TEMPLATE_MAP = {
  'Unilateral NDA': UnilateralNDA,
  'Mutual NDA': MutualNDA,
  'Multilateral NDA': MultilateralNDA,
  'Employee NDA': EmployeeNDA,
  'Contractor/Vendor NDA': ContractorVendorNDA,
  'Investor NDA': InvestorNDA,
  'Customer NDA': CustomerNDA,
  'Standard/General NDA': StandardNDA,
  'Confidentiality Agreement': ConfidentialityAgreement,
  'Non-Circumvention Agreement': NonCircumventionNDA,
  'Non-Use NDA': NonUseNDA,
};

// Get the correct template for the NDA type
const getTemplate = (ndaType) => {
  return TEMPLATE_MAP[ndaType] || StandardNDA; // Fallback to StandardNDA if not found
};

export const buildNdaHtml = (nda) => {
  console.log('Building NDA for type:', nda.ndaType);
  const templateFn = getTemplate(nda.ndaType);
  return templateFn({ nda, escapeHtml, formatDate });
};

export const openNdaPrintPreview = (nda) => {
  const html = buildNdaHtml(nda);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');

  if (!win) {
    alert('Please allow popups to view or print the NDA.');
    return;
  }

  setTimeout(() => {
    win.print();
  }, 800);
};