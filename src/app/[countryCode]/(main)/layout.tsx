import { Metadata } from "next"

import { getCurrentLocale, setStaticParams } from "../../../locales/server"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  setStaticParams(getCurrentLocale());

  return (
    <>
      <Nav />
      {props.children}
      <Footer />
    </>
  )
}
