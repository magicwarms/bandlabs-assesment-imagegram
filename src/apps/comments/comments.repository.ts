import { DeleteResult } from 'typeorm';
import AppDataSource from '../../config/datasource';
import Comments from './model/Comments';

const commentRepository = AppDataSource.getRepository(Comments);

export const store = async (comment: Comments): Promise<Comments> => {
    const storeComment = await AppDataSource.transaction(async (transactionalEntityManager) => {
        return await transactionalEntityManager.getRepository(Comments).save(comment);
    });
    return storeComment;
};

export const getCommentByUserIdAndPostId = async (userId: string, commentId: string): Promise<Comments | null> => {
    return await commentRepository.findOneBy({
        commentedBy: userId,
        id: commentId,
    });
};

export const destroy = async (id: string): Promise<DeleteResult> => {
    return await commentRepository.delete(id);
};
