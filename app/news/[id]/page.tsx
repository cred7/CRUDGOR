// app/news/[id]/page.tsx
import { NEWS } from "@/data/data";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return NEWS.map((n) => ({
    id: n.id,
  }));
}

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = NEWS.find((n) => n.id === id);

  if (!article) return notFound();

  return (
    <div className="max-w-7xl flex flex-col items-center justify-center mx-auto px-4 md:px-8 py- text-black">
      <div className="relative w-full h-[70vh] mb-6">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-black mb-6">
        {new Date(article.date).toLocaleDateString()}
      </p>
      <div className="prose prose-lg max-w-none">
        {article.content.split("\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
