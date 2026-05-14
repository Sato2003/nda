export const StandardNDA = ({ nda, escapeHtml, formatDate }) => {
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Standard NDA - ${nda.ndaId}</title>
  <style>
    body { font-family: 'Arial', sans-serif; margin: 50px; line-height: 1.5; }
    .doc { border: 1px solid #ddd; padding: 40px; background: white; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
    .title { text-align: center; margin-bottom: 30px; }
    .title h1 { font-size: 20px; text-transform: uppercase; }
    .field { margin: 8px 0; }
    .field-label { font-weight: bold; display: inline-block; width: 160px; }
    .section { margin: 20px 0; }
    .section h3 { font-size: 14px; background: #f0f0f0; padding: 5px 10px; margin: 0 -10px 10px -10px; }
    .sign-block { margin-top: 40px; display: flex; justify-content: space-between; }
    .footer { margin-top: 35px; text-align: center; font-size: 9px; border-top: 1px solid #eee; padding-top: 15px; }
  </style>
</head>
<body>
<div class="doc">
  <div class="title">
    <h1>NON-DISCLOSURE AGREEMENT</h1>
    <p>Standard General-Purpose Confidentiality Agreement</p>
  </div>

  <div class="field"><span class="field-label">Agreement Date:</span> ${new Date(nda.generatedDate).toLocaleDateString()}</div>
  <div class="field"><span class="field-label">NDA ID:</span> ${nda.ndaId}</div>
  <div class="field"><span class="field-label">Expiration:</span> ${new Date(nda.expirationDate).toLocaleDateString()}</div>

  <div class="field"><span class="field-label">Disclosing Party:</span> ${nda.companyName || 'TechGuard Solutions Inc.'}</div>
  <div class="field"><span class="field-label">Address:</span> ${nda.disclosingAddress || '123 Business Ave, Wilmington, DE 19801'}</div>

  <div class="field"><span class="field-label">Receiving Party:</span> ${nda.signerName}</div>
  <div class="field"><span class="field-label">Email:</span> ${nda.signerEmail}</div>

  <div class="field"><span class="field-label">Partner/Third Party:</span> ${nda.partnerName}</div>
  <div class="field"><span class="field-label">Partner Email:</span> ${nda.partnerEmail}</div>

  <div class="section">
    <h3>1. CONFIDENTIAL INFORMATION</h3>
    <p>"Confidential Information" means any non-public business, technical, operational, or strategic information disclosed by the Disclosing Party, whether oral, written, electronic, or visual, that is reasonably understood to be confidential.</p>
  </div>

  <div class="section">
    <h3>2. OBLIGATIONS</h3>
    <p>The Receiving Party agrees to:</p>
    <ul>
      <li>Maintain the confidentiality of all Confidential Information</li>
      <li>Use Confidential Information only for the agreed business purpose</li>
      <li>Limit access to employees with a need to know</li>
      <li>Not copy or distribute confidential materials without permission</li>
      <li>Return or destroy Confidential Information upon request</li>
    </ul>
  </div>

  <div class="section">
    <h3>3. EXCLUSIONS</h3>
    <p>Confidential Information does not include:</p>
    <ul>
      <li>Publicly available information</li>
      <li>Information already known to Receiving Party</li>
      <li>Information independently developed</li>
      <li>Information required by law to be disclosed</li>
    </ul>
  </div>

  <div class="section">
    <h3>4. NO LICENSE</h3>
    <p>No intellectual property license or ownership rights are granted under this Agreement. Confidential Information remains the property of the Disclosing Party.</p>
  </div>

  <div class="section">
    <h3>5. TERM</h3>
    <p>This Agreement remains effective for <strong>${nda.duration || '1'} year(s)</strong>. Confidentiality obligations survive for <strong>three (3) years</strong>.</p>
  </div>

  <div class="section">
    <h3>6. GOVERNING LAW</h3>
    <p>This Agreement is governed by the laws of Delaware.</p>
  </div>

  ${nda.notes ? `<div class="section"><h3>7. ADDITIONAL TERMS</h3><p>${nda.notes}</p></div>` : ''}

  <div class="sign-block">
    <div>
      <strong>DISCLOSING PARTY:</strong><br>
      Signature: _________________<br>
      Date: ${new Date().toLocaleDateString()}
    </div>
    <div>
      <strong>RECEIVING PARTY:</strong><br>
      Signature: _________________<br>
      Date: ${nda.status === 'signed' && nda.signedAt ? new Date(nda.signedAt).toLocaleDateString() : '_________________'}
    </div>
  </div>

  <div class="footer">
    Standard NDA ${nda.ndaId} | General Business Confidentiality
  </div>
</div>
</body>
</html>
`;
};