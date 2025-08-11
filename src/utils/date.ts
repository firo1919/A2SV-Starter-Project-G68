export function formatDate(date: string) {
	const parsedDate = new Date(Date.parse(date));
	return `${parsedDate.toLocaleString("default", {
		month: "short",
	})} ${parsedDate.getDay()}, ${parsedDate.getFullYear()}   ${parsedDate.toLocaleTimeString()}`;
}
