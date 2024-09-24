"use client"

import { forwardRef, useImperativeHandle, useMemo, useRef } from "react"

import { useI18n } from "../../../../locales/client"

import NativeSelect, {
  NativeSelectProps,
} from "@modules/common/components/native-select"
import { Region } from "@medusajs/medusa"

const CountrySelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    regions?: Region[]
  }
>(({ placeholder = null, regions, defaultValue, ...props }, ref) => {
  const t = useI18n()
  placeholder = t("account.address.country_code")

  const innerRef = useRef<HTMLSelectElement>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current
  )

  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
          }))
        })
        .flat() || []
    )
  }, [regions])

  return (
    <NativeSelect
      ref={innerRef}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...props}
    >
      {regionOptions.map(({ value, label }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </NativeSelect>
  )
})

CountrySelect.displayName = "CountrySelect"

export default CountrySelect
