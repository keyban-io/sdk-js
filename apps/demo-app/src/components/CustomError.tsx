// components/Error.tsx
import type React from "react";

interface CustomErrorProps {
  message: string;
}

const CustomError: React.FC<CustomErrorProps> = ({ message }) => (
  <div className="customError">{message}</div>
);

export default CustomError;
