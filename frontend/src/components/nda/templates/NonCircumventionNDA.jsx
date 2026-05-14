export const NonCircumventionNDA = ({ nda, escapeHtml, formatDate }) => {
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Non-Circumvention - ${nda.ndaId}</title>
  <style>
    body { font-family: 'Times New Roman', serif; margin: 55px; }
    .border-box { border: 2px solid #8b0000; padding: 35px; }
    .title { text-align: center; color: #8b0000; margin-bottom: 25px; }
    .title h1 { font-size: 22px; }
    .highlight { background: #fff0f0; padding: 15px; margin: 20px 0; border-left: 5px solid #8b0000; }
    .circumvention-clause { font-weight: bold; color: #8b0000; }
    .penalty { background: #f8f9fa; padding: 12px; margin: 15px 0; border: 1px solid #ddd; }
    .signatures { margin-top: 50px; display: flex; gap: 40px; }
    .footer { margin-top: 35px; text-align: center; font-size: 9px; }
  </style>
</head>
<body>
<div class="border-box">
  <div class="title">
    <h1>NON-CIRCUMVENTION AGREEMENT</h1>
    <p>Relationship & Opportunity Protection</p>
  </div>

  <p><strong>Effective Date:</strong> ${new Date(nda.generatedDate).toLocaleDateString()}<br>
  <strong>NDA ID:</strong> ${nda.ndaId}</p>

  <div class="highlight">
    <strong>PARTIES:</strong><br>
    <strong>Introducing Party:</strong> ${nda.companyName || 'TechGuard Solutions Inc.'}<br>
    <strong>Receiving Party:</strong> ${nda.partnerName}<br>
    <strong>Contact Person:</strong> ${nda.signerName} (${nda.signerEmail})
  </div>

  <h3>1. PURPOSE</h3>
  <p>This Non-Circumvention Agreement protects business opportunities, contacts, and relationships introduced by one party to another. The Receiving Party acknowledges that the Introducing Party has invested significant time and resources in developing these relationships and opportunities.</p>

  <h3>2. PROTECTED INFORMATION</h3>
  <p>"Protected Information" includes:</p>
  <ul>
    <li>Introduced contacts, counterparties, and decision-makers</li>
    <li>Deal structures, terms, and opportunity details</li>
    <li>Pricing frameworks and financial information</li>
    <li>Referral sources and channel relationships</li>
    <li>Confidential data supporting the introduced opportunity</li>
  </ul>

  <div class="circumvention-clause">
    <h3>3. NON-CIRCUMVENTION COVENANT</h3>
    <p>The Receiving Party agrees NOT to circumvent, bypass, or exclude the Introducing Party from any business opportunity, contact, or relationship introduced under this Agreement. Specifically, the Receiving Party shall not:</p>
    <ul>
      <li>Contact, negotiate with, or transact directly with any introduced contact without the Introducing Party's involvement</li>
      <li>Restructure a transaction to exclude the Introducing Party's participation or compensation</li>
      <li>Share introduced opportunities with competitors or third parties</li>
      <li>Use Protected Information to create competing arrangements</li>
    </ul>
  </div>

  <div class="penalty">
    <strong>⚠ BREACH REMEDIES:</strong> In the event of circumvention, the Receiving Party shall pay the Introducing Party a fee equal to <strong>15% of all gross revenues, fees, or consideration</strong> received from the circumvention transaction, plus all legal costs and expenses incurred in enforcing this Agreement. The prevailing party shall be entitled to injunctive relief and treble damages.
  </div>

  <h3>4. PROTECTED PERIOD</h3>
  <p>This non-circumvention obligation applies for a period of <strong>two (2) years</strong> from the Effective Date, or for <strong>18 months</strong> after the last introduction, whichever is longer.</p>

  <h3>5. EXCLUSIONS</h3>
  <p>This Agreement does not apply to:</p>
  <ul>
    <li>Contacts or opportunities already known to the Receiving Party before introduction (written proof required)</li>
    <li>Opportunities that become publicly available without breach</li>
    <li>Relationships expressly released in writing by the Introducing Party</li>
  </ul>

  <h3>6. INDEPENDENT RELATIONSHIPS</h3>
  <p>The Receiving Party may pursue relationships independently developed without use of Protected Information, provided written documentation of independent development exists.</p>

  <h3>7. GOVERNING LAW</h3>
  <p>This Agreement is governed by the laws of Delaware. The parties agree that circumvention would cause irreparable harm, making injunctive relief appropriate without posting bond.</p>

  ${nda.notes ? `<h3>8. ADDITIONAL TERMS</h3><p>${nda.notes}</p>` : ''}

  <div class="signatures">
    <div>
      <strong>INTRODUCING PARTY:</strong><br>
      Signature: _________________<br>
      Name: _________________<br>
      Date: ${new Date().toLocaleDateString()}
    </div>
    <div>
      <strong>RECEIVING PARTY:</strong><br>
      Signature: _________________<br>
      Name: ${nda.partnerName}<br>
      Date: _________________
    </div>
  </div>

  <div class="footer">
    Non-Circumvention Agreement ${nda.ndaId} | Protected Until ${new Date(nda.expirationDate).toLocaleDateString()}
  </div>
</div>
</body>
</html>
`;
};