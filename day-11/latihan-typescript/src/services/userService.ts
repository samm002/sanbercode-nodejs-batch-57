import { User } from "../models/user";

export const addUser = (users: User[], newUser: User): User[] => {
  return [...users, newUser];
};

export const removeUser = (users: User[], userId: number): User[] => {
  return users.filter(user => user.id !== userId);
};

export const updateUser = (users: User[], updatedUser: User): User[] => {
  return users.map(user =>
    user.id === updatedUser.id ? updatedUser : user
  );
};

export const getUsers = (users: User[]): User[] => {
  return users;
};