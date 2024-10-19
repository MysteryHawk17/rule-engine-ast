import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

export const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  
  if (!Types.ObjectId.isValid(id)) {
     res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    });
    return;
  }
  
  next();
};