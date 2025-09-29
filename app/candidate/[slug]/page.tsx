'use client'

import { notFound } from "next/navigation";
import { candidates } from "../../../utils/candidates";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const getRoleColor = (role: string) => {
  const normalized = role.toLowerCase().replace(/\s+/g, ""); // e.g., "Vice President" → "vicepresident"
  switch (normalized) {
    case "grade12rep":
      return "#2F3E46";
    case "grade11rep":
      return "#E07A5F";
    case "grade10rep":
      return "#457B9D";
    case "grade9rep":
      return "#A3B18A";
    default:
      return "#0073FF";
  }
};

export default function CandidatePage(
  props: { params: { slug: string }; searchParams?: Record<string, string | string[]> }
) {
  const { slug } = props.params;
  const [finalImageSrc, setFinalImageSrc] = useState<string>('');
  const [posterExists, setPosterExists] = useState<boolean>(false);
  const [videoExists, setVideoExists] = useState<boolean>(false);

  const candidate = candidates.find(
    c => c.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  const roleColor = candidate ? getRoleColor(candidate.role) : "#0073FF";

  // Check image and poster existence
  useEffect(() => {
    if (!candidate) return;

    const checkAssets = async () => {
      // Check image
      if (!candidate.image) {
        setFinalImageSrc('/placeholder.jpg');
      } else {
        try {
          const response = await fetch(candidate.image, { method: 'HEAD' });
          if (response.ok) {
            setFinalImageSrc(candidate.image);
          } else {
            setFinalImageSrc('/placeholder.jpg');
          }
        } catch {
          setFinalImageSrc('/placeholder.jpg');
        }
      }

      // Check poster
      if (candidate.poster) {
        try {
          const response = await fetch(candidate.poster, { method: 'HEAD' });
          setPosterExists(response.ok);
        } catch {
          setPosterExists(false);
        }
      }

      // Check video
      if (candidate.video) {
        try {
          const response = await fetch(candidate.video, { method: 'HEAD' });
          setVideoExists(response.ok);
        } catch {
          setVideoExists(false);
        }
      } else {
        setVideoExists(false);
      }
    };

    checkAssets();
  }, [candidate]);

  if (!candidate) return notFound();

  return (
    <>
      <hr className="border-0 h-[20px]"></hr>
      <div className="border-0 flex justify-center items-center w-full mt-8">
        <Link href='/'>
          <p className="text-xl">&larr; Return Home</p>
        </Link>
      </div>


      <section className="flex flex-col items-center pt-20 mt-20">
        <hr className="h-[100px]"/>
        <main className="h-full flex flex-col md:flex-row justify-start items-center gap-x-10 w-3/4">


          <div
            className="bg-white shadow-lg flex flex-col items-center p-6 rounded-lg">
            <div className="relative rounded-lg" style={{ width: 312, height: 312 }}>
              <Image
                src={finalImageSrc || '/placeholder.jpg'}
                alt={candidate.name}
                width={312}
                height={312}
                className="object-cover rounded-lg"
                style={{ width: 312, height: 312 }}
              />
            </div>
          </div>
          <hr className="h-[5px] md:h-0 border-0"></hr>
          <div className="mt-2 flex flex-col md:justify-start md:items-start justify-center items-center h-full w-full text-center md:text-left gap-y-10">
            <h1 className="text-6xl font-thin"> {candidate.name}</h1>
            <div 
              className="w-[300px] h-[80px] md:w-[549px] md:h-[84px] flex justify-start items-center text-white pl-4"
              style={{ backgroundColor: roleColor }}
            >
              <h2 className="m-4 uppercase text-3xl font-light ml-4">&#8205; {candidate.role} CANDIDATE</h2>
            </div>
            {candidate.poster && posterExists ? (
              <Link href={candidate.poster} target="_blank">
                <button className="text-2xl font-light hover:cursor-pointer">
                  View Candidate Poster &rarr;
                </button>
              </Link>
            ) : (
              <button
                className="text-2xl font-light bg-gray-200 text-gray-500 cursor-not-allowed"
                disabled
                title="Poster not available"
              >
                This Candidate has no Poster
              </button>
            )}
          </div>
        </main>
        <hr className="h-[21px]"></hr>
        {candidate.video && videoExists ? (
          <div className="mt-[21px] mb-4 w-3/4 aspect-video">
            <iframe
              src={candidate.video.replace(/&amp;/g, '&')}
              title={candidate.name + " campaign video"}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              allowFullScreen
              className="border-0 w-full h-full rounded-lg"
            />
          </div>
        ) : (
          <div className="hover:cursor-not-allowed mt-[21px] mb-4 w-3/4 aspect-video flex items-center justify-center bg-gray-100 rounded-lg">
            <span className="text-gray-500 text-xl">This Candidate has no Video.</span>
          </div>
        )}

      </section>
      <hr className="h-[20px] border-0"></hr>
      <div className="border-0 flex justify-center items-center w-full">
        <Link href='/'>
          <button className="border-0 text-2xl font-light bg-[#0073FF] text-white rounded-3xl w-[182px] h-[65px] cursor-pointer hover:bg-white hover:border hover:border-[#0073FF] hover:text-[#0073FF] transition duration-700 ease-in-out">Return Home</button>
        </Link>
      </div>
      <hr className="h-[20px] border-0"></hr>
      
      {candidate.video && videoExists && (
        <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 1000,
          background: "rgba(0,0,0,0.75)",
          color: "white",
          padding: "6px 14px",
          borderRadius: "12px",
          fontSize: "0.85rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          pointerEvents: "none",
        }}
        >
          ↓ Scroll down to view the video
        </div>
      )}

    </>
  );
}