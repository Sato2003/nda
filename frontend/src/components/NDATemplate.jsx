import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register a font (optional)
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf'
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 11,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 15,
    backgroundColor: '#f3f4f6',
    padding: 5,
  },
  paragraph: {
    marginBottom: 10,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  signatureLine: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: '45%',
  },
  signatureText: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    textAlign: 'center',
    color: '#6b7280',
  },
  watermark: {
    position: 'absolute',
    fontSize: 40,
    opacity: 0.1,
    transform: 'rotate(-45deg)',
    alignSelf: 'center',
    top: '40%',
  }
});

export const NDADocument = ({ 
  employeeName, 
  employeeEmail, 
  companyName = "TechGuard Solutions Inc.",
  expirationDate,
  ndaId 
}) => {
  const currentDate = new Date().toLocaleDateString();
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark for security */}
        <View style={styles.watermark} fixed>
          <Text>CONFIDENTIAL</Text>
        </View>
        
        {/* Header */}
        <View style={styles.header}>
          <Text>MUTUAL NON-DISCLOSURE AGREEMENT</Text>
        </View>
        
        {/* Parties */}
        <View style={styles.section}>
          <Text>THIS AGREEMENT is made on {currentDate} between:</Text>
          <Text>1. {companyName} ("Company")</Text>
          <Text>2. {employeeName} ("Recipient")</Text>
        </View>
        
        {/* Purpose */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. PURPOSE</Text>
          <Text style={styles.paragraph}>
            The Company possesses certain confidential and proprietary information 
            including but not limited to trade secrets, source code, customer data, 
            business strategies, and technical specifications. The Recipient agrees 
            to protect such information as outlined below.
          </Text>
        </View>
        
        {/* Definition of Confidential Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. DEFINITION OF CONFIDENTIAL INFORMATION</Text>
          <Text style={styles.paragraph}>
            "Confidential Information" includes all information disclosed by the Company, 
            whether orally, in writing, or electronically, including:
          </Text>
          <Text style={styles.paragraph}>
            • Source code, algorithms, and software architecture{'\n'}
            • Customer lists, contracts, and pricing information{'\n'}
            • Security protocols and encryption methods{'\n'}
            • Financial data and business plans{'\n'}
            • Employee information and HR records{'\n'}
            • Any information marked as "Confidential"
          </Text>
        </View>
        
        {/* Obligations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. OBLIGATIONS OF RECIPIENT</Text>
          <Text style={styles.paragraph}>
            The Recipient agrees to:
          </Text>
          <Text style={styles.paragraph}>
            • Hold all Confidential Information in strict confidence{'\n'}
            • Not disclose Confidential Information to any third party{'\n'}
            • Use Confidential Information only for authorized business purposes{'\n'}
            • Not copy or reverse engineer any confidential materials{'\n'}
            • Return or destroy all Confidential Information upon agreement termination
          </Text>
        </View>
        
        {/* Exclusions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. EXCLUSIONS</Text>
          <Text style={styles.paragraph}>
            Confidential Information does not include information that:
          </Text>
          <Text style={styles.paragraph}>
            • Is or becomes publicly available through no fault of Recipient{'\n'}
            • Was already in Recipient's possession before disclosure{'\n'}
            • Is independently developed without using Confidential Information{'\n'}
            • Is required to be disclosed by law (with prior notice to Company)
          </Text>
        </View>
        
        {/* Term and Expiration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. TERM AND EXPIRATION</Text>
          <Text style={styles.paragraph}>
            This Agreement shall commence on the date signed and continue until 
            {expirationDate || 'one year from the date of signing'}, unless terminated earlier.
            The obligations herein shall survive termination for an additional three (3) years.
          </Text>
        </View>
        
        {/* Jurisdiction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. GOVERNING LAW</Text>
          <Text style={styles.paragraph}>
            This Agreement shall be governed by the laws of the State of Delaware, 
            without regard to conflict of law principles. Any disputes shall be resolved 
            in the courts of Wilmington, Delaware.
          </Text>
        </View>
        
        {/* Signatures */}
        <View style={styles.signatureLine}>
          <View style={styles.signatureBox}>
            <Text>FOR THE COMPANY:</Text>
            <View style={styles.signatureText}>
              <Text>_________________________</Text>
              <Text>Authorized Signature</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>_________________________</Text>
              <Text>Printed Name</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>{currentDate}</Text>
              <Text>Date</Text>
            </View>
          </View>
          
          <View style={styles.signatureBox}>
            <Text>FOR THE RECIPIENT:</Text>
            <View style={styles.signatureText}>
              <Text>_________________________</Text>
              <Text>Signature</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>{employeeName}</Text>
              <Text>Printed Name</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>{currentDate}</Text>
              <Text>Date</Text>
            </View>
          </View>
        </View>
        
        {/* NDA ID Footer */}
        <View style={styles.footer} fixed>
          <Text>NDA ID: {ndaId || 'GENERATED'} | This document is legally binding and electronically tracked</Text>
        </View>
      </Page>
    </Document>
  );
};