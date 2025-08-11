//utils/applicantUtils.ts
import { auth } from "@/auth";

const baseUrl = process.env.API_BASE || "https://a2sv-application-platform-backend-team11.onrender.com";

export async function getApplicationStatusData() {
  const session = await auth();
  const url = `${baseUrl}/applications/my-status`;
  const token = session?.user?.accessToken;

  try {
    if (!token) {
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
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch application status:", error);
    return null;
  }
}

export async function getProfileData() {
  const session = await auth();
  const url = `${baseUrl}/profile/me`;
  const token = session?.user?.accessToken;

  try {
    if (!token) {
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
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
}

export async function getApplicantData() {
  const [applicationStatus, profile] = await Promise.all([
    getApplicationStatusData(),
    getProfileData()
  ]);

  return {
    applicationStatus,
    profile
  };
}
