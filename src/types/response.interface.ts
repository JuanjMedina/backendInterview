export interface ApiResponse<T> {
  success: boolean;
  information: T[];
  message: string;
  status: number;
}
