import React, { useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { CardsSection } from '../components/CardSec';
import { Card } from '../components/card';
import { PlusIcon } from "../svgs/plusIcon"
import { Button } from '../components/Button';
import { ContentModal2 } from '../components/contentModal2';
import { Footer } from '../components/footer';


export function Landing() {

    const navigate = useNavigate();
    const [contentItems, setContentItems] = useState<
  { title: string; link: string; type: string }[]>([]);
  const [landingset, landingsetIt] = useState(false);
  const [summOpen, setSummOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    return(
<div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 relative overflow-hidden overflow-x-hidden scroll-smooth transform-gpu will-change-transform">
  <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-500 opacity-30 blur-3xl rounded-full  transform-gpu" />
  <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-700 opacity-20 blur-2xl rounded-full -translate-x-1/2 -translate-y-1/2 transform-gpu" />
  <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-800 opacity-25 blur-2xl rounded-full transform-gpu" />
  <div className=' relative overflow-hidden overflow-x-hidden scroll-smooth transform-gpu will-change-transform pb-30'>
    <ContentModal2
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSubmit={(item) => {
        setContentItems(prev => [...prev, item]);
        setModalOpen(false);
      }}
    />
    <div className='flex flex-col items-center justify-center text-center pt-4 pb-10 md:mt-0 text-glow-pulse  relative overflow-hidden overflow-x-hidden scroll-smooth transform-gpu will-change-transform'
      data-aos="fade-up"
      data-aos-delay="0">

        <p className='text-3xl md:text-3xl font-bold font-orbitron text-white pt-4  '>Tired of Scattered </p>
        <p className='text-3xl md:text-3xl font-bold font-orbitron text-white'>Tabs, Tweets & Videos?</p>
        
    </div>
    <div className="relative z-10 flex flex-col-reverse sm:gap-4 md:flex-row items-center justify-center px-6 md:px-10 py-0 gap-16 text-white">

      <div className="text-center md:text-left space-y-2 pb-12  transform-gpu"
        data-aos="fade-up"
        data-aos-delay="0">
          <p className="text-3xl md:text-7xl font-bold font-orbitron text-white text-glow-pulse">
              Curate Your
          </p>

          <p className="text-3xl md:text-7xl font-bold font-orbitron text-white text-glow-pulse pb-5">
              Digital Brain
          </p>
          <p className="text-3xl md:text-7xl font-bold font-orbitron text-white text-glow-pulse pb-5">
              With Brainly
          </p>
          <button
          onClick={() => navigate('/signup')}
          className="mt-10 bg-white text-purple-800 font-bold py-2 px-6 font-michroma rounded-full hover: transition-all hover-glow"
        >
          Start Saving Now
        </button>
          <div className='py-4'
            data-aos="fade-up"
            data-aos-delay="0">
              <p className='text-sm md:text-xl font-bold font-michroma pt-2'> Save and search your favorite </p>
              <p className='text-sm md:text-xl font-bold font-michroma pt-2 '>videos, tweets, and articles</p>
              <p className='text-sm md:text-xl font-bold font-michroma pt-2 '> — all in one place, forever.</p>
              <p className="text-sm md:text-xl font-bold font-michroma pt-2  mt-4">Collect. Connect. Remember.</p>
          

          </div>
    </div>
      <div className="flex flex-col items-center justify-center ">
        <img
            className="w-60 h-60 sm:w-80 sm:h-80 md:w-[42rem] md:h-[42rem] object-contain animate-float  "
            src="/icons/3dhero.png"
            alt="3D Brain"
            loading = "lazy"
          />
        </div>
    </div>
      <div className='flex flex-col items-center justify-center text-center pt-3 md:mt-0 text-glow-pulse  relative overflow-hidden overflow-x-hidden scroll-smooth transform-gpu will-change-transform'>
            <p className='text-3xl md:text-3xl font-bold font-orbitron text-white pt-10  '
        data-aos="fade-up"
        data-aos-delay="0">Why choose Brainly ?</p>
          <CardsSection/>
      </div>
        <div>
          <div
            className="mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-60 mb-10 bg-white/10 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl border border-white/20 shadow-xl flex flex-col items-center justify-center gap-4 hover:scale-105 transition-transform duration-300 text-center pt-8 md:pt-16 transform-gpu backface-hidden will-change-transform relative overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="0"
                >
            <h2 className="text-2xl md:text-4xl font-bold text-white font-orbitron text-glow-pulse">
              Ready to remember everything?
            </h2>
            <p className="text-white font-michroma mb-4 mt-4 text-sm md:text-base lg:text-lg">
              Start building your digital brain in seconds.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="mt-2 bg-white text-purple-800 font-bold py-2 px-6 font-michroma rounded-full hover: transition-all hover-glow"
            >
              Get Started
            </button>
          </div>
          <div
            className="mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-60 mb-10 bg-white/10 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl border border-white/20 shadow-xl  hover:scale-105 transition-transform duration-300 text-center pt-8 md:pt-16 transform-gpu backface-hidden will-change-transform relative overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="0"
            >
            <h2 className="text-2xl pb-10 md:text-4xl font-bold text-white font-orbitron text-glow-pulse">
            Store Anything, Even This.
              </h2>
              <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6 px-4 ml-6 mt-6 w-full gap-5'>

            <Card
                type="link"
                title="How to center a Div"
                link="https://www.w3schools.com/css/css_align.asp"
                chatGPTThumbnail={"/icons/docs.png"}
                contentId="1"
                onDelete={() => {}}
                landing={true}
              />
              <Card
                type="youtube"
                title="FAANG CheatSheet"
                link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                chatGPTThumbnail={"/icons/docs.png"}
                contentId="1"
                onDelete={() => {}}
                landing={true}
              />
              <Card
                type="link"
                title="Two Sum"
                link="https://leetcode.com/problems/two-sum/description/"
                chatGPTThumbnail={"/icons/docs.png"}
                contentId="1"
                onDelete={() => {}}
                landing={true}
              />

          </div>
          <p className="text-white font-michroma mb-2 mt-8 text-sm md:text-base lg:text-lg">
          Because forgetting isn’t an option.
          </p>
        </div>

      <div
        className="mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-60 mb-10 bg-white/10 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl border border-white/20 shadow-xl  hover:scale-105 transition-transform duration-300 text-center pt-8 md:pt-16 transform-gpu backface-hidden will-change-transform relative overflow-hidden"
        data-aos="fade-up"
        data-aos-delay="0"
          >
          <h2 className="text-2xl pb-10 md:text-4xl font-bold text-white font-orbitron text-glow-pulse">
          try it yourself
            </h2>
            <div className='flex flex-col justify-center items-center'>

                <Button
            onClick={(e) => {
              const rect = (e.target as HTMLElement).getBoundingClientRect();
              setModalPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
              console.log("Button position:", {
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                height: rect.height,
              });
              setModalOpen(true);
            }}
            variant="primary"
            text=""
            className="w-10 h-10"
            startIcon={<PlusIcon/>}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-6 w-full gap-5">

              {contentItems.map((item, index) => {
              return (
                <div >
                  <Card
                    key={index}
                    title={item.title}
                    link={item.link}
                    type={item.type}
                    contentId={index.toString()}
                    landing={true}
                    chatGPTThumbnail={'/icons/docs.png'}
                    onDelete={() => {
                      setContentItems(prev => prev.filter((_, i) => i !== index));
                    }}
                    onSummarizeClick={() => {
                      setSummOpen(true);
                    }}
                  />
            </div>
                  );
                })} 
              </div>
            </div>  
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="0">
            <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-60 mb-10 bg-white/10 b p-4 sm:p-6 md:p-8 rounded-xl border border-white/20 shadow-xl  hover:scale-105 transition-transform duration-300 text-center pt-8 md:pt-16 transform-gpu backface-hidden will-change-transform relative overflow-hidden">
              <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-glow-pulse text-white  mb-4">Start Building Your Digital Brain Today</h2>
              <p className="text-md md:text-xl mb-6 text-white font-michroma">It’s free, forever.</p>
              <button
                onClick={() => navigate('/signup')}
                className="bg-white text-purple-900 px-6 py-3 rounded-full font-bold hover:scale-105 transition"
              >
                Create an Account
              </button>
            </div>
          </div>
          <div><Footer/></div>
      </div>
  </div>
</div>


    )
}
