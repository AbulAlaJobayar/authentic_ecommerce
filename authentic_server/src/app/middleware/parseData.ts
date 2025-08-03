import { NextFunction, Request, Response } from 'express';

const parseData = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return next();
  };
};
export default parseData;
