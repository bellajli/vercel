import Link from "next/link"

export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <article className="prose lg:prose-xl">
        <h1 className="text-4xl font-bold mb-6">Blog Post: {params.slug}</h1>
        <p className="text-xl">This is a dynamic route showing the blog post with slug: {params.slug}</p>
      </article>
      <div className="mt-8 space-x-4">
        <Link href="/blog" className="text-blue-500 hover:underline">
          ← Back to Blog
        </Link>
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}
