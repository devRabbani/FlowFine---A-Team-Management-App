import Link from "next/link"
import s from "./heroSection.module.css"
import mockup1 from "../../../assets/mockup1.jpg"
import mockup2 from "../../../assets/mockup2.jpg"
import Image from "next/image"

export default function HeroSection({
  user,
  username,
  loading,
  isLoading,
  signin,
}) {
  return (
    <div className={`${s.heroSection} wrapper`}>
      <div className={s.containner}>
        <div className={s.leftContainner}>
          <div className={s.leftContainnerChild}>
            <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h4>
            <h1>Welcome to FlowFine Manage your work</h1>
            <p className={s.heroPara}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              deleniti facilis, esse consequatur porro asperiores neque. Autem
              enim esse minima eum rem dicta, explicabo reiciendis porro, illo
              asperiores voluptate laborum laudantium aspernatur impedit eos
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
                </button>
                <button className={s.heroSecondaryBtn}>
                  See more features ...
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={s.rightContainner}>
          <div className={s.mobileMockup}>
            <Image className={s.leftMockup} src={mockup1} alt="Mockup" />
            <Image className={s.rightMockup} src={mockup2} alt="Mockup" />
          </div>
        </div>
      </div>
    </div>
  )
}
