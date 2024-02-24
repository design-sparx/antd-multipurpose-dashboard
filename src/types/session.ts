export type Session = {
  id: string;
  login_time: string;
  login_location: string;
  device_type: 'mobile' | 'desktop' | 'tablet' | string;
  browser: string;
  ip_address: string;
  session_type: string;
  status: 'active' | 'suspended' | 'locked' | string;
  login_duration: number;
  login_attempts: number;
};
