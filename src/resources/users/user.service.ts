import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import UserModel from './user.entity';

import { UserRepository } from './user.memory.repository';

const createUser = async (data: Omit<UserModel, 'id'>): Promise<UserModel> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.createUser(data);
  return user;
};

const getAll = async (): Promise<UserModel[]> => {
  const userRepository = getCustomRepository(UserRepository);
  return userRepository.getAllUsers();
};

const getById = async (id: string): Promise<UserModel | null> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.getById(id);
  if (!user) return null;
  return user;
};

const findByCredentials = async (login: string, password: string): Promise<UserModel | null> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findByCredentials(login);
  if (!user) return null;
  const passwordVerification = await bcrypt.compare(password, user.password);
  if (!passwordVerification) return null;
  return user;
};

const deleteById = async (id: string): Promise<UserModel | null> => {
  const userRepository = getCustomRepository(UserRepository);
  const userDeletable = await userRepository.getById(id);
  if (!userDeletable) return null;
  await userRepository.deleteById(id);

  return userDeletable;
};

const updateById = async (id: string, data: Omit<UserModel, 'id'>): Promise<UserModel | null> => {
  const userRepository = getCustomRepository(UserRepository);
  await userRepository.updateById(id, data);
  const user = await userRepository.getById(id);
  if (!user) return null;
  return user;
};

export default { getAll, getById, findByCredentials, createUser, deleteById, updateById };