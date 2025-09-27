import { notFound } from "next/navigation";
import { candidates } from "../../../utils/candidates";
import Image from "next/image";
import Link from "next/link";

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

const checkPosterExists = async (posterUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(posterUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

const checkImageExists = async (imageUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

export default async function CandidatePage(
  props: { params: { slug: string }; searchParams?: Record<string, string | string[]> }
) {
  const { slug } = props.params;

  const candidate = candidates.find(
    c => c.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!candidate) return notFound();

  const roleColor = getRoleColor(candidate.role);
  const posterExists = candidate.poster ? await checkPosterExists(candidate.poster) : false;
  
  // Check if candidate image exists, use placeholder if not
  const imageExists = candidate.image ? await checkImageExists(candidate.image) : false;
  const finalImageSrc = imageExists ? candidate.image : '/placeholder.jpg';

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
                src={finalImageSrc}
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
        {candidate.video ? (
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
      
      {candidate.video && (
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