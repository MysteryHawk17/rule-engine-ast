import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const api = {
  createRule: async (data: {
    name: string;
    description?: string;
    ruleString: string;
  }) => {
    const response = await axios.post(`${API_URL}/rules`, data);
    return response.data;
  },

  getAllRules: async () => {
    const response = await axios.get(`${API_URL}/rules`);
    return response.data;
  },

  evaluateRule: async (ruleId: string, data: Record<string, unknown>) => {
    const response = await axios.post(`${API_URL}/rules/evaluate`, {
      ruleId,
      data,
    });
    return response.data;
  },

  combineRules: async (ruleIds: string[]) => {
    const response = await axios.post(`${API_URL}/rules/combine`, { ruleIds });
    return response.data;
  },

  deleteRule: async (id: string) => {
    const response = await axios.delete(`${API_URL}/rules/${id}`);
    return response.data;
  },
};
