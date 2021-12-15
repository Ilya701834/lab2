import jwt, { Secret } from 'jsonwebtoken';
import usersService from '../users/user.service';
import config from '../../common/config';

const { JWT_SECRET_KEY } = config;

const gettingToken = async (userLogin: string, userPassword: string): Promise<string | null> => {
  const user = await usersService.findByCredentials(userLogin, userPassword);
  if (!user) {
    return null;
  }
  const { id, login } = user;
  const token = jwt.sign({ id, login }, <Secret>JWT_SECRET_KEY, {
    expiresIn: '2m',
  });
  return token;
};

export default { gettingToken };