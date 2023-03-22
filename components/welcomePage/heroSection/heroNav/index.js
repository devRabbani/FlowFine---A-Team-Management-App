import { useState } from 'react'
import s from './heroNav.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../../assets/logo192.png'
import { MdMenu, MdClose } from 'react-icons/md'
import { FaGoogle } from 'react-icons/fa'

export default function HeroNav({
  user,
  username,
  loading,
  isLoading,
  signin,
}) {
  return (
    <>
      <div className={`${s.nav} wrapper`}>
        <div className={s.navLeft}>
          <Image className={s.logo} src={Logo} alt="nav logo" />
          <Link href="/welcome" className={s.logoText}>
            FlowFine
          </Link>
        </div>
        <div className={s.navLogin}>
          {user && username ? (
            <Link className={s.loginBtn} href="/">
              Go to Dashboard
            </Link>
          ) : (
            <button
              className={s.loginBtn}
              disabled={isLoading || loading}
              onClick={signin}
            >
              {isLoading ? (
                'Logging In'
              ) : (
                <>
                  Log In <FaGoogle />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </>
  )
}
