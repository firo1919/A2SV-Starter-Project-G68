import { redirect } from "next/navigation";

export default async function Page() {
	redirect("/manager/dashboard");
}
