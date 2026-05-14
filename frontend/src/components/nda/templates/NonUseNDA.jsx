export const NonUseNDA = ({ nda, escapeHtml, formatDate }) => {
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Non-Use NDA - ${nda.ndaId}</title>
  <style>
    body { font-family: 'Verdana', sans-serif; margin: 50px; }
    .restricted { border: 3px solid #dc2626; padding: 30px; background: #fff5f5; }
    .header { text-align: center; color: #dc2626; }
    .header h1 { font-size: 22px; margin-bottom: 5px; }
    .no-use-badge { background: #dc2626; color: white; padding: 8px 16px; text-align: center; font-weight: bold; margin: 20px 0; border-radius: 4px; }
    .strict-covenant { background: #fef2f2; padding: 20px; margin: 20px 0; border-left: 6px solid #dc2626; }
    .prohibited { list-style: none; padding: 0; }
    .prohibited li { margin: 10px 0; padding-left: 25px; position: relative; }
    .prohibited li:before { content: ""; position: absolute; left: 0; }
    .sign-area { margin-top: 45px; display: flex; justify-content: space-between; }
    .footer { margin-top: 35px; text-align: center; font-size: 9px; color: #666; }
  </style>
</head>
<body>
<div class="restricted">
  <div class="header">
    <h1>NON-USE AND NON-DISCLOSURE AGREEMENT</h1>
    <p>Strict Use Restriction Covenant</p>
  </div>

  <div class="no-use-badge">
    ⚠ STRICT NON-USE COVENANT — UNAUTHORIZED USE PROHIBITED ⚠
  </div>

  <p><strong>Effective:</strong> ${new Date(nda.generatedDate).toLocaleDateString()}<br>
  <strong>NDA ID:</strong> ${nda.ndaId}<br>
  <strong>Expires:</strong> ${new Date(nda.expirationDate).toLocaleDateString()}</p>

  <p><strong>Disclosing Party:</strong> ${nda.companyName || 'TechGuard Solutions Inc.'}<br>
  <strong>Receiving Party:</strong> ${nda.partnerName} (${nda.partnerEmail})<br>
  <strong>Authorized Reviewer:</strong> ${nda.signerName}</p>

  <div class="strict-covenant">
    <strong>NON-USE COVENANT:</strong>
    <p>The Receiving Party agrees that Confidential Information may NOT be used for ANY purpose other than the expressly authorized evaluation described herein. This prohibition applies regardless of whether disclosure to third parties occurs.</p>
  </div>

  <h3>1. CONFIDENTIAL INFORMATION DEFINITION</h3>
  <p>Confidential Information includes highly sensitive materials including but not limited to:</p>
  <ul>
    <li>Proprietary technology, algorithms, and source code</li>
    <li>Research data, prototypes, and experimental results</li>
    <li>Manufacturing processes and trade secrets</li>
    <li>Product specifications and design documents</li>
    <li>Business intelligence and competitive strategies</li>
    <li>Financial models and valuation data</li>
  </ul>

  <h3>2. PROHIBITED USES (NON-EXHAUSTIVE)</h3>
  <ul class="prohibited">
    <li>Incorporating Confidential Information into products or services</li>
    <li>Using Confidential Information for internal research or development</li>
    <li>Benchmarking or competitive analysis using Confidential Information</li>
    <li>Training AI/ML models with Confidential Information</li>
    <li>Reverse engineering, decompiling, or disassembling prototypes</li>
    <li>Creating derivative works or improvements based on Confidential Information</li>
    <li>Sharing insights derived from Confidential Information with competitors</li>
  </ul>

  <h3>3. AUTHORIZED USE ONLY</h3>
  <p>The Receiving Party may use Confidential Information SOLELY to evaluate a potential transaction, partnership, or license as agreed in writing. Any other use is strictly prohibited.</p>

  <h3>4. DISCLOSURE RESTRICTIONS</h3>
  <p>The Receiving Party shall not disclose Confidential Information to any third party, including employees not directly involved in the authorized evaluation.</p>

  <h3>5. RETURN AND CERTIFICATION</h3>
  <p>Upon request or expiration of this Agreement, the Receiving Party must:</p>
  <ul>
    <li>Return all physical Confidential Information</li>
    <li>Permanently delete all electronic copies from all systems</li>
    <li>Provide a written certification of compliance</li>
    <li>Confirm no unauthorized use has occurred</li>
  </ul>

  <h3>6. TERM AND SURVIVAL</h3>
  <p>This Agreement remains effective until <strong>${new Date(nda.expirationDate).toLocaleDateString()}</strong>. The non-use and confidentiality obligations survive for <strong>five (5) years</strong> after termination, or indefinitely for trade secrets.</p>

  <h3>7. REMEDIES FOR UNAUTHORIZED USE</h3>
  <p>The Disclosing Party shall be entitled to injunctive relief without posting bond, actual and consequential damages, disgorgement of profits from unauthorized use, and recovery of all legal fees and costs.</p>

  <h3>8. GOVERNING LAW</h3>
  <p>This Agreement is governed by the laws of Delaware.</p>

  ${nda.notes ? `<h3>9. SPECIAL TERMS</h3><p>${nda.notes}</p>` : ''}

  <div class="sign-area">
    <div>
      <strong>DISCLOSING PARTY:</strong><br>
      Signature: _________________<br>
      Date: ${new Date().toLocaleDateString()}
    </div>
    <div>
      <strong>RECEIVING PARTY:</strong><br>
      <strong>I ACKNOWLEDGE THE NON-USE COVENANT</strong><br>
      Signature: _________________<br>
      Name: ${nda.partnerName}<br>
      Date: _________________
    </div>
  </div>

  <div class="footer">
    Non-Use NDA ${nda.ndaId} | Unauthorized Use Constitutes Material Breach
  </div>
</div>
</body>
</html>
`;
};