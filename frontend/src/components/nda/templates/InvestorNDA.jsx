export const InvestorNDA = ({ nda, escapeHtml, formatDate }) => {
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Investor NDA - ${nda.ndaId}</title>
  <style>
    body { font-family: 'Garamond', serif; margin: 65px; background: #fdfbf7; }
    .letter { max-width: 800px; margin: 0 auto; }
    .watermark { opacity: 0.05; position: fixed; font-size: 60px; transform: rotate(-45deg); pointer-events: none; }
    .header { text-align: center; margin-bottom: 35px; }
    .header .logo { font-size: 28px; font-weight: bold; color: #2d3748; }
    .header .doc-type { font-size: 12px; color: #718096; letter-spacing: 3px; }
    .investor-note { background: #f0fff4; border: 1px solid #9ae6b4; padding: 12px 20px; margin: 25px 0; border-radius: 8px; }
    .valuation { background: #ebf8ff; padding: 15px; margin: 20px 0; border-radius: 6px; font-size: 13px; }
    .clause { margin: 22px 0; }
    .clause h4 { color: #2b6cb0; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
    .no-commitment { background: #fef5e7; border-left: 4px solid #ed8936; padding: 12px; margin: 20px 0; font-size: 12px; }
    .signatures { margin-top: 55px; display: flex; justify-content: space-between; }
    .footer { margin-top: 40px; font-size: 9px; text-align: center; color: #a0aec0; }
  </style>
</head>
<body>
<div class="watermark">CONFIDENTIAL - INVESTOR DILIGENCE</div>
<div class="letter">
  <div class="header">
    <div class="logo">${nda.companyName || 'TECHGUARD SOLUTIONS INC.'}</div>
    <div class="doc-type">INVESTOR NON-DISCLOSURE AGREEMENT</div>
    <p>For Due Diligence & Financing Discussions</p>
  </div>

  <p><strong>Date:</strong> ${new Date(nda.generatedDate).toLocaleDateString()}<br>
  <strong>NDA ID:</strong> ${nda.ndaId}<br>
  <strong>Expiration:</strong> ${new Date(nda.expirationDate).toLocaleDateString()}</p>

  <div class="investor-note">
    <strong>PARTIES TO THIS AGREEMENT:</strong><br>
    <strong>Company:</strong> ${nda.companyName || 'TechGuard Solutions Inc.'}<br>
    <strong>Investor/Recipient:</strong> ${nda.partnerName}<br>
    <strong>Investor Contact:</strong> ${nda.partnerEmail}<br>
    <strong>Company Representative:</strong> ${nda.signerName} (${nda.signerEmail})
  </div>

  <div class="valuation">
    <strong>PURPOSE OF DISCLOSURE:</strong> This Agreement facilitates the disclosure of confidential information in connection with the Investor's evaluation of a potential investment, financing, acquisition, or strategic transaction with the Company.
  </div>

  <div class="clause">
    <h4>1. CONFIDENTIAL INFORMATION DEFINITION</h4>
    <p>For purposes of this Investor NDA, "Confidential Information" includes:</p>
    <ul>
      <li>Financial statements, projections, valuations, and capitalization tables</li>
      <li>Business plans, market analyses, and growth strategies</li>
      <li>Product roadmaps, intellectual property, and technical specifications</li>
      <li>Customer contracts, pipeline data, and key metrics</li>
      <li>Due diligence materials provided in data rooms or meetings</li>
      <li>Term sheets, valuation discussions, and proposed transaction terms</li>
      <li>Any information marked "Confidential" or reasonably understood as such</li>
    </ul>
  </div>

  <div class="clause">
    <h4>2. INVESTOR OBLIGATIONS</h4>
    <p>The Investor agrees to:</p>
    <ul>
      <li>Use Confidential Information SOLELY for evaluating a potential investment</li>
      <li>Maintain strict confidentiality of all materials and discussions</li>
      <li>Not disclose any information to competitors or unauthorized third parties</li>
      <li>Limit access to partners, employees, and advisors with a legitimate need to know</li>
      <li>Not trade securities based on material non-public information</li>
      <li>Return or destroy all diligence materials if no investment is made</li>
    </ul>
  </div>

  <div class="no-commitment">
    <strong>⚠ NO COMMITMENT TO INVEST:</strong> Disclosure of Confidential Information does not obligate either party to proceed with any transaction. The Company reserves the right to negotiate with other investors. The Investor has no obligation to invest or provide financing.
  </div>

  <div class="clause">
    <h4>3. STANDSTILL PROVISION</h4>
    <p>The Investor agrees that for a period of <strong>12 months</strong> from the Effective Date, neither the Investor nor its affiliates will acquire securities of the Company without prior written consent, except as expressly permitted in writing by the Company.</p>
  </div>

  <div class="clause">
    <h4>4. NO SOLICITATION</h4>
    <p>The Investor agrees not to solicit or hire any employee, officer, or key contractor of the Company for <strong>12 months</strong> following the Effective Date.</p>
  </div>

  <div class="clause">
    <h4>5. TERM AND SURVIVAL</h4>
    <p>This Agreement continues for <strong>${nda.duration || '1'} year(s)</strong> or until <strong>${new Date(nda.expirationDate).toLocaleDateString()}</strong>. Confidentiality obligations survive for <strong>two (2) years</strong> after termination or indefinitely for trade secrets.</p>
  </div>

  <div class="clause">
    <h4>6. GOVERNING LAW</h4>
    <p>This Agreement is governed by the laws of the State of Delaware. Disputes shall be resolved through binding arbitration in Wilmington, Delaware.</p>
  </div>

  ${nda.notes ? `<div class="clause"><h4>7. ADDITIONAL TERMS</h4><p>${nda.notes}</p></div>` : ''}

  <div class="signatures">
    <div>
      <strong>${nda.companyName || 'TECHGUARD SOLUTIONS INC.'}</strong><br>
      By: _________________________<br>
      Name: _________________<br>
      Title: _________________<br>
      Date: ${new Date().toLocaleDateString()}
    </div>
    <div>
      <strong>INVESTOR:</strong><br>
      By: _________________________<br>
      Name: ${nda.partnerName}<br>
      Title: Authorized Signatory<br>
      Date: _________________
    </div>
  </div>

  <div class="footer">
    Investor NDA ${nda.ndaId} | Strictly Confidential | For Due Diligence Purposes Only<br>
    Unauthorized disclosure may violate securities laws.
  </div>
</div>
</body>
</html>
`;
};