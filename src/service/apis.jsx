const BASE_URL = import.meta.env.VITE_BASE_URL;
const GBQ_BASE_URL = import.meta.env.VITE_GBQ_BASE_URL;

export const API_ENDPOINTS = {

  STATE_TOKEN: `${BASE_URL}/api/oauth/state-token`,
  CONNECTIONS: `${BASE_URL}/api/connections`,

  GOOGLE_AUTH: `${BASE_URL}/auth/google`,
  GHL_AUTH: `${BASE_URL}/ghl/oauth/initiate`,
  SLACK_AUTH: `${BASE_URL}/slack/oauth`,


  GOOGLE_BIGQUERY_AUTH: `${BASE_URL}/auth/google-bigquery`,
  GOOGLE_BIGQUERY_CONNECTION: `${BASE_URL}/api/connections/google_bigquery`,

  PROJECTS: `${GBQ_BASE_URL}/api/bigquery/projects`,
  DATASETS: `${GBQ_BASE_URL}/api/bigquery/datasets`,
  TABLES: `${GBQ_BASE_URL}/api/bigquery/tables`,

  WORKFLOWS_LIST: `${GBQ_BASE_URL}/api/workflows/list`,
  WORKFLOW_CREATE: `${GBQ_BASE_URL}/api/workflows/create`,
  WORKFLOW_EDIT: `${GBQ_BASE_URL}/api/workflows/edit`,
  WORKFLOW_DELETE: `${GBQ_BASE_URL}/api/workflows/delete`,
  WORKFLOW_RUN_CONTACTS: `${GBQ_BASE_URL}/api/contacts/run-workflow`,
  WORKFLOW_RUN_OPPORTUNITIES: `${GBQ_BASE_URL}/api/opportunities/run-workflow`,
  WORKFLOW_RUN_CALLREPORTS: `${GBQ_BASE_URL}/api/call-reports/run-workflow`,
};
