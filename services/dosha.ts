import { DoshaLifestylePlanType } from '@/data/doshaLifestylePlans';

export const doshaService = {
  /**
   * Fetch dosha lifestyle plan data from the backend API
   */
  getDoshaLifestylePlan: async (doshaType: string): Promise<DoshaLifestylePlanType> => {
    try {
      const response = await fetch(`/api/doshas/${doshaType}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch dosha data');
      }
      
      const data = await response.json();
      return data.doshaData;
    } catch (error) {
      console.error('Error fetching dosha data:', error);
      throw error;
    }
  }
};
