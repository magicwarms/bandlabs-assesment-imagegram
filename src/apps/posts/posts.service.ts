/**
 * Services
 */
import Formidable from 'formidable';
import fs from 'fs';
import { IncomingMessage } from 'http';
import { ValidationError } from 'class-validator';

import { customAlphabet } from 'nanoid';
import cloudinary from '../../config/cloudinary';

import Posts from './model/Posts';
import * as PostRepository from './posts.repository';

import validation from '../../config/validation';
import { PostImage } from './entity/postImage';
import { isFileValid } from '../../utilities/filevalidation';
import { resizeImage } from '../../utilities/resizeImage';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 6);

/**
 * Service Methods
 */
const deleteDirectoryOrFile = (path: string, newFilename: string): void => {
    fs.rm(path, { recursive: true, force: true }, () => {
        console.log(`File and directory deleted - ${newFilename}`);
    });
};

const uploadToLocalDir = (req: IncomingMessage): Promise<PostImage> => {
    const uploadFolderName = nanoid();
    const uploadFolder = process.cwd() + '/public/files';
    const newPath = `${uploadFolder}/${uploadFolderName}`;
    // create folder if not exists
    if (!fs.existsSync(newPath)) fs.mkdirSync(newPath);

    const form = Formidable({
        maxFileSize: 100 * 1024 * 1024,
        uploadDir: newPath,
        filename: (name: string, ext: string): string => {
            return `${name.replace(/ /g, '-').toLowerCase()}${ext}`;
        },
        keepExtensions: true,
    });

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files: PostImage) => {
            if (err) {
                reject(err);
                return;
            }
            if (files.postImg) {
                files.caption = fields.caption as string;
                files.postImg.newPath = newPath;
                resolve(files);
            }
        });
    });
};

const uploadToCloudinary = (newPath: string, newFilename: string): Promise<cloudinary.UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            `${newPath}/${newFilename}`,
            (error: Error, result: cloudinary.UploadApiResponse) => {
                if (error) {
                    deleteDirectoryOrFile(newPath, newFilename);
                    return reject('File upload to online storage error');
                }
                return resolve(result);
            },
        );
    });
};

export const submitPost = async (req: IncomingMessage, userId: string): Promise<Posts | ValidationError[]> => {
    let resultStore: Posts = { id: '', userId: '', postUrl: '', caption: '', postOriginalUrl: '' };
    // upload to local dir
    const uploadFile: PostImage = await uploadToLocalDir(req);

    if (uploadFile.postImg) {
        const filenameMimetype = uploadFile.postImg.mimetype;
        const newFilename = uploadFile.postImg.newFilename;
        const newPath = uploadFile.postImg.newPath;

        const isValid = isFileValid(filenameMimetype);

        if (!isValid) {
            deleteDirectoryOrFile(newPath, newFilename);
            throw new Error('File extension is not valid');
        }

        const resizeContent = await resizeImage(newPath, newFilename);

        if (resizeContent.newFilename !== '') {
            // start upload resized file
            const result = await uploadToCloudinary(newPath, resizeContent.newFilename);
            // start upload original format
            const resultOriginalFormat = await uploadToCloudinary(newPath, newFilename);

            const post = new Posts();
            post.userId = userId;
            post.caption = uploadFile.caption as string;
            post.postUrl = result.secure_url;
            post.postOriginalUrl = resultOriginalFormat.secure_url;

            const validateData = await validation(post);
            if (validateData.length > 0) return validateData;

            resultStore = await PostRepository.store(post);
            if (resultStore) deleteDirectoryOrFile(newPath, newFilename);
        }
    }
    return resultStore;
};

export const getAllPosts = async (): Promise<Posts[]> => {
    const getAllUserPosts = await PostRepository.getAll();
    return getAllUserPosts.length < 1 ? [] : getAllUserPosts;
};

export const checkPostById = async (postId: string): Promise<Posts | null> => {
    return await PostRepository.getById(postId);
};
