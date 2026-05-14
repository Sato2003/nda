import jsPDF from 'jspdf';

export const generateNDAPDF = (nda) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Header border
  doc.setDrawColor(0, 102, 204);
  doc.setLineWidth(1);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  // Title
  doc.setFontSize(24);
  doc.setTextColor(0, 51, 102);
  doc.text('NON-DISCLOSURE AGREEMENT', pageWidth/2, 35, { align: 'center' });
  
  // NDA ID
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`NDA ID: ${nda.ndaId}`, pageWidth - 30, 20);
  
  // Date
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55);
  
  // Parties
  let y = 75;
  doc.setFontSize(12);
  doc.text('BETWEEN:', 20, y);
  y += 10;
  doc.text(`1. ${nda.companyName || 'TechGuard Solutions Inc.'} ("Disclosing Party")`, 25, y);
  y += 10;
  doc.text(`2. ${nda.signerName} ("Receiving Party")`, 25, y);
  
  // Purpose
  y += 25;
  doc.setFontSize(13);
  doc.setTextColor(0, 51, 102);
  doc.text('1. PURPOSE', 20, y);
  y += 8;
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('The Disclosing Party possesses certain confidential and proprietary information', 25, y);
  y += 7;
  doc.text('including trade secrets, source code, customer data, and business strategies.', 25, y);
  
  // Definition of Confidential Information
  y += 18;
  doc.setFontSize(13);
  doc.setTextColor(0, 51, 102);
  doc.text('2. DEFINITION OF CONFIDENTIAL INFORMATION', 20, y);
  y += 8;
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('"Confidential Information" includes all information disclosed by the Disclosing', 25, y);
  y += 7;
  doc.text('Party, whether orally, in writing, or electronically, including:', 25, y);
  y += 7;
  doc.text('• Source code, algorithms, and software architecture', 30, y);
  y += 6;
  doc.text('• Customer lists, contracts, and pricing information', 30, y);
  y += 6;
  doc.text('• Security protocols and encryption methods', 30, y);
  y += 6;
  doc.text('• Financial data and business plans', 30, y);
  y += 6;
  doc.text('• Employee information and HR records', 30, y);
  
  // Obligations
  y += 18;
  doc.setFontSize(13);
  doc.setTextColor(0, 51, 102);
  doc.text('3. OBLIGATIONS OF RECEIVING PARTY', 20, y);
  y += 8;
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('The Receiving Party agrees to:', 25, y);
  y += 7;
  doc.text('• Hold all Confidential Information in strict confidence', 30, y);
  y += 6;
  doc.text('• Not disclose Confidential Information to any third party', 30, y);
  y += 6;
  doc.text('• Use Confidential Information only for authorized business purposes', 30, y);
  y += 6;
  doc.text('• Not copy or reverse engineer any confidential materials', 30, y);
  y += 6;
  doc.text('• Return or destroy all Confidential Information upon termination', 30, y);
  
  // Exclusions
  y += 18;
  doc.setFontSize(13);
  doc.setTextColor(0, 51, 102);
  doc.text('4. EXCLUSIONS', 20, y);
  y += 8;
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('Confidential Information does not include information that:', 25, y);
  y += 7;
  doc.text('• Is or becomes publicly available through no fault of Receiving Party', 30, y);
  y += 6;
  doc.text('• Was already in Receiving Party\'s possession before disclosure', 30, y);
  y += 6;
  doc.text('• Is independently developed without using Confidential Information', 30, y);
  y += 6;
  doc.text('• Is required to be disclosed by law (with prior notice to Disclosing Party)', 30, y);
  
  // Term and Expiration
  y += 18;
  doc.setFontSize(13);
  doc.setTextColor(0, 51, 102);
  doc.text('5. TERM AND EXPIRATION', 20, y);
  y += 8;
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(`This Agreement shall commence on the date signed and continue until`, 25, y);
  y += 7;
  doc.text(`${new Date(nda.expirationDate).toLocaleDateString()}, unless terminated earlier.`, 25, y);
  y += 7;
  doc.text('The obligations herein shall survive termination for an additional three (3) years.', 25, y);
  
  // Governing Law
  y += 18;
  doc.setFontSize(13);
  doc.setTextColor(0, 51, 102);
  doc.text('6. GOVERNING LAW', 20, y);
  y += 8;
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('This Agreement shall be governed by the laws of the State of Delaware,', 25, y);
  y += 7;
  doc.text('without regard to conflict of law principles. Any disputes shall be resolved', 25, y);
  y += 7;
  doc.text('in the courts of Wilmington, Delaware.', 25, y);
  
  // Signatures
  y += 30;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  // Company signature
  doc.text('FOR THE DISCLOSING PARTY:', 35, y);
  doc.text('_________________________', 35, y + 12);
  doc.text('Authorized Signature', 35, y + 19);
  doc.text('Printed Name: _________________', 35, y + 26);
  doc.text(new Date().toLocaleDateString(), 35, y + 33);
  
  // Recipient signature
  doc.text('FOR THE RECEIVING PARTY:', 130, y);
  doc.text('_________________________', 130, y + 12);
  doc.text('Signature', 130, y + 19);
  doc.text(`Printed Name: ${nda.signerName}`, 130, y + 26);
  doc.text(new Date().toLocaleDateString(), 130, y + 33);
  
  // Footer
  doc.setFontSize(9);
  doc.setTextColor(128, 128, 128);
  doc.text(`Generated by NDA Management System - ${new Date().toLocaleString()}`, pageWidth/2, pageHeight - 15, { align: 'center' });
  doc.text('This document is legally binding and electronically tracked', pageWidth/2, pageHeight - 10, { align: 'center' });
  
  // Save the PDF
  doc.save(`NDA_${nda.ndaId}.pdf`);
};