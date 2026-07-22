export interface LeadPayload {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  message?: string;
}

export function validateLead(payload: any): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!payload.name || typeof payload.name !== "string" || !payload.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!payload.email || typeof payload.email !== "string" || !payload.email.trim()) {
    errors.email = "Work email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (!payload.company || typeof payload.company !== "string" || !payload.company.trim()) {
    errors.company = "Company name is required.";
  }

  if (!payload.teamSize || typeof payload.teamSize !== "string" || !payload.teamSize.trim()) {
    errors.teamSize = "Team size selection is required.";
  } else {
    const validSizes = ["1-50", "51-200", "201-1000", "1000+"];
    if (!validSizes.includes(payload.teamSize)) {
      errors.teamSize = "Invalid team size option selected.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
