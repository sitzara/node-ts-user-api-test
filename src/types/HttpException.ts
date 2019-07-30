class HttpException extends Error {
  status: number;
  message: string;
}

export default HttpException;
