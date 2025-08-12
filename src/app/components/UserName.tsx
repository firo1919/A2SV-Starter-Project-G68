"use client";

interface UserNameProps {
	fullName: string;
}

export default function UserName({ fullName }: UserNameProps) {
	return <p className="text-sm font-semibold text-gray-600">{fullName}</p>;
}
