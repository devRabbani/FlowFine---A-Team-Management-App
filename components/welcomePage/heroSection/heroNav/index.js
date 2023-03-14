import { useState } from "react"
import s from "./heroNav.module.css"
import Image from "next/image"
import Link from "next/link"
import Logo from "../../../../assets/logo192.png"
import { MdMenu, MdClose } from "react-icons/md"
import { FaGoogle } from "react-icons/fa"

export default function HeroNav({
  user,
  username,
  loading,
  isLoading,
  signin,
}) {
  const [nav, setNav] = useState(false)
  const handleButton = () => {
    setNav((prevNav) => !prevNav)
  }

  return (
    <div className="wrapper">
      <div className={s.nav}>
        <div className={s.navLeft}>
          <Image className={s.logo} src={Logo}></Image>
          <h2 className={s.logoText}>FlowFine</h2>
        </div>

        <div className={s.navElement}>
          <Link href="#features">Features</Link>
          <Link href="#video">Video</Link>
          <Link href="#pricing">Pricing</Link>
        </div>
        <div className={s.navBtn}>
          {user && username ? (
            <Link className={s.heroBtn} href="/">
              Go to Dashboard
            </Link>
          ) : (
            <div className={s.heroBtn}>
              <button
                className={s.heroPrimaryBtn}
                disabled={isLoading || loading}
                onClick={signin}
              >
                {isLoading ? "Signing In" : "Log In"}
                <FaGoogle />
              </button>
            </div>
          )}
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
