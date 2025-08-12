//app/components/admin/ClientUsersPage.tsx
"use client";
import { useDeleteUserMutation } from "@/lib/redux/api/adminApiSlice";
import { UsersType } from "@/types/AdminTypes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import Search from "./Search";
import UserCard from "./UserCard";
import UsersButton from "./UsersButton";

interface AdminUsersPageTypes {
	initialUsers: UsersType[];
	total_count: number | null;
}

const ClientUsersPage = ({ initialUsers, total_count }: AdminUsersPageTypes) => {
	//Search Search Search Search Searc
	const [users, setUsers] = useState<UsersType[]>(initialUsers);

	const handleSearch = (query: string, role: string = "All Roles") => {
		if (!query && role === "All Roles") {
			setUsers(initialUsers); // reset if nothing to filter
			return;
		}

		const filteredResults = initialUsers.filter((item) => {
			const matchesName = query.trim() ? item.full_name.toLowerCase().includes(query.toLowerCase()) : true; // skip if no query

			const matchesRole = role !== "All Roles" ? item.role.toLowerCase() === role.toLowerCase() : true; // skip if all roles

			return matchesName && matchesRole;
		});

		setUsers(filteredResults);
	};

	//Search Search Search Search Search

	const [currentPage, setCurrentPage] = useState(1);
	const [deleteUser, { error, isLoading }] = useDeleteUserMutation();
	const itemPerPage = 5;

	const totalPages = Math.ceil(users.length / itemPerPage);
	const firstItemIndex = (currentPage - 1) * itemPerPage;
	const lastItemIndex = currentPage * itemPerPage;
	const thisPageItems = users.slice(firstItemIndex, lastItemIndex);

	const handleDelete = async (id: string) => {
		console.log("handleDelete called with ID:", id);
		try {
			const result = await deleteUser({ id: id }).unwrap();
			console.log("User deleted:", result);
			setUsers((prev) => prev.filter((user) => user.id !== id));
		} catch (err) {
			console.error("Delete failed", err);
			alert("Failed to delete user");
		}
	};

	return (
		<div className="flex flex-col gap-4 md:gap-8 items-center">
			<div className="flex w-full md:w-[1280px] justify-between p-4 md:p-10 items-center">
				<div>
					<h1 className="font-bold text-[25px] md:text-[30px]">User Management</h1>
					<p className="font-normal text-[#4B5563]">Administer and manage all users on the platform.</p>
				</div>
				<UsersButton />
			</div>
			<div>
				<Search onSearch={handleSearch} />
			</div>
			<div className="flex flex-col w-9/10 md:w-[1240px] mx-auto">
				<div className="hidden md:flex justify-start w-full bg-[#F9FAFB] p-4 md:gap-55">
					<h1 className="mr-25">NAME</h1>
					<h2>ROLE</h2>
					<h2>STATUS</h2>
				</div>
				<div className="flex flex-col gap-3 md:gap-0 items-center">
					{thisPageItems.map((user) => (
						<UserCard
							key={user.id}
							id={user.id}
							profile={user.profile_picture}
							username={user.full_name}
							user_email={user.email}
							role={user.role}
							status={user.is_active}
							onDelete={handleDelete}
						/>
					))}
				</div>
			</div>
			<div className="flex justify-between items-center w-9/10 md:w-[1240px] mt-4 md:mt-10 mb-4 md:mb-25">
				<p>
					Showing {firstItemIndex + 1} to {Math.min(lastItemIndex, users.length)} of {total_count} results
				</p>
				<div className="flex items-center">
					<button
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
						className="bg-gray-200 px-3 py-1 disabled:opacity-50 text-[#6B7280]"
					>
						<ArrowBackIcon />
					</button>
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
						<button
							key={page}
							onClick={() => setCurrentPage(page)}
							className={`px-3 py-1 ${
								page === currentPage
									? "bg-[#EEF2FF] text-[#6366F1] border-[#6366F1] border"
									: "bg-white text-[#6B7280] border border-[#D1D5DB]"
							}`}
						>
							{page}
						</button>
					))}
					<button
						onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
						disabled={currentPage === totalPages}
						className="bg-gray-200 px-3 py-1 disabled:opacity-50 text-[#6B7280]"
					>
						<ArrowForwardIcon />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ClientUsersPage;
