// app/blogdetail/[slug]/page.tsx
import { blogs } from "@/app/data/blogs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogDetailClient from "./BlogClient";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // ✅ MUST await

  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return {};

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    alternates: {
      canonical: blog.canonical,
    },
  };
}


export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params; // ✅ await here too

  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) notFound();

  return <BlogDetailClient blog={blog} />;
}
