export const isFileValid = (mimetype: string) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/bmp'];
    if (validTypes.indexOf(mimetype) === -1) {
        return false;
    }
    return true;
};
