export type PostImage = {
    postImg?: FileAttribute;
    caption?: string;
};

type FileAttribute = {
    mimetype: string;
    newFilename: string;
    newPath: string;
};
