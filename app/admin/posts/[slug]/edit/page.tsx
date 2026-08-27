import { notFound } from "next/navigation";

import AdminPostForm from "@/components/admin-post-form";
import { requireAdmin } from "@/lib/admin-auth";
import { getPostBySlug } from "@/lib/posts";

type EditPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EditPostPage({
  params,
}: EditPostPageProps) {
  // Protect this page.
  // If the user is not authenticated,
  // requireAdmin() should redirect them to /admin/login.
  await requireAdmin();

  // Get the post slug from the URL.
  const { slug } = await params;

  // Find the post.
  const post = await getPostBySlug(slug, { includeDrafts: true });

  // If the post doesn't exist, show the Next.js 404 page.
  if (!post) {
    notFound();
  }

  // Render the admin editor.
  return <AdminPostForm post={post} />;
}
