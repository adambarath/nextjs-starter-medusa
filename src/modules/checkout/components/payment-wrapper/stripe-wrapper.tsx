"use client"

import { Stripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import { useScopedI18n } from "../../../../locales/client"

import { HttpTypes } from "@medusajs/types"

type StripeWrapperProps = {
  paymentSession: HttpTypes.StorePaymentSession
  stripeKey?: string
  stripePromise: Promise<Stripe | null> | null
  children: React.ReactNode
}

const StripeWrapper: React.FC<StripeWrapperProps> = ({
  paymentSession,
  stripeKey,
  stripePromise,
  children,
}) => {
  const t = useScopedI18n("checkout.payment.stripe")

  const clientSecret = paymentSession?.data?.client_secret as string | undefined
  const options: StripeElementsOptions = {
    // https://docs.stripe.com/stripe-js/react
    // passing the client secret obtained from the server    
    clientSecret: clientSecret,
  }

  if (!stripeKey) {
    throw new Error(t("error1"))
  }

  if (!stripePromise) {
    throw new Error(t("error2"))
  }

  if (!options.clientSecret) {
    throw new Error(t("error3"))
  }

  return (
    <Elements options={options} stripe={stripePromise} key={clientSecret}>
      {children}
    </Elements>
  )
}

export default StripeWrapper
