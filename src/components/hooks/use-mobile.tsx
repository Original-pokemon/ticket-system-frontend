import * as React from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)")

    const handleChange = () => {
      setIsMobile(mobileQuery.matches)
    }

    // Set initial value
    setIsMobile(mobileQuery.matches)

    // Add listener
    mobileQuery.addEventListener("change", handleChange)

    return () => {
      mobileQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return !!isMobile
}
