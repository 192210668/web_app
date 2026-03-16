export const ENDPOINTS = {
  REGISTER: '/patient/register/',
  LOGIN: '/patient/login/',
  PROFILE: (id) => `/patient/profile/${id}/`,
  PROFILE_PHOTO: (id) => `/patient/profile/${id}/photo/`,
  SYMPTOMS_PREDICT: '/patient/predict/',
  REPORTS_ANALYZE: '/api/report/analyze/',
  SYMPTOMS_HISTORY: (id) => `/api/symptom/history/${id}/`,
  REPORTS_HISTORY: (id) => `/api/report/history/${id}/`,
};

export default ENDPOINTS;
