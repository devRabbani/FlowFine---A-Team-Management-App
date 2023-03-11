import s from "./nav.module.css"
import { MdMenu, MdClose } from "react-icons/md"
import { useState } from "react"
import Link from "next/link"

export default function Nav() {
  const [nav, setNav] = useState(false)
  const handleButton = () => {
    setNav((prevNav) => !prevNav)
  }
  return (
    <div className="wrapper">
      <div className={s.nav}>
        <h2 className={s.logo}>FlowFine</h2>
        <div className={s.navElement}>
          <Link href="#">Home</Link>
          <Link href="#">Projects</Link>
          <Link href="#">ContactUs</Link>
        </div>
        <div onClick={handleButton} className={s.menuButton}>
          {nav === true ? <MdClose /> : <MdMenu />}
        </div>
      </div>
      {nav && (
        <div className={s.sideNav}>
          <Link href="#">Home</Link>
          <Link href="#">Projects</Link>
          <Link href="#">ContactUs</Link>
        </div>
      )}
    </div>
  )
}
