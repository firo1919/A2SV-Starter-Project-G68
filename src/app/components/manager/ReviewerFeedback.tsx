import React from 'react'

// interface ReviewerResponse {
//   review_details: {
//     id: string
//     application_id: string
//     reviewer_id: string
//     activity_check_notes: string
//     resume_score: number
//     essay_why_a2sv_score: number
//     essay_about_you_score: number
//     technical_interview_score: number
//     behavioral_interview_score: number
//     interview_notes: string
//     created_at: string
//     updated_at: string
//   }
// }

// interface ReviewerFeedbackProps {
//   reviewerResponse: ReviewerResponse
// }


const ReviewerFeedback = () => {
  // const { review_details } = reviewerResponse
  // const essayTotalScore = review_details.essay_why_a2sv_score + review_details.essay_about_you_score

  return (
    <div className=" space-y-6 border border-none bg-white w-180 h-105 py-5 px-4 ml-25 mt-6  mb-9">
      <div className="flex items-center gap-2 mb-4">
      <h2 className="text-xl font-semibold text-gray-900">Reviewer&apos;s Feedback (Jane R.)</h2>
      </div>

      <div className="">
        <p className="font-medium text-sm text-gray-500">Activity Check</p>
        <div className="">
          <p className="text-sm text-black">Pass-50 LC , 35 CF, 30 days active</p>
        </div>
      </div>

      <div className="flex  gap-7">

        <div className="">
          <h3 className="font-medium text-sm text-gray-500 mr-33">Resume Score</h3>
          <span className="text-lg  text-black mr-33">
            85/100
          </span>
        </div>

          <div className="">
            <h3 className="font-medium text-sm text-gray-500">Essay Score</h3>
            <span className="text-lg  text-black">
              90/100
            </span>
          </div>
      </div>

      <div className="flex gap-7">
        <div className="">
          <div className="">
            <h3 className="font-medium text-sm text-gray-500">Tech Interview</h3>
            <span className="text-lg  text-black mr-33">
              83/100
            </span>
          </div>
        </div>

        <div className="">
          <div className="">
            <h3 className="font-medium text-sm text-gray-500">Behavioral</h3>
            <span className="text-lg  text-gray-700">
              92/100
            </span>
          </div>
        </div>
      </div>

      <div className="">
        <p className="font-medium text-sm text-gray-500">Interviewer Notes</p>
        <div className="p-2">
          <p className="text-black"> strong candidate </p>
        </div>
      </div>
    </div>
  )
}

export default ReviewerFeedback
