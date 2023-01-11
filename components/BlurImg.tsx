import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import { useState } from 'react'

const BlurImg = (props: {
  src: string | StaticImageData
  alt?: string
  className?: string
}) => {
  const [loading, setLoading] = useState(true)
  return (
    <Image
      src={props.src}
      alt={props.alt}
      layout="fill"
      objectFit="cover"
      className={
        `duration-700 w-full h-full ease-in-out ${
          loading
            ? 'scale-110 blur-xl bg-[#EDEDF1]'
            : 'scale-100 blur-0 grayscale-0'
        } ${props.className ?? ''}`
      }
      onLoadingComplete={() => setLoading(false)}
    />
  )
}

export default BlurImg