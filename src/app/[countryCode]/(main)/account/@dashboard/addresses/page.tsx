import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getI18n, setStaticParams } from "../../../../../../locales/server"

import AddressBook from "@modules/account/components/address-book"

import { headers } from "next/headers"
import { getRegion } from "@lib/data/regions"
import { getCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "page.adresses.title",
  description: "page.adresses.desc",
}

export default async function Addresses({
  params,
}: {
  params: { countryCode: string }
}) {
  setStaticParams(params.countryCode)
  const t = await getI18n()
  metadata.title = t("page.adresses.title")
  metadata.description = t("page.adresses.desc")
  const { countryCode } = params
  const customer = await getCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
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
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
