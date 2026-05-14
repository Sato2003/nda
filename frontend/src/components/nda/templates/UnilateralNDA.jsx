export const UnilateralNDA = ({ nda, escapeHtml, formatDate }) => {
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Unilateral NDA - ${nda.ndaId}</title>
  <style>
    body { font-family: 'Times New Roman', serif; margin: 60px; line-height: 1.6; }
    .header { text-align: center; margin-bottom: 40px; }
    .header h1 { font-size: 22px; text-transform: uppercase; letter-spacing: 2px; }
    .header .type { font-size: 14px; color: #666; border-top: 1px solid #333; display: inline-block; padding-top: 5px; }
    .section { margin: 25px 0; }
    .section-title { font-weight: bold; font-size: 14px; text-transform: uppercase; background: #f5f5f5; padding: 5px 10px; }
    .signature-block { margin-top: 50px; display: flex; justify-content: space-between; }
    .signature-line { margin-top: 40px; border-top: 1px solid #000; width: 200px; padding-top: 5px; }
    .footer { margin-top: 40px; font-size: 10px; text-align: center; color: #999; border-top: 1px solid #eee; padding-top: 15px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>UNILATERAL NON-DISCLOSURE AGREEMENT</h1>
    <div class="type">One-Way Confidentiality Agreement</div>
  </div>

  <p>This Unilateral Non-Disclosure Agreement (the "Agreement") is made and entered into as of <strong>${new Date(nda.generatedDate).toLocaleDateString()}</strong> by and between:</p>

  <p><strong>Disclosing Party:</strong> ${nda.companyName || 'TechGuard Solutions Inc.'}<br>
  Address: ${nda.disclosingAddress || '123 Business Ave, Wilmington, DE 19801'}</p>

  <p><strong>Receiving Party:</strong> ${nda.signerName}<br>
  Email: ${nda.signerEmail}<br>
  Address: ${nda.receivingAddress || '[To be provided]'}</p>

  <p><strong>Partner Organization:</strong> ${nda.partnerName}<br>
  Email: ${nda.partnerEmail}</p>

  <div class="section">
    <div class="section-title">1. Purpose of Disclosure</div>
    <p>The Disclosing Party possesses certain confidential and proprietary information that it wishes to share with the Receiving Party for the sole purpose of <strong>evaluating a potential business relationship, discussing a transaction, or performing specific services</strong>. The Receiving Party agrees to receive and protect such information as set forth below.</p>
  </div>

  <div class="section">
    <div class="section-title">2. Definition of Confidential Information</div>
    <p>"Confidential Information" means any information disclosed by the Disclosing Party, whether orally, in writing, electronically, or by any other means, that is designated as confidential or that a reasonable person would understand to be confidential, including but not limited to:</p>
    <ul>
      <li>Trade secrets, inventions, and intellectual property</li>
      <li>Business plans, financial data, and projections</li>
      <li>Customer lists, supplier information, and pricing strategies</li>
      <li>Technical data, source code, algorithms, and product specifications</li>
      <li>Marketing strategies and upcoming product releases</li>
    </ul>
  </div>

  <div class="section">
    <div class="section-title">3. Obligations of Receiving Party</div>
    <p>The Receiving Party agrees to:</p>
    <ul>
      <li>Hold all Confidential Information in strict confidence using at least the same degree of care used to protect its own confidential information</li>
      <li>Not disclose Confidential Information to any third party without prior written consent</li>
      <li>Use Confidential Information solely for the authorized purpose stated above</li>
      <li>Limit access to employees and representatives who have a specific need to know and are bound by confidentiality obligations at least as restrictive as those in this Agreement</li>
      <li>Not copy, reproduce, or reverse engineer any confidential materials</li>
      <li>Return or destroy all Confidential Information upon request or termination of this Agreement</li>
    </ul>
  </div>

  <div class="section">
    <div class="section-title">4. Exclusions</div>
    <p>Confidential Information does not include information that:</p>
    <ul>
      <li>Is or becomes publicly available through no fault of the Receiving Party</li>
      <li>Was already in the Receiving Party's possession before disclosure, as proven by written records</li>
      <li>Is independently developed by the Receiving Party without reference to Confidential Information</li>
      <li>Is required to be disclosed by law, regulation, or court order (with prompt notice to Disclosing Party)</li>
    </ul>
  </div>

  <div class="section">
    <div class="section-title">5. Term and Survival</div>
    <p>This Agreement shall commence on the Effective Date and continue for a period of <strong>${nda.duration || '1'} year(s)</strong> or until <strong>${new Date(nda.expirationDate).toLocaleDateString()}</strong>, whichever occurs first. The confidentiality obligations set forth herein shall survive termination of this Agreement for an additional <strong>three (3) years</strong>, or perpetually for trade secrets.</p>
  </div>

  <div class="section">
    <div class="section-title">6. No License or Rights</div>
    <p>Nothing in this Agreement grants the Receiving Party any license, ownership interest, or other rights in the Confidential Information. All Confidential Information remains the sole property of the Disclosing Party.</p>
  </div>

  <div class="section">
    <div class="section-title">7. Governing Law</div>
    <p>This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware. Any dispute arising under this Agreement shall be resolved exclusively in the state or federal courts located in Wilmington, Delaware.</p>
  </div>

  ${nda.notes ? `
  <div class="section">
    <div class="section-title">8. Additional Terms</div>
    <p>${nda.notes}</p>
  </div>
  ` : ''}

  <div class="signature-block">
    <div>
      <strong>DISCLOSING PARTY:</strong><br>
      ${nda.companyName || 'TechGuard Solutions Inc.'}<br>
      <div class="signature-line">Signature</div>
      <div>_________________________</div>
      <div>Printed Name: _________________</div>
      <div>Date: ${new Date().toLocaleDateString()}</div>
    </div>
    <div>
      <strong>RECEIVING PARTY:</strong><br>
      ${nda.signerName}<br>
      <div class="signature-line">Signature</div>
      <div>_________________________</div>
      <div>Printed Name: ${nda.signerName}</div>
      <div>Date: ${nda.status === 'signed' && nda.signedAt ? new Date(nda.signedAt).toLocaleDateString() : '_________________'}</div>
    </div>
  </div>

  <div class="footer">
    Document ID: ${nda.ndaId} | Generated on ${new Date().toLocaleString()}<br>
    This is a legally binding document. Unauthorized disclosure may result in legal action.
  </div>
</body>
</html>
`;
};