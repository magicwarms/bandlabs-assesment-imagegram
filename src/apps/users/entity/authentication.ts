export type UserAuthentification = {
    tokenType: string;
    expiresIn: string;
    token: string;
    id: string;
    username: string;
};

export type AuthenticatedUser = {
    id: string;
    username: string;
};

export type CustomResponse = {
    code: number;
    message: string;
};
