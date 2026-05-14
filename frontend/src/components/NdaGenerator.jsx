import { useState } from "react";
import jsPDF from "jspdf";

// Legal explanations per NDA type
const NDA_INFO = {
  "Unilateral NDA": {
    title: "Unilateral NDA (One-way NDA)",
    explanation:
      "Only one party discloses confidential information while the other party is obligated to protect it. Common in employer–employee relationships."
  },
  "Mutual NDA": {
    title: "Mutual NDA (Two-way NDA)",
    explanation:
      "Both parties exchange confidential information and are equally bound to protect each other's data."
  },
  "Multilateral NDA": {
    title: "Multilateral NDA",
    explanation:
      "Involves three or more parties where at least one party shares confidential information with multiple recipients."
  },
  "Employee NDA": {
    title: "Employee NDA",
    explanation:
      "Protects company secrets shared with employees during and after employment."
  },
  "Contractor/Vendor NDA": {
    title: "Contractor/Vendor NDA",
    explanation:
      "Used when hiring external contractors or vendors who may access sensitive company data."
  },
  "Investor NDA": {
    title: "Investor NDA",
    explanation:
      "Protects business plans, financial data, and proprietary information shared with investors."
  },
  "Customer NDA": {
    title: "Customer NDA",
    explanation:
      "Ensures customer-related confidential data and transactions are protected."
  },
  "Standard/General NDA": {
    title: "Standard NDA",
    explanation:
      "A general-purpose NDA used for most confidentiality agreements."
  },
  "Confidentiality Agreement": {
    title: "Confidentiality Agreement",
    explanation:
      "Broad agreement preventing disclosure of sensitive information."
  },
  "Non-Circumvention Agreement": {
    title: "Non-Circumvention Agreement",
    explanation:
      "Prevents parties from bypassing each other to directly contact clients or business partners."
  },
  "Non-Use NDA": {
    title: "Non-Use NDA",
    explanation:
      "Restricts use of confidential information beyond just disclosure."
  }
};

export default function NdaGenerator() {
  const [selectedType, setSelectedType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // form
  const [partnerName, setPartnerName] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [disclosingAddress, setDisclosingAddress] = useState("");
  const [receivingAddress, setReceivingAddress] = useState("");

  // click NDA type
  const handleSelectType = (type) => {
    setSelectedType(type);
    setShowModal(true);
  };

  // generate PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("NON-DISCLOSURE AGREEMENT", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Type: ${selectedType}`, 20, 40);
    doc.text(`Partner Name: ${partnerName}`, 20, 50);
    doc.text(`Partner Email: ${partnerEmail}`, 20, 60);
    doc.text(`Disclosing Address: ${disclosingAddress}`, 20, 70);
    doc.text(`Receiving Address: ${receivingAddress}`, 20, 80);

    doc.text("This document is legally binding and confidential.", 20, 100);

    doc.save(`NDA_${selectedType}.pdf`);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>

      {/* NDA TYPE BUTTONS */}
      <h2>Select NDA Type</h2>
      {Object.keys(NDA_INFO).map((type) => (
        <button
          key={type}
          onClick={() => handleSelectType(type)}
          style={{
            display: "block",
            margin: "8px 0",
            padding: "10px",
            width: "100%",
            cursor: "pointer"
          }}
        >
          {type}
        </button>
      ))}

      {/* MODAL */}
      {showModal && selectedType && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div style={{ background: "white", padding: 20, width: 500 }}>
            
            {/* Legal Explanation */}
            <h3>{NDA_INFO[selectedType].title}</h3>
            <p>{NDA_INFO[selectedType].explanation}</p>

            <hr />

            {/* FORM */}
            <h4>Fill NDA Details</h4>

            <input
              placeholder="Partner / Company Name *"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              style={{ width: "100%", margin: "5px 0", padding: 8 }}
            />

            <input
              placeholder="Partner Email *"
              value={partnerEmail}
              onChange={(e) => setPartnerEmail(e.target.value)}
              style={{ width: "100%", margin: "5px 0", padding: 8 }}
            />

            <input
              placeholder="Disclosing Party Address"
              value={disclosingAddress}
              onChange={(e) => setDisclosingAddress(e.target.value)}
              style={{ width: "100%", margin: "5px 0", padding: 8 }}
            />

            <input
              placeholder="Receiving Party Address"
              value={receivingAddress}
              onChange={(e) => setReceivingAddress(e.target.value)}
              style={{ width: "100%", margin: "5px 0", padding: 8 }}
            />

            {/* ACTION BUTTONS */}
            <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
              <button onClick={downloadPDF} style={{ flex: 1 }}>
                Download PDF
              </button>

              <button
                onClick={() => setShowModal(false)}
                style={{ flex: 1 }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}