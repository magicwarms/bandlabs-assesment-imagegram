import AppDataSource from '../../config/datasource';
import Users from './model/Users';

const userRepository = AppDataSource.getRepository(Users);

const cacheDuration = 300000;

/**
 * Repository Methods
 */
export const getUserProfile = async (id: string): Promise<Users | null> => {
    return await userRepository.findOne({
        where: { id },
        cache: {
            id: `user-${id}`,
            milliseconds: cacheDuration,
        },
    });
};

export const store = async (user: Users): Promise<Users> => {
    const storeUser = await AppDataSource.transaction(async (transactionalEntityManager) => {
        return await transactionalEntityManager.getRepository(Users).save(user);
    });
    return storeUser;
};

export const getUserByUsername = async (username: string): Promise<Users | null> => {
    return await userRepository.findOneBy({
        username,
    });
};
