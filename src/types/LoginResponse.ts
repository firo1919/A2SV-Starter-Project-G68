export default interface LoginResponse {
    success: boolean;
    data: {
        access: string;
        refresh: string;
        role: string;
    };
    message: string;
}
