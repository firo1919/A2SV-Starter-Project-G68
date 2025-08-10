//utils/adminUtils.ts
import { auth } from "@/auth";
import { AnalyticsResponseType, CycleResponseType, UsersResponseType } from "@/types/AdminTypes";

const baseUrl = process.env.API_BASE;

export async function getData(): Promise<CycleResponseType | null> {
  const url = `${baseUrl}/cycles?limit=100`;
  console.log("Fetching cycle data from:", url);

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: CycleResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

export async function getUsersData(): Promise<UsersResponseType | null> {
  const session = await auth();
  const url = `${baseUrl}/admin/users?limit=100`;
  const token = session?.user?.accessToken;
  const role = session?.user?.role;

  try {
    if (!token) {
      console.log("Not Authenticated");
      return null;
    }

    if (role !== 'admin') {
      console.log("Not Authorized");
      return null;
    }

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.log("Fetch failed with status:", res.status);
      const errorText = await res.text();
      console.log("Response body:", errorText);
      return null;
    }

    const data: UsersResponseType = await res.json();
    console.log("Users data fetched:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

export async function getAnalysisData(): Promise<AnalyticsResponseType | null> {
  const session = await auth();
  const url = `${baseUrl}/admin/analytics`;
  const token = session?.user?.accessToken;
  const role = session?.user?.role;

  try {
    if (!token) {
      console.log("Not Authenticated");
      return null;
    }

    if (role !== 'admin') {
      console.log("Not Authorized");
      return null;
    }

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.log("Fetch failed with status:", res.status);
      const errorText = await res.text();
      console.log("Response body:", errorText);
      return null;
    }

    const data: AnalyticsResponseType = await res.json();
    console.log("Users data fetched:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }  
}
