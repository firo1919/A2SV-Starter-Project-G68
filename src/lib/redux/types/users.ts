export interface ForgotUserPass {
	email: string;
	callback_url: string;
}
export interface ResetUserPass {
	token: string;
	new_password: string;
}
