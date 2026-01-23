import { MetadataRoute } from "next";
import { blogs } from "@/app/data/blogs";

const BASE_URL = "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },

    ...blogs.map((blog) => ({
      url: `${BASE_URL}/blogdetail/${blog.slug}`,
      lastModified: new Date(),
    })),
  ];
}
