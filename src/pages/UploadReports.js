import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';
import './UploadReports.css';

const UploadReports = () => {
    const { user } = useAuth();
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        const formData = new FormData();
        formData.append('report_file', file);
        if (user?.id) {
            formData.append('patient_id', user.id);
        }

        try {
            const response = await axios.post(ENDPOINTS.REPORTS_ANALYZE, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResult(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to analyze report.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-card">
                <h2>Upload Medical Report</h2>
                <p>Upload a PDF or Image of your medical report for AI analysis.</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="file-input-wrapper">
                        <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Analyzing Report...' : 'Analyze Report'}
                    </button>
                </form>

                {result && (
                    <div className="report-result">
                        <h3>Key Findings</h3>
                        <div className="result-box">
                            <p><strong>Predicted Condition:</strong> {result.predicted_disease}</p>
                            <p><strong>Risk Level:</strong> {result.risk_level}</p>
                            <p><strong>Analysis:</strong> {result.analysis}</p>
                            {result.key_findings && result.key_findings.length > 0 && (
                                <ul>
                                    {result.key_findings.map((finding, idx) => (
                                        <li key={idx}>{finding}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadReports;
