export interface UpdateProfile {
	full_name: string;
	email: string;
}

export interface ChangePassword {
	old_password: string;
	new_password: string;
}
