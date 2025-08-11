import type React from "react"
import { auth } from "@/auth"
import HeaderClient from "@/app/components/manager/HeaderClient"




interface UserProfileData {
  success: boolean
  data?: {
    full_name: string
  }
  message?: string
}


async function getUserName(accessToken: string, apiBase: string): Promise<string | null> {
  try {
    const response = await fetch(`${apiBase}/profile/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store", 
      
    })

    if (!response.ok) {
      
      
      console.error(`Server: Failed to fetch user profile: ${response.status} ${response.statusText}`)
      const errorText = await response.text()
      console.error("Server: Response Body:", errorText)
      return "User" 
      
    }

    const result: UserProfileData = await response.json()

    if (result.success && result.data && result.data.full_name) {
      return result.data.full_name
    } else {
      
      
      console.warn("Server: User profile data not found or success is false:", result.message)
      return "User" 
      
    }
  } catch (error) {
    
    
    console.error("Server: Error fetching or parsing user profile:", error)
    return "Error" 
    
  }
}


export default async function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth()


  const apiBase = process.env.API_BASE || null


  if (!apiBase) {
    console.error("Server: API_BASE environment variable is not set for manager layout.")
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Configuration Error: API Base URL is not set. Please contact support.
      </div>
    )
  }


  let userName: string | null = null

  
  if (session?.user?.accessToken) {
  
    
    userName = await getUserName(session.user.accessToken, apiBase)
  } else {

    userName = "Guest"
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      <HeaderClient userName={userName} />

      <main className="p-4 md:p-8 max-w-screen-xl mx-auto">{children}</main>
    </div>
  )
}
