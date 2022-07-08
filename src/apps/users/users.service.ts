/**
 * Services
 */
import { ValidationError } from 'class-validator';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import validation from '../../config/validation';
import Users from './model/Users';
import { UserEntity } from './entity/user';
import { UserAuthentification } from './entity/authentication';
import * as UserRepository from './users.repository';

/**
 * Service Methods
 */
export const registerUser = async (userData: UserEntity): Promise<Users | ValidationError[]> => {
    const checkUsernameExist = await UserRepository.getUserByUsername(userData.username);

    if (!isEmpty(checkUsernameExist)) {
        throw new Error('username already existed');
    }
    const userPassword = userData.password as string;

    const user = new Users();
    user.username = userData.username;
    user.password = userPassword;

    const validateData = await validation(user);
    if (validateData.length > 0) return validateData;
    // store encrypt password
    const encryptPassword = bcrypt.hashSync(userPassword, 10);

    user.password = encryptPassword;

    const storeUser = await UserRepository.store(user);

    return storeUser;
};

export const loginUser = async (userData: UserEntity): Promise<UserAuthentification | ValidationError[]> => {
    // PINDAHIN INI KE CONTROLLER AJA
    const checkUsernameExist = await UserRepository.getUserByUsername(userData.username);
    if (!checkUsernameExist) {
        throw new Error('username unknown');
    }

    console.log({ checkUsernameExist });

    const userPassword = userData.password as string;
    //compare the password if validated or not
    const passwordValid = await bcrypt.compare(userPassword, String(checkUsernameExist.password));
    //if not valid, will throw an error
    if (!passwordValid) throw new Error('password is wrong');

    const userId = checkUsernameExist.id as string;
    const username = checkUsernameExist.username;
    const JWT_SECRET: string = process.env.APP_KEY as string;

    const generatedToken: string = jwt.sign(
        {
            id: userId,
            username,
        },
        JWT_SECRET,
        { expiresIn: '30 days', algorithm: 'HS512' },
    );
    return {
        tokenType: 'Bearer',
        expiresIn: '30 days',
        token: generatedToken,
        id: userId,
        username,
    };
};

export const getUserProfile = async (id: string): Promise<Users | null> => {
    const getUser = await UserRepository.getUserProfile(id);
    return !getUser ? null : getUser;
};
