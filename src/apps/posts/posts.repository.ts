import AppDataSource from '../../config/datasource';
import Posts from './model/Posts';

const postRepository = AppDataSource.getRepository(Posts);

const cacheDuration = 300000;

export const store = async (post: Posts): Promise<Posts> => {
    const storePost = await AppDataSource.transaction(async (transactionalEntityManager) => {
        return await transactionalEntityManager.getRepository(Posts).save(post);
    });
    return storePost;
};

export const getAll = async (): Promise<Posts[]> => {
    return await postRepository.find({
        cache: {
            id: `alluserpost`,
            milliseconds: cacheDuration,
        },
    });
};
