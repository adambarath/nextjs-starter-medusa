import { Metadata } from "next"

import { getI18n, setStaticParams } from "../../../locales/server"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "store.title",
  description: "store.desc",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  setStaticParams(countryCode)
  const t = await getI18n()
  metadata.title = t("store.title")
  metadata.description = t("store.desc")

  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
