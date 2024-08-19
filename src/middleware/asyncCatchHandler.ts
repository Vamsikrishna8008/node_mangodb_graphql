import { NextFunction, Request, Response } from "express";

export function asyncHandler(fn: Function) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack); // Log the error (optional)
  res.status(500).json({ message: `${err.message}` });
}
