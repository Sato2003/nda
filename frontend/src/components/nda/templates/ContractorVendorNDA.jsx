export const ContractorVendorNDA = ({ nda, escapeHtml, formatDate }) => {
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Vendor NDA - ${nda.ndaId}</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; margin: 55px; background: #e9ecef; }
    .card { background: white; padding: 35px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .badge { display: inline-block; background: #0d6efd; color: white; padding: 2px 12px; border-radius: 15px; font-size: 10px; margin-bottom: 15px; }
    .header { border-left: 5px solid #0d6efd; padding-left: 20px; margin-bottom: 30px; }
    .header h1 { font-size: 20px; margin: 0; color: #212529; }
    .vendor-box { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #dee2e6; }
    .restriction { background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 15px 0; }
    .compliance-list { list-style: none; padding: 0; }
    .compliance-list li { margin: 12px 0; padding-left: 25px; position: relative; }
    .compliance-list li:before { content: "✓"; position: absolute; left: 0; color: #198754; font-weight: bold; }
    .sign-row { margin-top: 40px; display: flex; gap: 40px; }
    .footer { margin-top: 30px; text-align: center; font-size: 9px; color: #6c757d; }
  </style>
</head>
<body>
<div class="card">
  <div class="badge">THIRD-PARTY ACCESS AGREEMENT</div>

  <div class="header">
    <h1>CONTRACTOR / VENDOR<br>NON-DISCLOSURE AGREEMENT</h1>
    <p>Vendor Confidentiality & Data Protection Agreement</p>
  </div>

  <p><strong>Effective Date:</strong> ${new Date(nda.generatedDate).toLocaleDateString()}<br>
  <strong>NDA ID:</strong> ${nda.ndaId}<br>
  <strong>Expires:</strong> ${new Date(nda.expirationDate).toLocaleDateString()}</p>

  <div class="vendor-box">
    <strong> COMPANY (Disclosing Party):</strong><br>
    ${nda.companyName || 'TechGuard Solutions Inc.'}<br>
    ${nda.disclosingAddress || '123 Business Ave, Wilmington, DE 19801'}<br><br>

    <strong> VENDOR/CONTRACTOR (Receiving Party):</strong><br>
    ${nda.partnerName}<br>
    ${nda.partnerEmail}<br>
    ${nda.receivingAddress || 'Address to be provided'}
  </div>

  <h3 style="color: #0d6efd; margin-top: 25px;">SERVICE PROVIDER CONFIDENTIALITY OBLIGATIONS</h3>

  <p>This Contractor/Vendor NDA governs confidential information disclosed to an external service provider, contractor, consultant, or vendor in connection with performing services, accessing systems, or evaluating a proposed engagement.</p>

  <h4>1. SCOPE OF CONFIDENTIAL INFORMATION</h4>
  <p>Confidential Information includes, but is not limited to:</p>
  <ul>
    <li>System credentials, API keys, and security configurations</li>
    <li>Customer data, PII, and business records</li>
    <li>Source code, technical documentation, and infrastructure details</li>
    <li>Business processes, pricing, and vendor agreements</li>
    <li>Proposals, statements of work, and deliverables</li>
  </ul>

  <h4>2. VENDOR OBLIGATIONS</h4>
  <p>The Vendor/Contractor agrees to:</p>
  <ul class="compliance-list">
    <li>Use Confidential Information ONLY to perform the agreed services</li>
    <li>Maintain industry-standard security controls for data protection</li>
    <li>Limit access to personnel directly assigned to the service engagement</li>
    <li>Not subcontract any work involving Confidential Information without prior written approval</li>
    <li>Notify the Company immediately of any data breach or unauthorized access</li>
    <li>Complete annual security and confidentiality training</li>
  </ul>

  <div class="restriction">
    <strong>⚠ SUBCONTRACTOR RESTRICTION:</strong> Vendor may NOT share Confidential Information with subcontractors without the Company's explicit written consent. Vendor remains fully liable for any subcontractor's breach.
  </div>

  <h4>3. DATA RETURN AND DESTRUCTION</h4>
  <p>Upon contract termination or Company request, Vendor must:</p>
  <ul>
    <li>Return all physical materials containing Confidential Information</li>
    <li>Permanently delete all electronic copies from all systems</li>
    <li>Provide a written certification of destruction</li>
    <li>Allow the Company to audit compliance with this provision</li>
  </ul>

  <h4>4. SECURITY INCIDENT RESPONSE</h4>
  <p>Vendor agrees to notify the Company within <strong>24 hours</strong> of discovering any actual or suspected unauthorized access, disclosure, or loss of Confidential Information. Vendor will cooperate fully with the Company's incident response and investigation.</p>

  <h4>5. TERM AND SURVIVAL</h4>
  <p>This Agreement remains effective during the service period and for <strong>three (3) years</strong> after termination. Confidentiality obligations for trade secrets survive indefinitely.</p>

  <h4>6. GOVERNING LAW</h4>
  <p>This Agreement is governed by the laws of the State of Delaware. The Company may seek injunctive relief for any breach or threatened breach.</p>

  ${nda.notes ? `<h4>7. ADDITIONAL TERMS</h4><p>${nda.notes}</p>` : ''}

  <div class="sign-row">
    <div style="flex:1">
      <strong>COMPANY REPRESENTATIVE:</strong><br>
      Signature: _________________________<br>
      Printed Name: _________________<br>
      Date: ${new Date().toLocaleDateString()}
    </div>
    <div style="flex:1">
      <strong>VENDOR/CONTRACTOR:</strong><br>
      Signature: _________________________<br>
      Printed Name: ${nda.partnerName}<br>
      Date: _________________
    </div>
  </div>

  <div class="footer">
    Vendor NDA ${nda.ndaId} | Confidential & Proprietary<br>
    Unauthorized disclosure may result in contract termination and legal action.
  </div>
</div>
</body>
</html>
`;
};