import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const withSchema = (schema: z.AnyZodObject) =>
  function middleware(req: Request, res: Response, next: NextFunction) {
    try {
      // Try to validate the schema
      req.body = schema.parse(req.body);

      // If everything went right, continue
      next();
    } catch (err: any) {
      res.status(400).json(err);
    }
  };

export default withSchema;
