import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';
import './History.css';

const History = () => {
    const { user } = useAuth();
    const [historyList, setHistoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user?.id) return;
            try {
                const [symptomRes, reportRes] = await Promise.all([
                    axios.get(ENDPOINTS.SYMPTOMS_HISTORY(user.id)),
                    axios.get(ENDPOINTS.REPORTS_HISTORY(user.id))
                ]);

                // Normalize and merge history
                const symptoms = (symptomRes.data || []).map(item => ({
                    ...item,
                    display_type: 'symptom',
                    date: item.created_at
                }));
                const reports = (reportRes.data || []).map(item => ({
                    ...item,
                    display_type: 'report',
                    date: item.created_at
                }));

                const merged = [...symptoms, ...reports].sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );

                setHistoryList(merged);
            } catch (err) {
                console.error("Failed to fetch history", err);
                setError('Failed to fetch history details.');
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [user?.id]);

    if (loading) return <div className="loading">Loading History...</div>;

    return (
        <div className="history-container">
            <h2>Health History</h2>
            {error && <div className="error-message">{error}</div>}

            {historyList.length === 0 ? (
                <p className="no-history">No history found. Try Symptom Check or Upload Reports!</p>
            ) : (
                <div className="history-grid">
                    {historyList.map((item, idx) => (
                        <div key={idx} className={`history-item ${item.display_type}`}>
                            <div className="item-header">
                                <span className="item-type">
                                    {item.display_type === 'symptom' ? '🩺 Symptom Check' : '📄 Report Analysis'}
                                </span>
                                <span className="item-date">{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                            <div className="item-body">
                                {item.display_type === 'symptom' ? (
                                    <>
                                        <p><strong>Predicted Condition:</strong> {item.predicted_disease}</p>
                                        <p><strong>Risk Level:</strong> {item.risk_level}</p>
                                        <p><strong>Analysis:</strong> {item.analysis}</p>
                                    </>
                                ) : (
                                    <>
                                        <p><strong>File:</strong> {item.file_url?.split('/').pop() || 'Medical Report'}</p>
                                        <p><strong>Condition:</strong> {item.predicted_disease}</p>
                                        <p><strong>Risk Level:</strong> {item.risk_level}</p>
                                        <p><strong>Analysis:</strong> {item.analysis}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
