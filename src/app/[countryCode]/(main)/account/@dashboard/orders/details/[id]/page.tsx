import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getI18n, setStaticParams } from "../../../../../../../../locales/server"

import OrderDetailsTemplate from "@modules/order/templates/order-details-template"
import { retrieveOrder } from "@lib/data/orders"
import { enrichLineItems } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type Props = {
  params: { countryCode: string; id: string }
}

async function getOrder(id: string) {
  const order = await retrieveOrder(id)

  if (!order) {
    return
  }

  const enrichedItems = await enrichLineItems(order.items, order.region_id!)

  return {
    ...order,
    items: enrichedItems,
  } as unknown as HttpTypes.StoreOrder
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  setStaticParams(params.countryCode)
  const t = await getI18n()
  const order = await getOrder(params.id).catch(() => null)

  if (!order) {
    notFound()
  }

  return {
    title: t("page.order.title") + ` #${order.display_id}`,
    description: t("page.order.desc"),
  }
}

export default async function OrderDetailPage({ params }: Props) {
  const order = await getOrder(params.id).catch(() => null)

  if (!order) {
    notFound()
  }

  return <OrderDetailsTemplate order={order} />
}
