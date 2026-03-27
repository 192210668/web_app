import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';
import jsPDF from 'jspdf';
import './SymptomCheck.css';

const ALL_SYMPTOMS = ["abnormal appearing skin", "abnormal appearing tongue", "abnormal breathing sounds", "abnormal involuntary movements", "abnormal movement of eyelid", "abnormal size or shape of ear", "absence of menstruation", "abusing alcohol", "ache all over", "acne or pimples", "allergic reaction", "ankle pain", "ankle stiffness or tightness", "ankle weakness", "antisocial behavior", "anxiety and nervousness", "apnea", "arm cramps or spasms", "arm lump or mass", "arm pain", "arm stiffness or tightness", "arm swelling", "arm weakness", "back cramps or spasms", "back mass or lump", "back pain", "back stiffness or tightness", "back swelling", "back weakness", "bedwetting", "bladder mass", "bleeding from ear", "bleeding from eye", "bleeding gums", "bleeding in mouth", "bleeding or discharge from nipple", "blindness", "blood clots during menstrual periods", "blood in stool", "blood in urine", "bones are painful", "bumps on penis", "burning abdominal pain", "burning chest pain", "change in skin mole size or color", "changes in stool appearance", "chest tightness", "chills", "cloudy eye", "congestion in chest", "constipation", "coryza", "cough", "coughing up sputum", "cramps and spasms", "decreased appetite", "decreased heart rate", "delusions or hallucinations", "depression", "depressive or psychotic symptoms", "diaper rash", "diarrhea", "difficulty breathing", "difficulty eating", "difficulty in swallowing", "difficulty speaking", "diminished hearing", "diminished vision", "disturbance of memory", "disturbance of smell or taste", "dizziness", "double vision", "drainage in throat", "drug abuse", "dry lips", "dry or flaky scalp", "early or late onset of menopause", "ear pain", "elbow cramps or spasms", "elbow lump or mass", "elbow pain", "elbow stiffness or tightness", "elbow swelling", "elbow weakness", "emotional symptoms", "excessive anger", "excessive appetite", "excessive growth", "excessive urination at night", "eye burns or stings", "eye deviation", "eye moves abnormally", "eye redness", "eye strain", "eyelid lesion or rash", "eyelid retracted", "eyelid swelling", "facial pain", "fainting", "fatigue", "fears and phobias", "feeling cold", "feeling hot", "feeling hot and cold", "feeling ill", "feet turned in", "fever", "flatulence", "fluid in ear", "fluid retention", "flu-like syndrome", "flushing", "focal weakness", "foot or toe cramps or spasms", "foot or toe lump or mass", "foot or toe pain", "foot or toe stiffness or tightness", "foot or toe swelling", "foot or toe weakness", "foreign body sensation in eye", "frequent menstruation", "frequent urination", "frontal headache", "groin mass", "groin pain", "gum pain", "hand or finger cramps or spasms", "hand or finger lump or mass", "hand or finger pain", "hand or finger stiffness or tightness", "hand or finger swelling", "hand or finger weakness", "headache", "heartburn", "heavy menstrual flow", "hemoptysis", "hesitancy", "hip lump or mass", "hip pain", "hip stiffness or tightness", "hip swelling", "hip weakness", "hoarse voice", "hostile behavior", "hot flashes", "hurts to breath", "hysterical behavior", "impotence", "incontinence of stool", "increased heart rate", "infant feeding problem", "infant spitting up", "infertility", "infrequent menstruation", "insomnia", "intermenstrual bleeding", "involuntary urination", "irregular appearing nails", "irregular appearing scalp", "irregular belly button", "irregular heartbeat", "itiness of eye", "itchiness of eye", "itching of skin", "itching of the anus", "itching of scrotum", "itchy ear(s)", "itchy eyelid", "itchy scalp", "jaundice", "jaw pain", "jaw swelling", "joint pain", "joint stiffness or tightness", "joint swelling", "kidney mass", "knee cramps or spasms", "knee lump or mass", "knee pain", "knee stiffness or tightness", "knee swelling", "knee weakness", "lack of growth", "lacrimation", "leg cramps or spasms", "leg lump or mass", "leg pain", "leg stiffness or tightness", "leg swelling", "leg weakness", "lip sore", "lip swelling", "long menstrual periods", "loss of sensation", "loss of sex drive", "low back cramps or spasms", "low back pain", "low back stiffness or tightness", "low back swelling", "low back weakness", "lower abdominal pain", "lower body pain", "low self-esteem", "low urine output", "lump in throat", "lump or mass of breast", "lump over jaw", "lymphedema", "mass in scrotum", "mass on ear", "mass on eyelid", "mass on vulva", "mass or swelling around the anus", "melena", "mouth dryness", "mouth pain", "mouth ulcer", "muscle cramps, contractures, or spasms", "muscle pain", "muscle stiffness or tightness", "muscle swelling", "muscle weakness", "nailbiting", "nasal congestion", "nausea", "neck cramps or spasms", "neck mass", "neck pain", "neck stiffness or tightness", "neck swelling", "neck weakness", "nightmares", "nose deformity", "nosebleed", "obsessions and compulsions", "pain during intercourse", "pain during pregnancy", "pain in eye", "pain in gums", "pain in testicles", "pain of the anus", "pain or soreness of breast", "painful menstruation", "painful sinuses", "painful urination", "pallor", "palpitations", "paresthesia", "pelvic pain", "pelvic pressure", "penile discharge", "penis pain", "penis redness", "peripheral edema", "plugged feeling in ear", "polyuria", "poor circulation", "postpartum problems of the breast", "posture problems", "premature ejaculation", "premenstrual tension or irritability", "problems during pregnancy", "problems with movement", "problems with orgasms", "problems with shape or size of breast", "pupils unequal", "pus draining from ear", "pus in sputum", "pus in urine", "recent pregnancy", "recent weight loss", "rectal bleeding", "redness in ear", "redness in or around nose", "regurgitation", "regurgitation.1", "restlessness", "retention of urine", "rib pain", "ringing in ear", "scanty menstrual flow", "seizures", "sharp abdominal pain", "sharp chest pain", "shortness of breath", "shoulder cramps or spasms", "shoulder lump or mass", "shoulder pain", "shoulder stiffness or tightness", "shoulder swelling", "shoulder weakness", "side pain", "sinus congestion", "skin dryness, peeling, scaliness, or rough", "skin growth", "skin irritation", "skin lesion", "skin moles", "skin oiliness", "skin pain", "skin rash", "skin swelling", "skin on arm or hand looks infected", "skin on head or neck looks infected", "skin on leg or foot looks infected", "sleepiness", "sleepwalking", "slurring words", "smoking problems", "sneezing", "sore in nose", "sore throat", "spots or clouds in vision", "spotting or bleeding during pregnancy", "stiffness all over", "stomach bloating", "stuttering or stammering", "suprapubic pain", "sweating", "swelling of scrotum", "swollen abdomen", "swollen eye", "swollen lymph nodes", "swollen or red tonsils", "swollen tongue", "symptoms of bladder", "symptoms of eye", "symptoms of infants", "symptoms of prostate", "symptoms of the face", "symptoms of the kidneys", "symptoms of the scrotum and testes", "temper problems", "thirst", "throat feels tight", "throat irritation", "throat redness", "throat swelling", "tongue bleeding", "tongue lesions", "tongue pain", "toothache", "unpredictable menstruation", "unwanted hair", "underweight", "unusual color or odor to urine", "upper abdominal pain", "uterine contractions", "vaginal bleeding after menopause", "vaginal discharge", "vaginal dryness", "vaginal itching", "vaginal pain", "vaginal redness", "vomiting", "vomiting blood", "vulvar irritation", "vulvar sore", "warts", "weakness", "weight gain", "wheezing", "white discharge from eye", "wrinkles on skin", "wrist cramps or spasms", "wrist lump or mass", "wrist pain", "wrist stiffness or tightness", "wrist swelling", "wrist weakness"].sort();

const getCategoryForSymptom = (symptom) => {
    const s = symptom.toLowerCase();
    if (s.includes('eye') || s.includes('ear') || s.includes('vision') || s.includes('hearing') || s.includes('head') || s.includes('face') || s.includes('tooth') || s.includes('gum') || s.includes('tongue') || s.includes('mouth') || s.includes('lip') || s.includes('jaw') || s.includes('nose') || s.includes('blindness') || s.includes('lacrimation') || s.includes('sneezing') || s.includes('dizziness')) return "Head & Face";
    if (s.includes('neck') || s.includes('throat') || s.includes('swallow') || s.includes('tonsils') || s.includes('hoarse')) return "Neck & Throat";
    if (s.includes('chest') || s.includes('breath') || s.includes('cough') || s.includes('heart') || s.includes('breast') || s.includes('rib') || s.includes('sputum') || s.includes('wheez') || s.includes('apnea') || s.includes('palpitation') || s.includes('nipple')) return "Chest";
    if (s.includes('abdom') || s.includes('stomach') || s.includes('nausea') || s.includes('vomit') || s.includes('diarrhea') || s.includes('constipation') || s.includes('flatulence') || s.includes('regurgitation') || s.includes('appetite') || s.includes('eating')) return "Abdomen";
    if (s.includes('arm') || s.includes('hand') || s.includes('finger') || s.includes('elbow') || s.includes('shoulder') || s.includes('wrist') || s.includes('nail')) return "Arms & Hands";
    if (s.includes('back') || s.includes('spine')) return "Back & Spine";
    if (s.includes('leg') || s.includes('foot') || s.includes('feet') || s.includes('toe') || s.includes('ankle') || s.includes('knee') || s.includes('hip')) return "Legs & Feet";
    return "General";
};

const CATEGORIES = ["All", "Head & Face", "Neck & Throat", "Chest", "Abdomen", "Arms & Hands", "Back & Spine", "Legs & Feet", "General"];

const SymptomCheck = () => {
    const { user } = useAuth();
    const [step, setStep] = useState(1); // 1: Symptoms, 2: Severity, 3: Results
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [severity, setSeverity] = useState(5);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    let displayedSymptoms = ALL_SYMPTOMS;
    if (selectedCategory !== "All") {
        displayedSymptoms = ALL_SYMPTOMS.filter(s => getCategoryForSymptom(s) === selectedCategory);
    }

    const filteredSymptoms = displayedSymptoms.filter(s =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleSymptom = (symptom) => {
        if (selectedSymptoms.includes(symptom)) {
            setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
        } else {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        }
    };

    const handleNextStep = () => {
        if (selectedSymptoms.length === 0) {
            setError('Please select at least one symptom.');
            return;
        }
        setError('');
        setStep(2);
    };

    const handleAnalyze = async () => {
        setLoading(true);
        setError('');
        setResult(null);

        try {
            // Use the PURE ML endpoint in the patient app
            const response = await axios.post(ENDPOINTS.SYMPTOMS_PREDICT, {
                symptoms: selectedSymptoms,
                severity_rating: severity,
            });
            const predictionData = response.data;
            setResult(predictionData);
            setStep(3);

            // Save to history (dataset collection)
            if (user?.id) {
                try {
                    await axios.post('/api/report/save/', {
                        patient_id: user.id,
                        predicted_disease: predictionData.predicted_disease,
                        risk_level: severity > 7 ? 'High' : (severity > 4 ? 'Medium' : 'Low'),
                        summary: `Patient with ${selectedSymptoms.join(', ')} reported severity ${severity}.`,
                        key_findings: selectedSymptoms,
                    });
                } catch (historyErr) {
                    console.warn('Failed to save history:', historyErr);
                    // Silently fail history save to avoid interrupting the user's prediction result
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to analyze symptoms.');
        } finally {
            setLoading(false);
        }
    };

    const resetFlow = () => {
        setStep(1);
        setSelectedSymptoms([]);
        setSeverity(5);
        setResult(null);
        setError('');
        setSearchQuery('');
    };

    const handleDownloadReport = () => {
        if (!result) return;
        
        const doc = new jsPDF();
        
        // Header
        doc.setFontSize(20);
        doc.setTextColor(0, 102, 204);
        doc.text('EarlyCare', 105, 20, { align: 'center' });
        
        doc.setFontSize(14);
        doc.setTextColor(40, 40, 40);
        doc.text('Symptom Analysis Report', 105, 30, { align: 'center' });
        
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);

        // Meta Data
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 45);

        // Prediction
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.text('PREDICTED CONDITION:', 20, 60);
        doc.setFont('helvetica', 'normal');
        doc.text(result.predicted_disease, 20, 67);

        // Severity
        doc.setFont('helvetica', 'bold');
        doc.text('SEVERITY RATING:', 20, 80);
        doc.setFont('helvetica', 'normal');
        doc.text(`${severity} / 10`, 20, 87);

        // Symptoms
        doc.setFont('helvetica', 'bold');
        doc.text('REPORTED SYMPTOMS:', 20, 100);
        doc.setFont('helvetica', 'normal');
        
        let yPos = 107;
        selectedSymptoms.forEach((s, idx) => {
            doc.text(`${idx + 1}. ${s}`, 25, yPos);
            yPos += 7;
        });

        // Disclaimer
        doc.setLineWidth(0.2);
        doc.line(20, yPos + 10, 190, yPos + 10);
        
        doc.setFontSize(9);
        doc.setTextColor(150, 0, 0);
        const disclaimer = "DISCLAIMER: This report is generated by an AI ML model. It is for informational purposes only and NOT a substitute for professional medical advice, diagnosis, or treatment.";
        const splitDisclaimer = doc.splitTextToSize(disclaimer, 170);
        doc.text(splitDisclaimer, 20, yPos + 20);

        doc.save(`EarlyCare_Symptom_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    return (
        <div className="symptom-checker-wrapper">
            <div className="symptom-stepper">
                <div className={`step-box ${step >= 1 ? 'active' : ''}`}>Selection</div>
                <div className="step-connector"></div>
                <div className={`step-box ${step >= 2 ? 'active' : ''}`}>Severity</div>
                <div className="step-connector"></div>
                <div className={`step-box ${step >= 3 ? 'active' : ''}`}>Analysis</div>
            </div>

            <div className="symptom-card-redesign">
                {step === 1 && (
                    <div className="step-content">
                        <h2>Select Symptoms</h2>
                        <p>Search and tap on your symptoms in the grid below.</p>

                        <div className="search-box-container">
                            <input
                                type="text"
                                placeholder="Search symptoms (e.g. fever, pain)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="symptom-search-bar"
                            />
                        </div>

                        <div className="category-tabs">
                            {CATEGORIES.map(category => (
                                <button 
                                    key={category} 
                                    className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {selectedSymptoms.length > 0 && (
                            <div className="selected-area">
                                <h3>Selected ({selectedSymptoms.length})</h3>
                                <div className="selected-grid">
                                    {selectedSymptoms.map(s => (
                                        <button key={s} className="symptom-chip selected" onClick={() => toggleSymptom(s)}>
                                            {s} <span>×</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="symptom-grid">
                            {filteredSymptoms.map(s => (
                                !selectedSymptoms.includes(s) && (
                                    <button
                                        key={s}
                                        className="symptom-chip"
                                        onClick={() => toggleSymptom(s)}
                                    >
                                        {s}
                                    </button>
                                )
                            ))}
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <div className="action-row">
                            <button className="next-btn" onClick={handleNextStep}>Proceed to Severity</button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="step-content">
                        <h2>Set Severity</h2>
                        <p>How strong are these symptoms currently?</p>

                        <div className="severity-display">
                            <div className="severity-circle">{severity}</div>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={severity}
                                onChange={(e) => setSeverity(parseInt(e.target.value))}
                                className="severity-slider-premium"
                            />
                            <div className="severity-labels-premium">
                                <span>Low</span>
                                <span>Medium</span>
                                <span>High</span>
                            </div>
                        </div>

                        <div className="action-row">
                            <button className="back-btn" onClick={() => setStep(1)}>Back</button>
                            <button className="analyze-btn" disabled={loading} onClick={handleAnalyze}>
                                {loading ? 'Analyzing...' : 'Predict Disease'}
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && result && (
                    <div className="step-content result-view-premium">
                        <div className="success-icon">✅</div>
                        <h2>Predicted Condition</h2>
                        <h1 className="predicted-name">{result.predicted_disease}</h1>

                        {result.predicted_disease === 'Inconclusive' ? (
                            <div className="analysis-summary-box error">
                                <p>We couldn't determine a specific condition based on the symptoms provided. This can happen if the symptoms are too general or not well-represented in our current model.</p>
                                <p>Try selecting more specific symptoms or consult a professional.</p>
                            </div>
                        ) : (
                            <div className="analysis-summary-box">
                                <p>Based on your input of <strong>{selectedSymptoms.length}</strong> symptoms with a severity of <strong>{severity}/10</strong>, our ML model predicts this condition.</p>
                            </div>
                        )}

                        {result.matched_symptoms && result.matched_symptoms.length < selectedSymptoms.length && (
                            <div className="warning-box mini">
                                <strong>Note:</strong> Some selected symptoms were not recognized by this specific model version.
                            </div>
                        )}

                        <div className="warning-box">
                            <strong>Note:</strong> This is a prediction from a Machine Learning model. It is for informational purposes only and not a substitute for professional medical advice.
                        </div>

                        <div className="action-row">
                            <button className="reset-btn" onClick={resetFlow}>New Checkup</button>
                            <button className="download-btn" onClick={handleDownloadReport}>Download Report</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SymptomCheck;
