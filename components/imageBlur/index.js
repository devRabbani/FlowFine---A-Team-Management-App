import Image from 'next/image'
import placeholder from '../../public/placeholder.png'

export default function ImageBlur({ ...props }) {
  return (
    <Image
      {...props}
      blurDataURL={placeholder}
      placeholder="blur"
      alt="User Avatar"
      layout="responsive"
      width="100%"
      height="100%"
    />
  )
}
