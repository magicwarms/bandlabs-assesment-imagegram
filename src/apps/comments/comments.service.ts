/**
 * Services
 */
import { ValidationError } from 'class-validator';
import isEmpty from 'lodash/isEmpty';

import validation from '../../config/validation';
import Comments from './model/Comments';
import * as CommentRepository from './comments.repository';
import { checkPostById } from '../posts/posts.service';
import { DeleteResult } from 'typeorm';

/**
 * Service Methods
 */
export const submitComment = async (commmentData: Comments): Promise<Comments | ValidationError[]> => {
    const getPostById = await checkPostById(commmentData.postId);
    if (isEmpty(getPostById)) throw new Error("Post ID doesn't exists");

    const comment = new Comments();

    comment.commentedBy = commmentData.commentedBy;
    comment.comments = commmentData.comments;
    comment.postId = commmentData.postId;

    const validateData = await validation(comment);
    if (validateData.length > 0) return validateData;

    const storeComment = await CommentRepository.store(comment);

    return storeComment;
};

export const deleteComment = async (commmentData: Comments): Promise<DeleteResult> => {
    //check owned comment by user ID
    const checkOwnedComment = await CommentRepository.getCommentByUserIdAndPostId(
        commmentData.commentedBy,
        commmentData.postId,
    );

    if (isEmpty(checkOwnedComment)) {
        throw new Error('This comment not belong to you');
    }
    const commentId = String(commmentData.id);
    return await CommentRepository.destroy(commentId);
};
