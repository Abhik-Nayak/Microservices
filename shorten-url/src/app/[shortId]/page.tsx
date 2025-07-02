// src/app/[shortId]/page.tsx
import { redirect } from 'next/navigation'
import { connectToDB } from '@/lib/mongodb'
import Url from '@/models/Url'

type Params = {
  params: { shortId: string }
}

export default async function RedirectPage({ params }: Params) {
  const { shortId } = params

  await connectToDB()

  const found = await Url.findOne({ shortId })

  if (found) {
    redirect(found.originalUrl)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold text-red-600">
        Short URL not found 😞
      </h1>
    </div>
  )
}
