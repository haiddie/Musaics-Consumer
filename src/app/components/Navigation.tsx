'use client';

import { useRef, useState } from 'react'
import Link from 'next/link'

const Navigation = () => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  let timeoutRef = useRef<number | null>(null)

  return [
    ['Genres', '/genres'],
    ['Artists', '/artists'],
    ['Cities', '/cities'],
    // ['Charts', '/#charts']
  ].map(([label, href], index) => (
    <Link
      key={label}
      href={href}
      className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-white transition-colors ease-in-out duration-150 hover:delay-0 hover:text-primary-100 hover:backdrop-blur-lg"
      onMouseEnter={() => {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current)
        }
        setHoveredIndex(index)
      }}
      onMouseLeave={() => {
        timeoutRef.current = window.setTimeout(() => {
          setHoveredIndex(null)
        }, 200)
      }}
    >
      <span className="font-semibold text-lg xl:text-2xl font-cabin relative z-10">{label}</span>
    </Link>
  ))
}


export default Navigation;