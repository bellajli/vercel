import Link from "next/link"

export default function Blog() {
  const posts = [
    { id: 1, title: "Getting Started with Next.js", slug: "getting-started" },
    { id: 2, title: "Understanding Server Components", slug: "server-components" },
    { id: 3, title: "Data Fetching in Next.js", slug: "data-fetching" },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <div className="w-full max-w-2xl space-y-4 mb-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block p-6 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold">{post.title}</h2>
          </Link>
        ))}
      </div>
      <Link href="/" className="text-blue-500 hover:underline">
        ← Back to Home
      </Link>
    </main>
  )
}
