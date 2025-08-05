export default interface RefreshTokenResponse {
    success: boolean;
    data: {
        access: string;
    };
    message: string;
}
