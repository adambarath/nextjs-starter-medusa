import { Metadata } from "next"

import { getI18n, setStaticParams } from "../../../../../locales/server"

import Overview from "@modules/account/components/overview"
import { notFound } from "next/navigation"
import { getCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"

export const metadata: Metadata = {
  title: "page.account.title",
  description: "page.account.desc",
}

type Props = {
  params: { countryCode: string; }
}

export default async function OverviewTemplate({ params }: Props) {
  setStaticParams(params.countryCode)
  const t = await getI18n()
  metadata.title = t("page.account.title")
  metadata.description = t("page.account.desc")

  const customer = await getCustomer().catch(() => null)
  const orders = (await listOrders().catch(() => null)) || null

  if (!customer) {
    notFound()
  }

  return <Overview customer={customer} orders={orders} />
}
