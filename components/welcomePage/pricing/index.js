import s from './pricing.module.css'
import Link from 'next/link'

export default function Pricing({
  user,
  username,
  loading,
  isLoading,
  signin,
}) {
  return (
    <div className={s.pricing}>
      <h3>Now it&apos;s Completly Free</h3>
      <p className={s.pricingP}>
        Our project management app is currently free for all users, but as we
        grow, we may introduce paid plans. We&apos;ll always prioritize
        providing value to our users and any pricing changes will be transparent
        and fair. In the meantime, enjoy seamless task management, team
        collaboration, progress tracking, and more, completely free of charge.
        We appreciate your support and look forward to continuing to provide the
        best project management solution for you and your team.
      </p>

      <div className={s.btnContainner}>
        {user && username ? (
          <Link className={s.btn} href="/">
            Go to Dashboard
          </Link>
        ) : (
          <button
            className={s.btn}
            disabled={isLoading || loading}
            onClick={signin}
          >
            {isLoading ? 'Signing In' : 'Log In'}
          </button>
        )}
        <Link
          className={s.btn2}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.canwebe.tech/"
        >
          ContactUs
        </Link>
      </div>
    </div>
  )
}
