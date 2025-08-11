import { redirect } from "next/navigation";

function AdminRootPage() {
	redirect("/admin/dashboard");
}

export default AdminRootPage;
