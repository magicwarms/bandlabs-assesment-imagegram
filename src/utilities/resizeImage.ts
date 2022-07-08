import sharp from 'sharp';

export const resizeImage = async (filepath: string, filename: string) => {
    const getFilename = filename.split('.');
    const newFilename = `resized-${getFilename[0]}.jpg`;
    const resizedContent = await sharp(`${filepath}/${filename}`).resize(600, 600).toFile(`${filepath}/${newFilename}`);
    if (!resizedContent) throw new Error('post resize error');
    return { newFilename };
};
