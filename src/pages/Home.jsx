import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Hero from '../components/Hero'
import HorizontalWork from '../components/HorizontalWork'
import Philosophy from '../components/Philosophy'
import BentoGrid from '../components/BentoGrid'
import FullBleedImage from '../components/FullBleedImage'
import Contact from '../components/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  return (
    <>
      <Hero />
      <HorizontalWork />
      <Philosophy />
      <BentoGrid />
      <FullBleedImage />
      <Contact />
    </>
  )
}
