import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

import { I18nProviderClient } from "../../locales/client"
import { getCurrentLocale, setStaticParams } from "../../locales/server"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  setStaticParams(getCurrentLocale());

  return (
    <html lang={getCurrentLocale()} data-mode="light">
      <body>
        <I18nProviderClient locale={getCurrentLocale()}>
          <main className="relative">{props.children}</main>
        </I18nProviderClient>
      </body>
    </html>
  )
}
