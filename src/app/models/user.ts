export interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  employedType: string;
  company?: string;
  status: string;
  gender: string;
  skills: string[];
  agree: boolean;
  role: string;
}
