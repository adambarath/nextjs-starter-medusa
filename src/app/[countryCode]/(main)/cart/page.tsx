import { Metadata } from "next"
import CartTemplate from "@modules/cart/templates"

import { getI18n, setStaticParams } from "../../../../locales/server"

import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { getCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "cart.title",
  description: "cart.desc",
}

type Props = {
  params: { countryCode: string; }
}

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (!cart) {
    return null
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id!)
    cart.items = enrichedItems as HttpTypes.StoreCartLineItem[]
  }

  return cart
}

export default async function Cart({ params }: Props) {
  setStaticParams(params.countryCode)
  const t = await getI18n()
  metadata.title = t("cart.title")
  metadata.description = t("cart.desc")

  const cart = await fetchCart()
  const customer = await getCustomer()

  return <CartTemplate cart={cart} customer={customer} />
}
