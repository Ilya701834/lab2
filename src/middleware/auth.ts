import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
// import { getCustomRepository } from 'typeorm';
import { getCustomRepository } from 'typeorm';
import config from '../common/config';

import { UserRepository } from '../resources/users/user.memory.repository';

const { JWT_SECRET_KEY } = config;

export const auth = asyncHandler(  (req: Request, res: Response, next: NextFunction) => {
  if(req.method === 'OPTIONS'){
    next()
  }
  try{
    const token = req.headers.authorization!.split(' ')[2]
     if (!token){
        res.status(StatusCodes.UNAUTHORIZED).json({massage:"not authorized"})
    }
     const decoded = jwt.verify(token!, JWT_SECRET_KEY!)

    const {id} = <any>decoded
    const userRepository = getCustomRepository(UserRepository);
    const user = userRepository.getById(id)
    if(!user){
      res.status(StatusCodes.FORBIDDEN).json({massage:"not found user"})
    } else {
        next()
    }
  } catch (e){
     res.status(StatusCodes.UNAUTHORIZED).json({massage:"not authorized"})
  }
})