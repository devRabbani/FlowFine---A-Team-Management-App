import Link from 'next/link'
import s from './heroSection.module.css'
import mockup1 from '../../../assets/mockup1.jpg'
import mockup2 from '../../../assets/mockup2.jpg'
import Image from 'next/image'
import HeroNav from './heroNav'
import heroBlobSvg from '../../../assets/blob.svg'
import { FaGoogle } from 'react-icons/fa'

export default function HeroSection({
  user,
  username,
  loading,
  isLoading,
  signin,
  targetRef,
}) {
  return (
    <div className={s.mainHeroSectionWrapper}>
      <HeroNav
        user={user}
        userName={username}
        loading={loading}
        isLoading={isLoading}
        signin={signin}
      />
      <div className={`${s.heroSection} wrapper`}>
        <div className={s.leftContainner}>
          <h4>Efficient collab with seamless tasks & progress tracking</h4>
          <h1>Seamless Task Management Empower Your Team on the Go!</h1>
          <p className={s.heroPara}>
            Effortlessly manage tasks on-the-go with our user-friendly mobile
            app! With its lightweight and PWA features, it ensures seamless team
            collaboration without any lag. Best of all, it&apos;s completely
            free to use!
          </p>
          <div className={s.btnDiv}>
            {user && username ? (
              <Link className={s.heroPrimaryBtn} href="/">
                Go to Dashboard
              </Link>
            ) : (
              <button
                className={s.heroPrimaryBtn}
                disabled={isLoading || loading}
                onClick={signin}
              >
                {isLoading ? 'Signing In' : 'Get Started'}
                <FaGoogle />
              </button>
            )}
            <button
              onClick={() => targetRef.current.scrollIntoView()}
              className={s.heroSecondaryBtn}
            >
              See features
            </button>
          </div>
        </div>
        <div className={s.rightContainner}>
          <Image className={s.leftMockup} src={mockup1} alt="Mockup Phone 1" />
          <Image className={s.rightMockup} src={mockup2} alt="Mockup phone 2" />
          <Image
            className={s.heroBlobSvg}
            src={heroBlobSvg}
            alt="hero blob svg"
          />
        </div>
      </div>
    </div>
  )
}
