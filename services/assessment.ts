interface AssessmentResult {
  vata: number;
  pitta: number;
  kapha: number;
  dominantDosha: string;
  completed: boolean;
  completedAt?: string;
}

export const assessmentService = {
  /**
   * Save assessment results to localStorage
   */
  saveResults: (results: Omit<AssessmentResult, 'completed' | 'completedAt'>) => {
    const completedResult: AssessmentResult = {
      ...results,
      completed: true,
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem('doshaAssessment', JSON.stringify(completedResult));
    return completedResult;
  },
  
  /**
   * Check if assessment is completed
   */
  isCompleted: (): boolean => {
    const assessment = localStorage.getItem('doshaAssessment');
    if (!assessment) return false;
    
    try {
      const parsedAssessment = JSON.parse(assessment) as AssessmentResult;
      return parsedAssessment.completed === true;
    } catch (e) {
      return false;
    }
  },
  
  /**
   * Get assessment results
   */
  getResults: (): AssessmentResult | null => {
    const assessment = localStorage.getItem('doshaAssessment');
    if (!assessment) return null;
    
    try {
      return JSON.parse(assessment) as AssessmentResult;
    } catch (e) {
      return null;
    }
  },
  
  /**
   * Clear assessment results
   */
  clearResults: () => {
    localStorage.removeItem('doshaAssessment');
  }
};
