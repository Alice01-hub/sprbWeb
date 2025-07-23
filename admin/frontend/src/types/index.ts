export interface UserInfo {
  id: number;
  username: string;
  email?: string;
  avatar_url?: string;
  energy: number;
  max_energy: number;
  level: number;
  experience: number;
  created_at?: string;
  updated_at?: string;
}

export interface ButterflyInfo {
  id: number;
  label: string;
  hover_img?: string;
  modal_img?: string;
  link?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
  username?: string;
}

export interface ButterflyUpdate {
  label: string;
  hover_img?: string;
  modal_img?: string;
  link?: string;
  is_active: boolean;
}

export interface SystemStats {
  total_users: number;
  total_butterflies: number;
  active_butterflies: number;
  total_user_butterflies: number;
  active_user_butterflies: number;
} 