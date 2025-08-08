"use server"; // <-- Add this at the top to mark this as a server action

import { revalidatePath } from "next/cache";
import { Application } from "@/app/components/reviewer/types";

interface UpdateReviewPayload {
  reviewerComments?: string;
  score?: number;
  status?: Application["status"];
}

export async function updateApplicationReview(
  applicationId: string,
  payload: UpdateReviewPayload
) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

  if (!baseUrl) {
    return { success: false, message: "API Base URL is not defined." };
  }

  const url = `${baseUrl}/reviews/${applicationId}/`;
  console.log(`Attempting to update review for application ${applicationId} at ${url}`);

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${YOUR_TOKEN}`, // if required
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to update review: ${response.status} ${response.statusText}`, errorData);
      return {
        success: false,
        message: `Failed to update review: ${errorData.detail || response.statusText}`,
      };
    }

    const updatedApplication: Application = await response.json();
    console.log(`Review for application ${applicationId} updated successfully.`, updatedApplication);

    revalidatePath(`/reviews/${applicationId}`);
    revalidatePath("/");

    return { success: true, message: "Review updated successfully!", data: updatedApplication };
  } catch (error) {
    console.error(`Error updating review for application ${applicationId}:`, error);
    return {
      success: false,
      message: `An unexpected error occurred: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}
