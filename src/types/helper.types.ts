export interface CustomError {
  status: number;
  data: CustomErrorData;
}

interface CustomErrorData {
  code: number;
  status: string;
  message: string;
}
