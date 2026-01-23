// app/blogdetail/[slug]/page.tsx
import { blogs } from "@/app/data/blogs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogDetailClient from "./BlogClient";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
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

export default function BlogDetailPage({ params }: Props) {
  const { slug } = params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) notFound();

  return <BlogDetailClient blog={blog} />;
}
