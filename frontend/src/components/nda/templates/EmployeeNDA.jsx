export const EmployeeNDA = ({ nda, escapeHtml, formatDate }) => {
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Employee NDA - ${nda.ndaId}</title>
  <style>
    body { font-family: 'Calibri', sans-serif; margin: 45px; }
    .letterhead { border-bottom: 3px solid #1e3a5f; margin-bottom: 25px; padding-bottom: 10px; }
    .letterhead .company { font-size: 20px; font-weight: bold; color: #1e3a5f; }
    .letterhead .tagline { font-size: 10px; color: #6c757d; }
    .title { text-align: center; margin: 30px 0; }
    .title h1 { font-size: 18px; text-transform: uppercase; letter-spacing: 1px; }
    .employee-box { background: #f8f9fa; border-left: 4px solid #1e3a5f; padding: 15px; margin: 20px 0; }
    .policy-section { margin: 20px 0; }
    .policy-title { font-weight: bold; color: #1e3a5f; border-bottom: 1px solid #dee2e6; padding-bottom: 5px; }
    .warning { background: #fff3cd; border: 1px solid #ffecb5; padding: 12px; margin: 20px 0; border-radius: 5px; font-size: 12px; }
    .signature-area { margin-top: 40px; display: flex; justify-content: space-between; }
    .footer { margin-top: 30px; font-size: 9px; text-align: center; color: #6c757d; border-top: 1px solid #dee2e6; padding-top: 10px; }
  </style>
</head>
<body>
<div class="letterhead">
  <div class="company">${nda.companyName || 'TECHGUARD SOLUTIONS INC.'}</div>
  <div class="tagline">Confidential Information Protection Program</div>
</div>

<div class="title">
  <h1>EMPLOYEE NON-DISCLOSURE AGREEMENT</h1>
  <p>(Employment Confidentiality Appendix)</p>
</div>

<p>This Employee Non-Disclosure Agreement is entered into between <strong>${nda.companyName || 'TechGuard Solutions Inc.'}</strong> (the "Company") and the undersigned employee (the "Employee").</p>

<div class="employee-box">
  <strong>EMPLOYEE INFORMATION:</strong><br>
  Name: ${nda.signerName}<br>
  Email: ${nda.signerEmail}<br>
  Position: Employee/Contractor<br>
  Start Date: ${new Date(nda.generatedDate).toLocaleDateString()}
</div>

<div class="policy-section">
  <div class="policy-title">1. COMPANY CONFIDENTIAL INFORMATION</div>
  <p>During employment, the Employee will have access to confidential information belonging to the Company, including:</p>
  <ul>
    <li>Trade secrets, proprietary technology, and intellectual property</li>
    <li>Source code, algorithms, and software architecture</li>
    <li>Customer lists, contracts, and pricing structures</li>
    <li>Financial data, business plans, and strategic initiatives</li>
    <li>Internal policies, security protocols, and employee information</li>
    <li>Unannounced products, features, and roadmaps</li>
  </ul>
</div>

<div class="policy-section">
  <div class="policy-title">2. EMPLOYEE OBLIGATIONS</div>
  <p>The Employee agrees to:</p>
  <ul>
    <li>Use Company confidential information ONLY for authorized work purposes</li>
    <li>Not disclose any confidential information to unauthorized persons, including family members or friends</li>
    <li>Not remove company documents, files, or data from company premises without authorization</li>
    <li>Not copy, photograph, or transmit confidential information to personal devices or accounts</li>
    <li>Protect all login credentials, access cards, and security tokens</li>
    <li>Report any suspected security breach or unauthorized disclosure immediately</li>
  </ul>
</div>

<div class="policy-section">
  <div class="policy-title">3. POST-EMPLOYMENT OBLIGATIONS</div>
  <p>The Employee acknowledges that confidentiality obligations CONTINUE AFTER EMPLOYMENT ENDS. Upon separation from the Company, the Employee must:</p>
  <ul>
    <li>Return all company property, including laptops, phones, documents, and access cards</li>
    <li>Delete all company data from personal devices</li>
    <li>Not use or disclose any trade secrets or confidential information for future employment</li>
    <li>Not solicit company customers or employees for <strong>12 months</strong> after termination</li>
  </ul>
</div>

<div class="policy-section">
  <div class="policy-title">4. INTELLECTUAL PROPERTY ASSIGNMENT</div>
  <p>The Employee agrees that any work product, inventions, code, or materials created during employment relating to the Company's business shall be the sole property of the Company. The Employee will cooperate in assigning any necessary intellectual property rights to the Company.</p>
</div>

<div class="policy-section">
  <div class="policy-title">5. TERM AND SURVIVAL</div>
  <p>This Agreement remains in effect during employment and continues indefinitely for trade secrets, and for <strong>three (3) years</strong> after termination for other confidential information.</p>
</div>

<div class="warning">
  <strong>⚠ IMPORTANT NOTICE:</strong> Violation of this Employee NDA may result in immediate termination, legal action, damages, and injunctive relief. The Company takes confidentiality breaches seriously.
</div>

${nda.notes ? `<div class="policy-section"><div class="policy-title">6. ADDITIONAL CONDITIONS</div><p>${nda.notes}</p></div>` : ''}

<div class="signature-area">
  <div>
    <strong>FOR THE COMPANY:</strong><br>
    Signature: _________________________<br>
    Name: _________________<br>
    Date: ${new Date().toLocaleDateString()}
  </div>
  <div>
    <strong>EMPLOYEE ACKNOWLEDGMENT:</strong><br>
    Signature: _________________________<br>
    Name: ${nda.signerName}<br>
    Date: ${nda.status === 'signed' && nda.signedAt ? new Date(nda.signedAt).toLocaleDateString() : '_________________'}
  </div>
</div>

<div class="footer">
  Employee NDA ID: ${nda.ndaId} | Expires: ${new Date(nda.expirationDate).toLocaleDateString()}<br>
  This document is legally binding and part of the employee's terms of engagement.
</div>
</body>
</html>
`;
};