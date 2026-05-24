'use client'

import Image from "next/image";
import { candidates } from "../utils/candidates";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [processedCandidates, setProcessedCandidates] = useState(candidates);

  // Check if image exists and set fallback
  useEffect(() => {
    const checkImages = async () => {
      const updatedCandidates = await Promise.all(
        candidates.map(async (candidate) => {
          if (!candidate.image) {
            return { ...candidate, image: '/placeholder.jpg' };
          }
          
          try {
            const response = await fetch(candidate.image, { method: 'HEAD' });
            if (response.ok) {
              return candidate;
            } else {
              return { ...candidate, image: '/placeholder.jpg' };
            }
          } catch {
            return { ...candidate, image: '/placeholder.jpg' };
          }
        })
      );
      setProcessedCandidates(updatedCandidates);
    };

    checkImages();
  }, []);

  const presidentCandidates = processedCandidates.filter(c => c.role === "president");
  const vicePresidentCandidates = processedCandidates.filter(c => c.role === "vice president");
  const treasurerCandidates = processedCandidates.filter(c => c.role === "treasurer");
  const socialConvenorCandidates = processedCandidates.filter(c => c.role === "social convenor");
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll event to create parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* ELECTIONS HOME PAGE */}
      <section className="flex flex-col items-center justify-center h-screen relative overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-home bg-cover bg-center"
          style={{ 
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: "transform 0.1s ease-out",
          }}
        ></div>
        
        <div
          className="absolute z-1 inset-0"
          style={{
            background: "rgba(0, 0, 0, 0.69)",
            backdropFilter: "blur(6.85px)",
          }}
        ></div>
        <main className="justify-center text-center items-center min-h-screen flex flex-col gap-y-8 z-50">


          <div className="flex flex-col justify-center items-center gap-y-2">
            <h1 className="font-bold text-5xl md:text-9xl text-[#0073FF]" data-aos="fade-up">Fraser Elections</h1>
            <p className="text-white text-xl md:text-4xl w-2/3 text-wrap mx-auto font-light" data-aos="fade-up" data-aos-delay="300">View the candidates for the 2025 JohnFraser SAC elections, made by <a className="underline text-[#0073FF]" href="https://johnfrasersac.com">JFSS SAC</a></p>
          </div>

          <div className="w-full justify-center items-center flex">
            <div className="mx-auto flex justify-center items-center gap-y-5 gap-x-30 w-full flex-col md:flex-row " data-aos="fade-up" data-aos-delay="600">
              <button 
                className="mx-auto text-lg md:text-2xl font-light bg-[#0073FF] text-white rounded-3xl w-[140px] h-[50px] md:w-[182px] md:h-[65px] cursor-pointer hover:bg-white hover:border hover:border-[#0073FF] hover:text-[#0073FF] transition duration-700 ease-in-out"
                onClick={() => {
                  document.getElementById('candidates')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </button>
              <Link target='_blank' href="https://docs.google.com/document/d/e/2PACX-1vSF8lG2KG9Rn1BGdskHVv2iM4C4VfmIDzPBj0f91WA9s9M_NWgXeaq6-SEbtCX-4GIsyDomifOTUgsr/pub">
                <button className="mx-auto text-lg md:text-2xl font-light bg-white text-[#0073FF] border border-[#0073FF] rounded-3xl w-[140px] h-[50px] md:w-[182px] md:h-[65px] cursor-pointer hover:bg-[#0073FF] hover:text-white transition duration-700 ease-in-out">Where to Vote</button>
              </Link>
            </div>
          </div>
          



        </main>
      </section>

      {/* CANADIDATES */}
      <hr className="h-[40px] md:h-[50px] border-0"></hr>
      <section className="" id="candidates">

        {/* President */}

        <main className="min-h-screen flex flex-col justify-center items-center text-center gap-y-10 mt-20">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-6xl font-bold">PRESIDENT</h1>
            <h2 className="w-[350px] md:w-[407px] text-xl font-light mb-20">TIP: Click on their profile to learn more about their <a className="font-bold">promises!</a></h2>
          </div>
          <div
            className={
              `grid gap-8 max-w-5xl px-4 mx-auto justify-center ` +
              (
                presidentCandidates.length === 1
                  ? "grid-cols-1"
                  : presidentCandidates.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
              )
            }
            style={{ gap: "126px"}}
          >
            {presidentCandidates.map((candidate) => (
              <Link
                key={candidate.name}
                href={`/candidate/${candidate.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  className="hover:cursor-pointer bg-white shadow-lg flex flex-col items-center p-6 transition duration-300 hover:scale-105"
                  style={{ width: 312 }}
                >
                  <div className="relative" style={{ width: 312, height: 312 }}>
                    <Image
                      src={candidate.image}
                      alt={candidate.name}
                      width={312}
                      height={312}
                      className="object-cover"
                      style={{ width: 312, height: 312 }}
                    />
                    <div
                      className="absolute left-0 bottom-0 w-full flex items-end"
                      style={{
                        height: "80px",
                        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.63) 50%, rgba(0, 0, 0, 0.00) 100%)",
                      }}
                    >
                      <span className="text-white text-xl px-4 pb-3 w-full text-center font-light">
                        {candidate.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>

        {/* Vice President */}
        <hr className="h-[40px] md:h-[50px] border-0"></hr>
        <main className="min-h-screen flex flex-col justify-center items-center text-center gap-y-10">
          <div className="flex flex-col gap-y-2 justify-center items-center">
            <h1 className="text-6xl font-bold text-center">VICE PRESIDENT</h1>
            <h2 className="w-[350px] md:w-[407px] text-xl font-light mb-20">TIP: Click on their profile to learn more about their <a className="font-bold">promises!</a></h2>
          </div>
          <div
            className={
              `grid gap-8 max-w-5xl px-4 mx-auto justify-center ` +
              (
                vicePresidentCandidates.length === 1
                  ? "grid-cols-1"
                  : vicePresidentCandidates.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
              )
            }
            style={{ gap: "126px"}}
          >
            {vicePresidentCandidates.map((candidate) => (
              <Link
                key={candidate.name}
                href={`/candidate/${candidate.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  className="hover:cursor-pointer bg-white shadow-lg flex flex-col items-center p-6 transition duration-300 hover:scale-105"
                  style={{ width: 312 }}
                >
                  <div className="relative" style={{ width: 312, height: 312 }}>
                    <Image
                      src={candidate.image}
                      alt={candidate.name}
                      width={312}
                      height={312}
                      className="object-cover"
                      style={{ width: 312, height: 312 }}
                    />
                    <div
                      className="absolute left-0 bottom-0 w-full flex items-end"
                      style={{
                        height: "80px",
                        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.63) 50%, rgba(0, 0, 0, 0.00) 100%)",
                      }}
                    >
                      <span className="text-white text-xl px-4 pb-3 w-full text-center font-light">
                        {candidate.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>

        {/* Treasurer */}

        <hr className="h-[40px] md:h-[50px] border-0"></hr>
        <main className="min-h-screen flex flex-col justify-center items-center text-center gap-y-10">
          <div className="flex flex-col justify-center items-center gap-y-2">
            <h1 className="text-6xl font-bold text-center">TREASURER</h1>
            <h2 className="w-[350px] md:w-[407px] text-xl font-light mb-20 mx-auto text-center">TIP: Click on their profile to learn more about their <a className="font-bold">promises!</a></h2>
          </div>
          <div
            className={
              `grid gap-8 max-w-5xl px-4 mx-auto justify-center ` +
              (
                treasurerCandidates.length === 1
                  ? "grid-cols-1"
                  : treasurerCandidates.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
              )
            }
            style={{ gap: "126px"}}
          >
            {treasurerCandidates.map((candidate) => (
              <Link
                key={candidate.name}
                href={`/candidate/${candidate.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  className="hover:cursor-pointer bg-white shadow-lg flex flex-col items-center p-6 transition duration-300 hover:scale-105"
                  style={{ width: 312 }}
                >
                  <div className="relative" style={{ width: 312, height: 312 }}>
                    <Image
                      src={candidate.image}
                      alt={candidate.name}
                      width={312}
                      height={312}
                      className="object-cover"
                      style={{ width: 312, height: 312 }}
                    />
                    <div
                      className="absolute left-0 bottom-0 w-full flex items-end"
                      style={{
                        height: "80px",
                        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.63) 50%, rgba(0, 0, 0, 0.00) 100%)",
                      }}
                    >
                      <span className="text-white text-xl px-4 pb-3 w-full text-center font-light">
                        {candidate.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>

        {/* Social Convenor */}

        <hr className="h-[40px] md:h-[50px] border-0"></hr>
        <main className="min-h-screen flex flex-col justify-center items-center text-center gap-y-10">
          <div className="flex flex-col gap-y-2 justify-center items-center">
            <h1 className="text-6xl font-bold text-center">SOCIAL CONVENOR</h1>
            <h2 className="w-[350px] md:w-[407px] text-xl font-light mb-20">TIP: Click on their profile to learn more about their <a className="font-bold">promises!</a></h2>
          </div>
          <div
            className={
              `grid gap-8 max-w-5xl px-4 mx-auto justify-center ` +
              (
                socialConvenorCandidates.length === 1
                  ? "grid-cols-1"
                  : socialConvenorCandidates.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
              )
            }
            style={{ gap: "126px"}}
          >
            {socialConvenorCandidates.map((candidate) => (
              <Link
                key={candidate.name}
                href={`/candidate/${candidate.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  className="hover:cursor-pointer bg-white shadow-lg flex flex-col items-center p-6 transition duration-300 hover:scale-105"
                  style={{ width: 312 }}
                >
                  <div className="relative" style={{ width: 312, height: 312 }}>
                    <Image
                      src={candidate.image}
                      alt={candidate.name}
                      width={312}
                      height={312}
                      className="object-cover"
                      style={{ width: 312, height: 312 }}
                    />
                    <div
                      className="absolute left-0 bottom-0 w-full flex items-end"
                      style={{
                        height: "80px",
                        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.63) 50%, rgba(0, 0, 0, 0.00) 100%)",
                      }}
                    >
                      <span className="text-white text-xl px-4 pb-3 w-full text-center font-light">
                        {candidate.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </section>
      <hr className="h-[40px] md:h-[50px] border-0"></hr>
    </>
  );
}
