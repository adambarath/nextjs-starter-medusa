"use client"

import { Heading } from "@medusajs/ui"

import { useScopedI18n } from "../../../../locales/client"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { Cart } from "medusa-react"

type CheckoutSummaryProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ cart }) => {
  const t = useScopedI18n("checkout")

  if (!cart) {
    return null
  }

  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0 ">
      <div className="w-full bg-white flex flex-col">
        <Divider className="my-6 small:hidden" />
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular items-baseline"
        >
          {t("inyourcart")}
        </Heading>
        <Divider className="my-6" />
        <CartTotals data={cart} />
        <ItemsPreviewTemplate region={cart?.region} items={cart?.items} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
