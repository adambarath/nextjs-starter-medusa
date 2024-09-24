import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"
import { useI18n, useScopedI18n, I18nProviderClient } from '../../../../locales/client'

// TODO: review import { onlyUnique } from "@lib/util/only-unique"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}: OptionSelectProps) => {
  const filteredOptions = option.values?.map((v) => v.value)// TODO: review + .filter(onlyUnique)
  const t = useScopedI18n("product")

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">{t("select")} {title}</span>
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions?.map((v) => {
          return (
            <button
              onClick={() => updateOption(option.title ?? "", v ?? "")}
              key={v}
              className={clx(
                "border-ui-border-base bg-ui-bg-subtle border text-small-regular h-10 rounded-rounded p-2 flex-1 ",
                {
                  "border-ui-border-interactive": v === current,
                  "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
                    v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
