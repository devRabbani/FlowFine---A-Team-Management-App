import { useState } from "react"
import s from "./heroNav.module.css"
import Image from "next/image"
import Link from "next/link"
import Logo from "../../../../assets/logo192.png"
import { MdMenu, MdClose } from "react-icons/md"

export default function HeroNav() {
  //Nav
  const [nav, setNav] = useState(false)
  const handleButton = () => {
    setNav((prevNav) => !prevNav)
  }

  return (
    <div className="wrapper">
      <div className={s.nav}>
        <Image className={s.logo} src={Logo}></Image>
        <h2 className={s.logoText}>FlowFine</h2>

        <div className={s.navElement}>
          <Link href="#features">Features</Link>
          <Link href="#video">Video</Link>
          <Link href="#pricing">Pricing</Link>
        </div>
        <div onClick={handleButton} className={s.menuButton}>
          {nav === true ? <MdClose /> : <MdMenu />}
        </div>
      </div>
      {nav && (
        <div className={s.sideNav}>
          <Link href="#features">Features</Link>
          <Link href="#video">Video</Link>
          <Link href="#pricing">Pricing</Link>
        </div>
      )}
    </div>
  )
}
