"use client"

import { XMark } from "@medusajs/icons"
import React from "react"

import { useScopedI18n } from "../../../locales/client"

import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

function OrderDetailsTemplate({ order }: OrderDetailsTemplateProps) {
  const t = useScopedI18n("order")

  return (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-2xl-semi">{t("details")}</h1>
        <LocalizedClientLink
          href="/account/orders"
          className="flex gap-2 items-center text-ui-fg-subtle hover:text-ui-fg-base"
          data-testid="back-to-overview-button"
        >
          <XMark /> {t("back")}
        </LocalizedClientLink>
      </div>
      <div
        className="flex flex-col gap-4 h-full bg-white w-full"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Items items={order.items} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        <Help />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
