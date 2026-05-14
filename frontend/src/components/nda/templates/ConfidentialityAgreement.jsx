export const ConfidentialityAgreement = ({ nda, escapeHtml, formatDate }) => {
return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Confidentiality Agreement - ${nda.ndaId}</title>
  <style>
    body { font-family: 'Courier New', monospace; margin: 60px; background: #fefefe; }
    .letter { max-width: 700px; margin: 0 auto; }
    .letterhead { text-align: center; margin-bottom: 35px; }
    .letterhead h1 { font-size: 16px; text-transform: uppercase; letter-spacing: 1px; }
    .recipient { margin: 25px 0; }
    .content { margin: 20px 0; }
    .signature { margin: 50px 0 20px; }
    .footer { margin-top: 35px; border-top: 1px dashed #ccc; padding-top: 15px; font-size: 10px; text-align: center; }
  </style>
</head>
<body>
<div class="letter">
  <div class="letterhead">
    <h1>CONFIDENTIALITY AGREEMENT</h1>
    <p>Broad Secrecy Terms for Business Discussions</p>
  </div>

  <p>${new Date(nda.generatedDate).toLocaleDateString()}</p>

  <div class="recipient">
    <strong>TO:</strong> ${nda.partnerName}<br>
    <strong>ATTN:</strong> ${nda.partnerEmail}<br>
    <strong>FROM:</strong> ${nda.companyName || 'TechGuard Solutions Inc.'}<br>
    <strong>CONTACT:</strong> ${nda.signerName} (${nda.signerEmail})
  </div>

  <div class="content">
    <p><strong>RE: Confidentiality Agreement Regarding Business Discussions</strong></p>

    <p>This Confidentiality Agreement confirms our understanding regarding the protection of confidential information that may be disclosed between the parties.</p>

    <h3>1. Confidential Information Defined</h3>
    <p>All information disclosed in meetings, documents, presentations, emails, or other communications shall be considered "Confidential Information" if its nature or context indicates it should be treated as confidential, including but not limited to business plans, financial information, customer data, technical specifications, and strategic initiatives.</p>

    <h3>2. Confidentiality Obligations</h3>
    <p>The Receiving Party agrees to:</p>
    <ul>
      <li>Maintain strict confidentiality of all information shared</li>
      <li>Not disclose Confidential Information to third parties</li>
      <li>Use Confidential Information only for evaluating the proposed relationship</li>
      <li>Implement reasonable security measures to protect information</li>
      <li>Notify the Disclosing Party promptly of any suspected breach</li>
    </ul>

    <h3>3. Permitted Disclosures</h3>
    <p>Disclosure may be made to employees, advisers, and representatives who need to know for the purpose of the discussions, provided they are bound by similar confidentiality obligations.</p>

    <h3>4. Exclusions</h3>
    <p>Information that is or becomes public, was already known, or is independently developed is not subject to this Agreement.</p>

    <h3>5. Term</h3>
    <p>This Agreement remains in effect until <strong>${new Date(nda.expirationDate).toLocaleDateString()}</strong>. Obligations survive termination for <strong>three (3) years</strong>.</p>

    <h3>6. Governing Law</h3>
    <p>This Agreement is governed by the laws of Delaware.</p>

    ${nda.notes ? `<h3>7. Additional Provisions</h3><p>${nda.notes}</p>` : ''}
  </div>

  <div class="signature">
    <p>Please acknowledge your acceptance of this Confidentiality Agreement by signing below.</p>
    <p><strong>Acknowledged and Agreed:</strong></p>
    <p>___________________________________<br>
    Signature<br>
    ${nda.partnerName}<br>
    Date: _________________</p>
  </div>

  <div class="footer">
    Confidentiality Agreement ${nda.ndaId} | Protect Sensitive Information
  </div>
</div>
</body>
</html>
`;
};