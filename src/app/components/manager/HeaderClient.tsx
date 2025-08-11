"use client" 


import { useState } from "react"
import Link from "next/link" 

import { FaBars, FaTimes } from "react-icons/fa" 

import { signOut } from "next-auth/react" 

import Header from "@/app/components/Header"




interface HeaderClientProps {
  userName: string | null 
}


export default function HeaderClient({ userName }: HeaderClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) 

  
  const handleLogout = async () => {
  
    
    await signOut({ callbackUrl: "/" }) 
    
  }

  return (
    <>
    
      <Header>
    
        <div className="hidden md:flex items-center justify-between w-full">
    
          <div className="flex-1 flex justify-center">
            <Link
              href="/manager"
              className="text-dodger-blue font-medium border-b-2 border-dodger-blue pb-1 text-base font-inter"
            >
              Dashboard
            </Link>
          </div>

    
          <nav className="flex items-center gap-6 text-base font-inter">
            <Link href="/profile" className="text-dodger-blue hover:text-cornflower-blue transition-colors">
              Your Profile
            </Link>
    
            <div className="text-dodger-blue hover:text-cornflower-blue transition-colors">
              {userName || "Loading..."}
            </div>
    
            <button
              onClick={handleLogout}
              className="text-dodger-blue hover:text-cornflower-blue transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              Logout
            </button>
          </nav>
        </div>
    
        <div className="md:hidden flex items-center justify-end w-full">
    
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-dodger-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-dodger-blue"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
      </Header>
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="fixed right-0 top-0 h-full w-[250px] sm:w-[300px] bg-white p-4 shadow-lg transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()} 
            
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-dodger-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-dodger-blue"
                aria-label="Close navigation menu"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 pt-4 font-inter">
              <Link
                href="/manager"
                className="text-dodger-blue font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="text-dodger-blue hover:text-cornflower-blue transition-colors text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Your Profile
              </Link>
              <div className="text-dodger-blue hover:text-cornflower-blue transition-colors text-lg">
                {userName || "Loading..."}
              </div>
              <button
                onClick={handleLogout}
                className="text-dodger-blue hover:text-cornflower-blue transition-colors text-lg bg-transparent border-none cursor-pointer p-0 text-left"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
