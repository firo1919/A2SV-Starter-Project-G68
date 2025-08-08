'use client';
import React from 'react';
import { useState } from 'react';
import { useActionState } from 'react';
import { CustomButton } from './custom-button';
import { updateApplicationReview } from '@/app/reviews/actions';
import { ApplicationStatus } from './types';
import { cn } from './utils';

interface ReviewFormProps {
  applicationId: string;
  currentComments?: string;
  currentScore?: number;
  currentStatus?: ApplicationStatus;
}

export default function ReviewForm({
  applicationId,
  currentComments = '',
  currentScore,
  currentStatus = 'new',
}: ReviewFormProps) {
  const [state, formAction, isPending] = useActionState(updateApplicationReview, null);
  const [comments, setComments] = useState(currentComments);
  const [score, setScore] = useState<number | ''>(currentScore !== undefined ? currentScore : '');
  const [status, setStatus] = useState<ApplicationStatus>(currentStatus);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const reviewComments = formData.get('reviewerComments') as string;
        const reviewScore = formData.get('score') ? parseInt(formData.get('score') as string) : undefined;
        const reviewStatus = formData.get('status') as ApplicationStatus;

        await formAction(applicationId, {
          reviewerComments: reviewComments,
          score: reviewScore,
          status: reviewStatus,
        });
      }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">Submit/Update Review</h3>

      <div>
        <label htmlFor="reviewerComments" className="block text-sm font-medium text-gray-700 mb-1">
          Reviewer Comments
        </label>
        <textarea
          id="reviewerComments"
          name="reviewerComments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Enter your review comments here..."
          rows={5}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">
          Score (0-100)
        </label>
        <input
          type="number"
          id="score"
          name="score"
          value={score}
          onChange={(e) => setScore(e.target.value === '' ? '' : parseInt(e.target.value))}
          min="0"
          max="100"
          placeholder="e.g., 85"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Application Status
        </label>
        <div className="relative">
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
            className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-8"
          >
            <option value="new">New</option>
            <option value="under-review">Under Review</option>
            <option value="review-complete">Review Complete</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <CustomButton type="submit" variant="purple" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit Review'}
      </CustomButton>

      {state?.message && (
        <p className={`mt-4 text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
