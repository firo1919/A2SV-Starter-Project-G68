// app/(main)/admin/users/[userId]/route.ts
import { auth } from "@/auth";

const baseUrl = process.env.API_BASE!;

export async function DELETE(req: Request, { params }: { params: { userId: string } }) {
	const session = await auth();

	if (!session || session.user.role !== "admin") {
		return new Response("Unauthorized", { status: 403 });
	}

	try {
		const res = await fetch(`${baseUrl}/admin/users/${params.userId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		});

		if (!res.ok) {
			const errorText = await res.text();
			console.error("Error deleting user:", res.status, errorText);
			return new Response("Failed to delete user", { status: res.status });
		}

		return new Response("User deleted successfully", { status: 200 });
	} catch (error) {
		console.error("Unexpected error:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
