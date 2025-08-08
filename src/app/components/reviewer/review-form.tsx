'use client';

import { useState, useActionState } from 'react';
import { CustomButton } from './custom-button';
import { updateApplicationReview } from '@/app/(main)/reviewer/actions';
import { ApplicationStatus } from './types';
import { cn } from './utils';

interface ReviewFormProps {
  applicationId: string;
  currentComments?: string;
  currentResumeScore?: number;
  currentEssayScore?: number;
  currentStatus?: ApplicationStatus;
}

export default function ReviewForm({
  applicationId,
  currentComments = '',
  currentResumeScore,
  currentEssayScore,
  currentStatus = 'new',
}: ReviewFormProps) {
  const [comments, setComments] = useState(currentComments);
  const [resumeScore, setResumeScore] = useState<number | ''>(
    currentResumeScore ?? ''
  );
  const [essayScore, setEssayScore] = useState<number | ''>(
    currentEssayScore ?? ''
  );
  const [status, setStatus] = useState<ApplicationStatus>(currentStatus);

  const [state, formAction, isPending] = useActionState(
    async (_prevState: any, formData: FormData) => {
      const activityCheckNotes = formData.get('activityCheckNotes') as string;
      const submittedResumeScore = formData.get('resumeScore')
        ? parseInt(formData.get('resumeScore') as string)
        : undefined;
      const submittedEssayScore = formData.get('essayScore')
        ? parseInt(formData.get('essayScore') as string)
        : undefined;
      const submittedStatus = formData.get('status') as ApplicationStatus;

      return await updateApplicationReview(applicationId, {
        activityCheckNotes,
        resumeScore: submittedResumeScore,
        essayScore: submittedEssayScore,
        status: submittedStatus,
      });
    },
    null
  );

  return (
    <form action={formAction} className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Review Details</h3>

      <div>
        <label
          htmlFor="activityCheckNotes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Activity Check Notes
        </label>
        <textarea
          id="activityCheckNotes"
          name="activityCheckNotes"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Enter your activity check notes here..."
          rows={5}
          className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="resumeScore"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Resume Score (0-100)
          </label>
          <input
            type="number"
            id="resumeScore"
            name="resumeScore"
            value={resumeScore}
            onChange={(e) =>
              setResumeScore(
                e.target.value === '' ? '' : parseInt(e.target.value)
              )
            }
            min="0"
            max="100"
            placeholder="e.g., 85"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="essayScore"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Essay Score (0-100)
          </label>
          <input
            type="number"
            id="essayScore"
            name="essayScore"
            value={essayScore}
            onChange={(e) =>
              setEssayScore(
                e.target.value === '' ? '' : parseInt(e.target.value)
              )
            }
            min="0"
            max="100"
            placeholder="e.g., 90"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Application Status
        </label>
        <div className="relative">
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
            className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:cursor-not-allowed disabled:opacity-50 pr-8"
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

      <CustomButton
        type="submit"
        variant="purple"
        disabled={isPending}
        className="w-full"
      >
        {isPending ? 'Saving...' : 'Save & Submit Review'}
      </CustomButton>

      {state?.message && (
        <p
          className={`mt-4 text-sm text-center ${
            state.success ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
