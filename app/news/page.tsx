// components/NewsSection.tsx
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function NewsSection() {
  const NEWS = await prisma.news.findMany();

  return (
    <section className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <h2 className="text-3xl md:text-4xl text-black font-extrabold mb-6">
        Latest News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {NEWS.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <div className="relative h-48 w-full">
              <Image
                src={item.imageUrl.includes("/") ? item.imageUrl : `/Logo.png`}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4 bg-white dark:bg-gray-800">
              <p className="text-sm text-gray-500">{item.date}</p>
              <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              {item.content && (
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {item.content.slice(0, 200)}...
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/news"
          className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
        >
          View All News
        </Link>
      </div>
    </section>
  );
}
