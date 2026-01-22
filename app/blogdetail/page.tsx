// app/blogdetail/page.tsx
import { blogs } from "@/app/data/blogs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogDetailClient from "./BlogClient";

type Props = {
  searchParams: Promise<{
    slug?: string;
  }>;
};

// ✅ PER BLOG METADATA
export async function generateMetadata(
  { searchParams }: Props
): Promise<Metadata> {

  const { slug } = await searchParams;
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) return {};

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    alternates: {
      canonical: blog.canonical,
    },
  };
}

export default async function BlogDetailPage({ searchParams }: Props) {
  const { slug } = await searchParams;
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) notFound();

  return <BlogDetailClient blog={blog} />;
}