import Link from "next/link"
import s from "./heroSection.module.css"
import mockup1 from "../../../assets/mockup1.jpg"
import mockup2 from "../../../assets/mockup2.jpg"
import Image from "next/image"
import HeroNav from "./heroNav"
import heroBlobSvg from "../../../assets/t2.svg"
import { FaGoogle } from "react-icons/fa"

export default function HeroSection({
  user,
  username,
  loading,
  isLoading,
  signin,
}) {
  return (
    <div className={s.mainHeroSectionWrapper}>
      <Image className={s.heroBlobSvg} src={heroBlobSvg} alt="hero blob svg" />
      <HeroNav
        user={user}
        userName={username}
        loading={loading}
        isLoading={isLoading}
        signin={signin}
      />
      <div className={`${s.heroSection} wrapper`}>
        <div className={s.leftContainner}>
          <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h4>
          <h1>Welcome to FlowFine Manage your work</h1>
          <p className={s.heroPara}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            deleniti facilis, esse consequatur porro asperiores neque. Autem
            enim esse minima eum rem dicta, explicabo reiciendis porro.
          </p>

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
                {isLoading ? "Signing In" : "Get Started"}
                <FaGoogle />
              </button>
              <button className={s.heroSecondaryBtn}>See features</button>
            </div>
          )}
        </div>
        <div className={s.rightContainner}>
          <Image className={s.leftMockup} src={mockup1} alt="Mockup" />
          <Image className={s.rightMockup} src={mockup2} alt="Mockup" />
        </div>
      </div>
    </div>
  )
}
