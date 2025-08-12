export interface UpdateProfile {
	full_name: string;
	email: string;
	profile_picture: File | null;
}

export interface ChangePassword {
	old_password: string;
	new_password: string;
}
