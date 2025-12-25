export interface PhoneInfo {
  request_id: string;
  data: {
    phone_number: string;
    country: string;
    region: string;
    carrier: string;
    timezone: string;
    type: "MOBILE" | "LANDLINE" | "VOIP";
  };
}

export interface Step {
  text: string;
  status: "pending" | "active" | "completed";
  duration: number;
}

