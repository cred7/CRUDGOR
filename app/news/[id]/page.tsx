// app/news/[id]/page.tsx
import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.news.findUnique({
    where: { id: Number(id) },
  });

  if (!article) return notFound();

  return (
    <div className="max-w-7xl  flex flex-col items-center justify-center mx-auto px-4 md:px-8 py- text-black">
      <div className="relative w-3/5 h-[70vh] mb-6">
        <Image
          src={article.imageUrl.includes("/") ? article.imageUrl : `/Logo.png`}
          alt={article.title}
          fill
          className="object-contain rounded-lg"
        />
      </div>
      <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-black mb-6">
        {new Date(article.date).toLocaleDateString()}
      </p>
      <div className="prose prose-lg max-w-none">
        {article.content.split("\n").map((p, i) => (
          <>
            <p key={i}>{p}</p>
          </>
        ))}
        <div className=" ml-10 relative h-150 w-150">
          <Image
            src={`/Patron1.jpg`}
            alt={article.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>
    </div>
  );
}
