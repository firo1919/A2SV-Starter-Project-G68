
import Image from 'next/image'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div>
      <div className="relative mb-5">
        <Image 
          className="w-full h-60 md:h-80 lg:h-96 object-cover" 
          src="/images/HomePage-image.png" 
          alt='HomePage-Image' 
          width={1200} 
          height={400}
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
            Forge Your Future in Tech
          </h1>
          <p className="text-white/90 text-sm md:text-base lg:text-lg mb-6 max-w-2xl">
            Join an elite community of Africa&apos;s brightest minds, and get fast-tracked to a
            software engineering career at the world&apos;s leading tech companies.          
            </p>
          <Link href="/login">
            <button className="bg-indigo-800 cursor-pointer hover:bg-indigo-900 text-white px-6 py-3 md:px-8 md:py-4 rounded-md font-semibold transition-colors">
              Start Your Application
            </button>
          </Link>
        </div>
      </div>

      <div className="flex gap-3 md:gap-10 justify-center mb-6 px-4 mt-7">
        <Image src="/images/google.png" alt='Google-Image' width={170} height={60} className="md:w-[200px] md:h-[50px] mr-15" />
        <Image src="/images/amazon.png" alt='Amazon-Image' width={170} height={60} className="md:w-[200px] md:h-[50px] mr-15"/>
      </div>

      <div id="thejourney" className="bg-white w-full py-10 md:py-20 px-4 md:px-8 lg:px-60">
        <h1 className='font-bold ml-50 text-2xl md:text-3xl text-center md:text-left mb-3 text-black'>Your Journey to Silicon Valley</h1>
        <p className="text-center ml-60 md:text-left mb-6 text-gray-500 text-sm md:text-base">A proven path from learning to leadership</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row">
            <Image className="w-10 h-10 mr-0 md:mr-2 mb-2 md:mb-0" src="/images/icon1.png" alt='icon' width={40} height={40}/>
            <div>
              <h1 className="text-black font-bold text-[15px] mb-1">Phase1: Foundations</h1>
              <p className="text-gray-500 text-sm">Master data structures, algorithms, and problem-solving techniques in an intensive 3 month bootcamp</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row">
            <Image className="w-10 h-10 mr-0 md:mr-2 mb-2 md:mb-0" src="/images/icon2.png" alt='icon' width={40} height={40}/>
            <div>
              <h1 className="text-black font-bold text-[15px] mb-1">Phase2: Real World Projects</h1>
              <p className="text-gray-500 text-sm">Apply your skills to build complex projects, collaborate in teams, and prepare for technical interviews</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row">
            <Image className="w-10 h-10 mr-0 md:mr-2 mb-2 md:mb-0" src="/images/icon3.png" alt='icon' width={40} height={40}/>
            <div>
              <h1 className="text-black font-bold text-[15px] mb-1">Phase3: Internship Placement</h1>
              <p className="text-gray-500 text-sm">We help you secure internships at top global tech companies to gain valuable experience.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row">
            <Image className="w-10 h-10 mr-0 md:mr-2 mb-2 md:mb-0" src="/images/icon4.png" alt='icon' width={40} height={40}/>
            <div>
              <h1 className="text-black font-bold text-[15px] mb-1">Phase4: Full-Time Conversion</h1>
              <p className="text-gray-500 text-sm">Excel in your internship and convert it into a full time offer, launching your global career.</p>
            </div>
          </div>
        </div>
      </div>


      <div id="about" className="flex flex-col lg:flex-row gap-5 mb-15 px-4 md:px-8 lg:px-12 py-10" >
        <div className="lg:ml-50 lg:mt-40 lg:w-130 lg:mr-7 mb-10 lg:mb-20">
          <h1 className="text-black font-bold text-xl md:text-2xl mb-4">Built by Engineers, for Engineers</h1>
          <p className="text-gray-500 text-sm md:text-base">A2SV is not just a program, it&apos;s a community. We&apos;re on a mission to identify Africa&apos;s most brilliant minds and provide them with the tools to solve humanity&apos;s greatest challenges.</p>
        </div>
        <div className="flex justify-center lg:justify-start">
          <Image className="max-w-full h-auto" src="/images/main-image.png" alt='main-image' width={420} height={300} />
        </div>
      </div>


      <div id="testimonials" className="bg-white/70 w-full py-10 md:py-20 px-4 md:px-8 lg:px-50">
        <h1 className="text-black font-bold text-xl md:text-2xl text-center mb-6">Hear from Our Alumni</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white text-sm py-7 px-7 rounded-lg shadow-sm">
            <p className='text-black/80 mb-5'>&quot;A2SV completely changed the trajectory of my career. The training is intense, but the community and the opportunities are unparalleled. I&apos;m now at my dream company, and I owe it all to A2SV.&quot;</p>
            <div className='flex items-center'>
              <Image className='mr-2 rounded-full' src="/images/Profile1.png" alt='Profile image' width={43} height={43} />
              <div>
                <h1 className='text-black font-bold'>Abel Tadess</h1>
                <p className='text-gray-400'>Software Engineer, Google</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white text-sm py-7 px-7 rounded-lg shadow-sm">
            <p className='text-black/80 mb-5'>&quot;The problem-solving skills I learned at A2SV are immense. The mentors push you to be your best, and you&apos;re surrounded by people who are just as passionate as you are&quot;</p>
            <div className='flex items-center'>
              <Image className='mr-2 rounded-full' src="/images/Profile2.png" alt='Profile image' width={43} height={43} />
              <div>
                <h1 className='text-black font-bold'>Bethlehem Tadesse</h1>
                <p className='text-gray-400'>Software Engineer, Amazon</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white text-sm py-7 px-7 rounded-lg shadow-sm md:col-span-2 lg:col-span-1">
            <p className='text-black/80 mb-5'>&quot;A2SV is more than a bootcamp. It&apos;s a family that supports you long after you&apos;ve graduated. The network you build here is for life.&quot;</p>
            <div className='flex items-center'>
              <Image className='mr-2 rounded-full' src="/images/Profile3.png" alt='Profile image' width={43} height={43} />
              <div>
                <h1 className='text-black font-bold'>Caleb Aleayehu</h1>
                <p className='text-gray-400'>Software Engineer, Google</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 py-10 md:py-20 w-full text-center px-4">
        <h1 className="text-white text-2xl md:text-3xl mb-5">Ready to change your life?</h1>
        <p className="text-gray-200 text-sm md:text-base max-w-md mx-auto mb-8">The next application cycle is now open. Take the first step towards your dream career.</p>
        <Link href="/login">
          <button className="text-indigo-900 cursor-pointer bg-white hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-colors">
            Apply Now
          </button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
