// src/middleware/example.ts
import { Request, Response, NextFunction } from 'express';

export const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
