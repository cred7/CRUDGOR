import prisma from "@/lib/prisma";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

type playerDataType = {
  id: number;
  number: number;
  name: string;
  position: string;
  nickname: string;
  bio: string;
  dateOfBirth: string;
  nationality: string;
  height: string;
  weight: string;
  social?: string;
  imageUrl: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ defenders: string }>;
}) {
  const { defenders } = await params;
  const playerData = await prisma.player.findMany();

  const playerName = decodeURIComponent(defenders);
  const data = playerData.find(
    (n) => n.name.toLowerCase() === playerName.toLowerCase()
  ) as unknown as playerDataType;

  if (!data) {
    return <div className="text-center py-20">Player not found</div>;
  }

  return (
    <>
      <section className="max-w-5lxl mx-auto px-6 md:px-16 pb-10 text-gray-800">
        <div className="flex flex-col gap-8 items-center">
          <div className="flex w-full h-[70vh] justify-center relative">
            <Image
              src={data.imageUrl.includes("/") ? data.imageUrl : `/Logo.png`}
              alt={data.name}
              fill
              className="object-contain rounded"
            />
          </div>
          {/* Left Panel — Text Info */}

          <div className="max-w-6xl w-full border sahdow-xl  rounded">
            <div className="h-15 p-1 items-center flex bg-green-700 w-full">
              <h1 className="text-black text-2xl font-sans">Biography</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start p-4">
              <div className="w-full text-xl">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-6xl font-extrabold">
                    #{data.number}
                  </span>
                  <div>
                    <h1 className="text-4xl font-bold">{data.name}</h1>
                    <p className="text-xl font-semibold text-red-600">
                      {data.position}{" "}
                      <span className="text-gray-900 font-light">
                        | {data.nickname}
                      </span>
                    </p>
                  </div>
                </div>
                <p>{data.bio}</p>
              </div>
              <div className="w-full">
                <p className="text-xl font-semibold text-red-600">
                  {data.position}{" "}
                  <span className="text-gray-900 font-light">
                    | {data.nickname}
                  </span>
                </p>
                <div className="mt-6 space-y-2 text-xl">
                  <div>
                    <span className="font-bold">Date of Birth: </span>
                    <span>{data.dateOfBirth}</span>
                  </div>
                  <div>
                    <span className="font-bold">Nationality: </span>
                    <span>{data.nationality}</span>
                  </div>
                  <div>
                    <span className="font-bold">Height: </span>
                    <span>{data.height}</span>
                  </div>
                  <div>
                    <span className="font-bold">Weight: </span>
                    <span>{data.weight}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-6xl font-extrabold">#{data.number}</span>
              <div>
                <h1 className="text-4xl font-bold">{data.name}</h1>
                <p className="text-xl font-semibold text-red-600">
                  {data.position}{" "}
                  <span className="text-gray-900 font-light">
                    | {data.nickname}
                  </span>
                </p>
              </div>
            </div>

            <p className="mb-4 leading-relaxed">{data.bio}</p>

            <div className="mt-6 space-y-2 text-sm">
              <div>
                <span className="font-bold">Date of Birth: </span>
                <span>{data.dateOfBirth}</span>
              </div>
              <div>
                <span className="font-bold">Nationality: </span>
                <span>{data.nationality}</span>
              </div>
              <div>
                <span className="font-bold">Height: </span>
                <span>{data.height}</span>
              </div>
              <div>
                <span className="font-bold">Weight: </span>
                <span>{data.weight}</span>
              </div>
            </div>
          </div> */}

          {/* Right Panel — Image */}
        </div>

        {/* Social Links */}
        <div className="mt-10 text-center">
          <h3 className="font-bold uppercase mb-2">
            Connect with {data.name}:
          </h3>
          <div className="flex justify-center space-x-4 text-2xl">
            {data.social && (
              <a
                href={data.social}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-red-600"
              >
                <FaInstagram />
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
