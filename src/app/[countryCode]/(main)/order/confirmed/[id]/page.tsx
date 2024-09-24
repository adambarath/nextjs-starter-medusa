import { Metadata } from "next"

import { getI18n } from "../../../../../../locales/server"

import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { notFound } from "next/navigation"
import { enrichLineItems } from "@lib/data/cart"
import { retrieveOrder } from "@lib/data/orders"
import { HttpTypes } from "@medusajs/types"

type Props = {
  params: { id: string }
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

export const metadata: Metadata = {
  title: "order.confirmed_title",
  description: "oder.confirmed_desc",
}

export default async function OrderConfirmedPage({ params }: Props) {
  const t = await getI18n()
  metadata.title = t("order.confirmed_title")
  metadata.description = t("order.confirmed_desc")
  
  const order = await getOrder(params.id)
  if (!order) {
    return notFound()
  }

  return <OrderCompletedTemplate order={order} />
}
