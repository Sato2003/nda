export const MultilateralNDA = ({ nda, escapeHtml, formatDate }) => {
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Multilateral NDA - ${nda.ndaId}</title>
  <style>
    body { font-family: 'Arial', sans-serif; margin: 50px; background: #f0f4f8; }
    .agreement { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #2c5282; }
    .header h1 { color: #2c5282; font-size: 20px; text-transform: uppercase; }
    .header h2 { font-size: 14px; color: #4a5568; font-weight: normal; }
    .party-list { background: #ebf4ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .party-item { margin: 8px 0; padding-left: 20px; }
    .section { margin: 25px 0; }
    .section-title { font-weight: bold; font-size: 13px; color: #2c5282; background: #e2e8f0; padding: 6px 12px; border-radius: 4px; }
    .multi-signature { margin-top: 40px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; }
    .sig-card { border: 1px solid #cbd5e0; padding: 15px; border-radius: 6px; background: #fafbfe; }
    .footer { margin-top: 35px; text-align: center; font-size: 9px; color: #718096; border-top: 1px solid #e2e8f0; padding-top: 15px; }
  </style>
</head>
<body>
<div class="agreement">
  <div class="header">
    <h1>MULTILATERAL NON-DISCLOSURE AGREEMENT</h1>
    <h2>Multi-Party Confidentiality Framework</h2>
    <p><strong>Effective Date:</strong> ${new Date(nda.generatedDate).toLocaleDateString()}</p>
  </div>

  <div class="party-list">
    <strong>PARTICIPATING PARTIES:</strong>
    <div class="party-item">1. <strong>${nda.companyName || 'TechGuard Solutions Inc.'}</strong> (Disclosing/Receiving Party)<br>
      Address: ${nda.disclosingAddress || '123 Business Ave, Wilmington, DE 19801'}</div>
    <div class="party-item">2. <strong>${nda.signerName}</strong> (Disclosing/Receiving Party)<br>
      Email: ${nda.signerEmail}</div>
    <div class="party-item">3. <strong>${nda.partnerName}</strong> (Disclosing/Receiving Party)<br>
      Email: ${nda.partnerEmail}</div>
  </div>

  <div class="section">
    <div class="section-title">1. MULTI-PARTY PURPOSE</div>
    <p>This Multilateral NDA governs the exchange of confidential information among three or more parties (collectively, the "Participants") for the purpose of evaluating, negotiating, or performing a shared transaction, project, or business opportunity. Each Participant acknowledges that multiple parties may disclose information to, or receive information from, any other Participant.</p>
  </div>

  <div class="section">
    <div class="section-title">2. DEFINITION OF CONFIDENTIAL INFORMATION</div>
    <p>"Confidential Information" means any non-public information disclosed by any Participant to any other Participant, including:</p>
    <ul>
      <li>Proprietary business, technical, or financial information</li>
      <li>Data room materials, presentations, and documentation</li>
      <li>Negotiation strategies and transaction terms</li>
      <li>Intellectual property, trade secrets, and know-how</li>
      <li>Participant lists and relationship information</li>
    </ul>
  </div>

  <div class="section">
    <div class="section-title">3. OBLIGATIONS OF ALL PARTICIPANTS</div>
    <p>Each Participant, when acting as a Receiving Party, agrees to:</p>
    <ul>
      <li>Protect all Confidential Information received from any other Participant</li>
      <li>Use Confidential Information only for the authorized joint purpose</li>
      <li>Not disclose Confidential Information to non-participants without unanimous written consent</li>
      <li>Ensure all representatives, advisors, and affiliates comply with these terms</li>
      <li>Promptly report any suspected breach to all other Participants</li>
    </ul>
  </div>

  <div class="section">
    <div class="section-title">4. COORDINATED EXCLUSIONS</div>
    <p>Information is not considered Confidential if it:</p>
    <ul>
      <li>Becomes public through no fault of the Receiving Party</li>
      <li>Was lawfully known to the Receiving Party before multilateral disclosure</li>
      <li>Is independently developed without reference to other Participants' information</li>
    </ul>
  </div>

  <div class="section">
    <div class="section-title">5. PROJECT RING-FENCING</div>
    <p>All Participants agree not to use any other Participant's Confidential Information for any purpose outside the approved multilateral project. No Participant may repurpose another Participant's data for a separate transaction, competing proposal, or unrelated initiative without express written permission from all affected Participants.</p>
  </div>

  <div class="section">
    <div class="section-title">6. TERM AND SURVIVAL</div>
    <p>This Agreement continues through the project period and expires on <strong>${new Date(nda.expirationDate).toLocaleDateString()}</strong>. Confidentiality obligations survive for <strong>four (4) years</strong> after a Participant's participation ends, or longer for trade secrets.</p>
  </div>

  <div class="section">
    <div class="section-title">7. GOVERNING LAW AND DISPUTES</div>
    <p>This Agreement is governed by the laws of the State of Delaware. Any disputes involving multiple Participants shall be resolved through binding arbitration in Wilmington, Delaware.</p>
  </div>

  ${nda.notes ? `<div class="section"><div class="section-title">8. SUPPLEMENTAL TERMS</div><p>${nda.notes}</p></div>` : ''}

  <div class="multi-signature">
    <div class="sig-card">
      <strong>${nda.companyName || 'TechGuard Solutions Inc.'}</strong><br>
      Signature: _________________________<br>
      Date: ${new Date().toLocaleDateString()}
    </div>
    <div class="sig-card">
      <strong>${nda.signerName}</strong><br>
      Signature: _________________________<br>
      Date: ${nda.status === 'signed' && nda.signedAt ? new Date(nda.signedAt).toLocaleDateString() : '_________________'}
    </div>
    <div class="sig-card">
      <strong>${nda.partnerName}</strong><br>
      Signature: _________________________<br>
      Date: _________________
    </div>
  </div>

  <div class="footer">
    Multilateral NDA ${nda.ndaId} | All Participants Bound | Confidential
  </div>
</div>
</body>
</html>
`;
};