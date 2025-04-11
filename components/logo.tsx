import Image from "next/image"

interface LogoProps {
  size?: number
  className?: string
  showLicenseInfo?: boolean
  rounded?: boolean
}

export function Logo({ size = 64, className = "", showLicenseInfo = false, rounded = true }: LogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src="/images/logo.png"
        alt="Логотип Современной русской латинки"
        fill
        className={`object-contain ${rounded ? "rounded-full" : ""}`}
        title="Изображение предоставлено Wikimedia Commons в соответствии с лицензией Creative Commons Attribution-Share Alike 4.0 International"
      />
      {showLicenseInfo && (
        <div className="sr-only">
          Изображение предоставлено Wikimedia Commons в соответствии с лицензией Creative Commons Attribution-Share
          Alike 4.0 International. Оригинал:
          https://en.wikipedia.org/wiki/File:Uppercase_and_lowercase_A_with_diaeresis.svg
        </div>
      )}
    </div>
  )
}
