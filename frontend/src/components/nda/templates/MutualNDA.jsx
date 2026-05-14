export const MutualNDA = ({ nda, escapeHtml, formatDate }) => {
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Mutual NDA - ${nda.ndaId}</title>
  <style>
    body { font-family: 'Georgia', serif; margin: 55px; line-height: 1.5; }
    .container { border: 2px solid #1a365d; padding: 35px; background: #fafbfe; }
    .title { text-align: center; margin-bottom: 30px; }
    .title h1 { font-size: 24px; color: #1a365d; letter-spacing: 1px; }
    .title .sub { font-size: 12px; color: #4a5568; font-style: italic; }
    .dual-party { display: flex; gap: 40px; margin: 30px 0; justify-content: space-between; }
    .party-box { flex: 1; border: 1px solid #cbd5e0; padding: 15px; border-radius: 8px; background: white; }
    .party-label { font-weight: bold; font-size: 11px; text-transform: uppercase; color: #4a5568; border-bottom: 2px solid #cbd5e0; margin-bottom: 10px; padding-bottom: 5px; }
    .clause-title { font-weight: bold; font-size: 13px; margin-top: 20px; margin-bottom: 8px; color: #1a365d; border-left: 3px solid #1a365d; padding-left: 10px; }
    .signatures { margin-top: 50px; display: flex; gap: 40px; }
    .sig-box { flex: 1; text-align: center; }
    .sig-line { border-top: 1px solid #000; margin-top: 40px; padding-top: 5px; }
    .footer { margin-top: 30px; text-align: center; font-size: 9px; color: #a0aec0; }
  </style>
</head>
<body>
<div class="container">
  <div class="title">
    <h1>MUTUAL NON-DISCLOSURE AGREEMENT</h1>
    <div class="sub">Two-Way Confidentiality for Collaborative Business Relationships</div>
  </div>

  <div class="dual-party">
    <div class="party-box">
      <div class="party-label">Party A (First Discloser)</div>
      <strong>${nda.companyName || 'TechGuard Solutions Inc.'}</strong><br>
      Address: ${nda.disclosingAddress || '123 Business Ave, Wilmington, DE 19801'}<br>
      Contact: ${nda.signerName}<br>
      Email: ${nda.signerEmail}
    </div>
    <div class="party-box">
      <div class="party-label">Party B (Second Discloser)</div>
      <strong>${nda.partnerName}</strong><br>
      Address: ${nda.receivingAddress || '[To be provided]'}<br>
      Contact: Partner Representative<br>
      Email: ${nda.partnerEmail}
    </div>
  </div>

  <p><strong>Effective Date:</strong> ${new Date(nda.generatedDate).toLocaleDateString()}<br>
  <strong>Expiration Date:</strong> ${new Date(nda.expirationDate).toLocaleDateString()}</p>

  <div class="clause-title">1. RECIPROCAL DISCLOSURE PURPOSE</div>
  <p>The parties wish to explore a potential business relationship, joint venture, partnership, or transaction. In connection with this exploration, each party may disclose to the other certain proprietary and confidential information. Both parties wish to protect such information from unauthorized use or disclosure.</p>

  <div class="clause-title">2. MUTUAL DEFINITION OF CONFIDENTIAL INFORMATION</div>
  <p>"Confidential Information" means any information disclosed by either party, in any form, that relates to:</p>
  <ul>
    <li>Business operations, strategies, and financial performance</li>
    <li>Technical data, research, development, and intellectual property</li>
    <li>Customer and supplier information, contracts, and pricing</li>
    <li>Marketing plans, forecasts, and competitive strategies</li>
    <li>Employee information and internal processes</li>
  </ul>

  <div class="clause-title">3. EQUAL OBLIGATIONS</div>
  <p>Each party, when acting as the Receiving Party, agrees to:</p>
  <ul>
    <li>Protect the Disclosing Party's Confidential Information using reasonable care</li>
    <li>Not use Confidential Information except for the authorized business purpose</li>
    <li>Not disclose Confidential Information to third parties without written consent</li>
    <li>Limit internal access to employees with a legitimate need to know</li>
    <li>Notify the Disclosing Party promptly of any unauthorized disclosure</li>
  </ul>

  <div class="clause-title">4. MUTUAL EXCLUSIONS</div>
  <p>The obligations above do not apply to information that:</p>
  <ul>
    <li>Is or becomes publicly available without breach of this Agreement</li>
    <li>Was lawfully known to the Receiving Party before disclosure</li>
    <li>Is independently developed without use of the Disclosing Party's information</li>
    <li>Is required to be disclosed by law (with advance notice to the Disclosing Party)</li>
  </ul>

  <div class="clause-title">5. TERM AND SURVIVAL</div>
  <p>This Agreement becomes effective on the date first written above and continues for <strong>${nda.duration || '1'} year(s)</strong>. Confidentiality obligations survive termination for <strong>three (3) years</strong> or longer for trade secrets.</p>

  <div class="clause-title">6. NO IMPLIED RIGHTS</div>
  <p>Neither party acquires any license or ownership rights in the other's Confidential Information. All information remains the property of the disclosing party.</p>

  <div class="clause-title">7. GOVERNING LAW</div>
  <p>This Agreement is governed by the laws of the State of Delaware. The parties consent to exclusive jurisdiction in Wilmington, Delaware.</p>

  ${nda.notes ? `<div class="clause-title">8. ADDITIONAL AGREEMENTS</div><p>${nda.notes}</p>` : ''}

  <div class="signatures">
    <div class="sig-box">
      <strong>${nda.companyName || 'TechGuard Solutions Inc.'}</strong><br>
      <div class="sig-line">Authorized Signature</div>
      <div>_________________________</div>
      <div>Printed Name: _________________</div>
      <div>Date: ${new Date().toLocaleDateString()}</div>
    </div>
    <div class="sig-box">
      <strong>${nda.partnerName}</strong><br>
      <div class="sig-line">Authorized Signature</div>
      <div>_________________________</div>
      <div>Printed Name: _________________</div>
      <div>Date: ${nda.status === 'signed' && nda.signedAt ? new Date(nda.signedAt).toLocaleDateString() : '_________________'}</div>
    </div>
  </div>

  <div class="footer">
    NDA ID: ${nda.ndaId} | Generated by NDA Management System<br>
    This Mutual NDA creates binding confidentiality obligations on both parties.
  </div>
</div>
</body>
</html>
`;
};