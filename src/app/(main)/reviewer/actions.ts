'use server'

import { revalidatePath } from 'next/cache';
import { Application } from '@/app/components/reviewer/types';

interface UpdateReviewPayload {
  activityCheckNotes?: string;
  resumeScore?: number;
  essayScore?: number;
  status?: Application['status'];
}

export async function updateApplicationReview(
  applicationId: string, 
  payload: UpdateReviewPayload
) {
  const baseUrl = process.env.API_BASE;

  if (!baseUrl) {
    return { success: false, message: "API Base URL is not defined." };
  }

  const url = `${baseUrl}/reviews/${applicationId}/`;
  console.log(`Attempting to update review for application ${applicationId} at ${url}`);
  console.log("Payload:", payload);

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to update review: ${response.status} ${response.statusText}`, errorData);
      return { success: false, message: `Failed to update review: ${errorData.detail || response.statusText}` };
    }

    const updatedApplication: Application = await response.json();
    console.log(`Review for application ${applicationId} updated successfully.`, updatedApplication);

    revalidatePath(`/reviews/${applicationId}`);
    revalidatePath('/'); 

    return { success: true, message: "Review updated successfully!", data: updatedApplication };
  } catch (error) {
    console.error(`An unexpected error occurred while updating review for application ${applicationId}:`, error);
    return { success: false, message: `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}` };
  }
}
