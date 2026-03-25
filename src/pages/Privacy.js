import React from 'react';

const Privacy = () => {
  return (
    <div className="page-fade-in" style={{ padding: '6rem 2rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Privacy Policy</h1>
      <p style={{ color: '#4facfe', fontWeight: 'bold' }}>Effective Date: March 2026</p>
      
      <div style={{ marginTop: '2rem', lineHeight: '1.6' }}>
        <h2>1. Information Collection</h2>
        <p>We collect personal health information, including symptoms, demographic data, and medical reports uploaded by users. This data is essential for providing our AI-based symptom generation services.</p>
        
        <h2>2. Data Usage</h2>
        <p>Your data is used strictly to power our Machine Learning backend predictions. We do not sell your personal health records or diagnosis history to any third party entities.</p>
        
        <h2>3. Data Security</h2>
        <p>EarlyCare implements industry-standard encryption protocols to protect your accounts, passwords, and sensitive medical report uploads.</p>
        <p>If you wish to delete your data completely, please reach out to our support channel.</p>
      </div>
    </div>
  );
};

export default Privacy;
