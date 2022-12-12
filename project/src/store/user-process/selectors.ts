import NameSpace from '../../consts/name-space';
import { State } from '../../types/state';
import User from '../../types/user';


export const getAuthorizationStatus = (state: State): string => state[NameSpace.User].authorizationStatus;
export const getUser = (state: State): User | null => state[NameSpace.User].user;
