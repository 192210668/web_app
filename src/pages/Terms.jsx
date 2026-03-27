import React from 'react';

const Terms = () => {
  return (
    <div className="page-fade-in" style={{ padding: '6rem 2rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Terms & Conditions</h1>
      <p style={{ color: '#4facfe', fontWeight: 'bold' }}>Effective Date: March 2026</p>
      
      <div style={{ marginTop: '2rem', lineHeight: '1.6' }}>
        <h2>1. Introduction</h2>
        <p>Welcome to EarlyCare. These Terms and Conditions outline the rules and regulations for the use of the EarlyCare Website and Mobile Application.</p>
        
        <h2>2. Medical Disclaimer</h2>
        <p>EarlyCare is designed to assist in preliminary symptom checking using AI-driven tools. It does <strong>not</strong> provide medical diagnoses, and its output is not a substitute for professional medical advice, diagnosis, or treatment.</p>
        
        <h2>3. User Responsibilities</h2>
        <p>By using EarlyCare, you agree to provide truthful and accurate symptom information. You are strictly responsible for seeking emergency medical attention when experiencing severe symptoms like chest pain or difficulty breathing.</p>
        
        <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #4facfe', marginTop: '2rem' }}>
          <p>For support inquiries, please contact: <a href="mailto:EarlyCare@gmail.com">EarlyCare@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
