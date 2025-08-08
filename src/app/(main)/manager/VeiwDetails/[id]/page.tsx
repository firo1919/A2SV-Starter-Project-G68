
import ManagerAction from '@/app/components/manager/ManagerAction'
import ApplicantProfile from '@/app/components/manager/ApplicantProfile'
import ReviewerFeedback from '@/app/components/manager/ReviewerFeedback'
import React from 'react'

// interface ProfileData {
//     success:boolean,
//     data: {
//     id: string,
//     applicant_details: {
//       id: string,
//       applicant_name: string,
//       status: string,
//       school: string,
//       student_id: string,
//       country: string,
//       degree: string,
//       leetcode_handle: string,
//       codeforces_handle: string,
//       essay_why_a2sv: string,
//       essay_about_you: string,
//       resume_url: string,
//       submitted_at : string,
//       updated_at: string ,
//     },
// }

// interface ReviewDetails{
//     review_details: {
//       id: string,
//       application_id: string,
//       reviewer_id: string,
//       activity_check_notes: string,
//       resume_score: number,
//       essay_why_a2sv_score: number,
//       essay_about_you_score: number,
//       technical_interview_score: number,
//       behavioral_interview_score: number,
     
//       interview_notes: string,
//       created_at: string,
//       updated_at: string,
//     }
// }

// interface Response {
//   success:boolean,
//   data: {
//     id: string,
//     applicant_details: {
//       id: string,
//       applicant_name: string,
//       status: string,
//       school: string,
//       student_id: string,
//       country: string,
//       degree: string,
//       leetcode_handle: string,
//       codeforces_handle: string,
//       essay_why_a2sv: string,
//       essay_about_you: string,
//       resume_url: string,
//       submitted_at : string,
//       updated_at: string ,
//     },    
//     review_details: {
//       id: string,
//       application_id: string,
//       reviewer_id: string,
//       activity_check_notes: string,
//       resume_score: number,
//       essay_why_a2sv_score: number,
//       essay_about_you_score: number,
//       technical_interview_score: number,
//       behavioral_interview_score: number,
//       interview_notes: string,
//       created_at: string,
//       updated_at: string,
//     }
//   },
//   message: string;
// }


// interface ApplicantProfileProps {
//   profileData: ProfileData

// interface ReviewerFeeedback{
//     reviewDetails = ReviewDetails
// }

const VeiwDetaillsPage = () => {
//     const  baseUrl = process.env.API_BASE
//     const FectchData = async () =>{
//         try{
//         const response = await fetch(`{baseUrl}/reviews/{application_id}/Get Applicant Review`)
//         const res:Response = response.json()
//         console.log("fetch data" , res)
//         }

//     }


  return (
    <div>
        <h1 className="text-black font-[25px] text-[25px] ml-25 mt-25"> <strong> Manager: Abel Tadesse</strong> </h1>
        <div className=" flex gap-8">
            <ApplicantProfile />
        <ManagerAction />
        </div>
      
      <ReviewerFeedback/>
    </div>
  )
}

export default VeiwDetaillsPage
