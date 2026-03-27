import React from 'react';

const Cookie = () => {
  return (
    <div className="page-fade-in" style={{ padding: '6rem 2rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Cookie Policy</h1>
      <p style={{ color: '#4facfe', fontWeight: 'bold' }}>Effective Date: March 2026</p>
      
      <div style={{ marginTop: '2rem', lineHeight: '1.6' }}>
        <h2>1. What are Cookies?</h2>
        <p>Cookies are small text files stored on your browser when you visit our website. They help us remember your preferences, keep you logged in securely, and understand how you interact with EarlyCare.</p>
        
        <h2>2. How We Use Cookies</h2>
        <p>We use local storage and cookies to manage your authentication tokens and persist session states between Symptom Checks and History page visits.</p>
        
        <h2>3. Managing Cookies</h2>
        <p>You can choose to disable cookies through your browser settings. However, doing so may impact core functionality of the EarlyCare portal, specifically login and identity preservation.</p>
      </div>
    </div>
  );
};

export default Cookie;
