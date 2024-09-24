import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getI18n, setStaticParams } from "../../../../../../locales/server"

import AddressBook from "@modules/account/components/address-book"

import { getCustomer, listRegions } from "@lib/data"

import { headers } from "next/headers"

export const metadata: Metadata = {
  title: "page.adresses.title",
  description: "page.adresses.desc",
}

type Props = {
  params: { countryCode: string; }
}

export default async function Addresses({ params }: Props) {
  setStaticParams(params.countryCode)
  const t = await getI18n()
  metadata.title = t("page.adresses.title")
  metadata.description = t("page.adresses.desc")

  const nextHeaders = headers()
  const countryCode = nextHeaders.get("next-url")?.split("/")[1] || ""
  const customer = await getCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">
          {t("page.adresses.shipping.title")}
        </h1>
        <p className="text-base-regular">
          {t("page.adresses.shipping.desc")}
        </p>
      </div>
      <AddressBook customer={customer} regions={regions} />
    </div>
  )
}
