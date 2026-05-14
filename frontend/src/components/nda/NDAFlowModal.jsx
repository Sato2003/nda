import { useState } from "react";
import jsPDF from "jspdf";
import { NDA_LEGAL_COMPLIANCE } from "./ndaLegalData";

export const NDAFlowModal = ({ selectedType, onClose }) => {
  const data = NDA_LEGAL_COMPLIANCE[selectedType];

  const [partnerName, setPartnerName] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [disclosingAddress, setDisclosingAddress] = useState("");
  const [receivingAddress, setReceivingAddress] = useState("");

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(data.title, 20, 20);

    doc.setFontSize(10);
    doc.text(data.explanation, 20, 35, { maxWidth: 170 });

    doc.setFontSize(12);
    doc.text(`Partner Name: ${partnerName}`, 20, 110);
    doc.text(`Partner Email: ${partnerEmail}`, 20, 120);
    doc.text(`Disclosing Address: ${disclosingAddress}`, 20, 130);
    doc.text(`Receiving Address: ${receivingAddress}`, 20, 140);

    doc.save(`${selectedType}.pdf`);
  };

  if (!data) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}>
      <div style={{
        background: "#fff",
        width: 520,
        padding: 20,
        borderRadius: 10,
        maxHeight: "90vh",
        overflowY: "auto"
      }}>

        <h2>{data.title}</h2>

        {/* LEGAL EXPLANATION */}
        <p style={{ fontSize: 12, color: "#444", marginBottom: 15 }}>
          {data.explanation}
        </p>

        {/* FORM */}
        <input placeholder="Partner Name"
          onChange={e => setPartnerName(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }} />

        <input placeholder="Partner Email"
          onChange={e => setPartnerEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }} />

        <input placeholder="Disclosing Party Address"
          onChange={e => setDisclosingAddress(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }} />

        <input placeholder="Receiving Party Address"
          onChange={e => setReceivingAddress(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }} />

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={generatePDF}
            style={{ flex: 1, padding: 10, background: "green", color: "white" }}>
            Download PDF
          </button>

          <button onClick={onClose}
            style={{ flex: 1, padding: 10 }}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
};