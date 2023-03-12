import s from "./footer.module.css"
import Link from "next/link"
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa"

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.topFooter}>
        <div className={s.topLeft}>
          <Link
            href="https://canwebe.tech"
            target="_blank"
            className={s.canwebe}
          >
            <span className={s.can}>Can</span>WeBe!
          </Link>
          <p className={s.topPara}>
            CanWeBe is a software development organization which is founded by a
            group of students.We here at canwebe mainly developed softwares to
            solve daily life problems, Other than this we have a team of varius
            skilled person from different different field of work. We
            collaborate and brainstorm on ideas and deliver easy to use software
            to general users free of cost.
          </p>
        </div>
        <div className={s.topRight}>
          <div className={s.rightLeft}>
            <h4 className={s.h4}>Products</h4>
            <Link
              className={s.footerLink}
              href="https://silentshare.netlify.app/"
              target="_blank"
            >
              SIlentShare
            </Link>
            <Link
              className={s.footerLink}
              href="https://cwbedufeedback.netlify.app/"
              target="_blank"
            >
              SaITFeedback
            </Link>
            <Link
              className={s.footerLink}
              href="https://dailosocial.vercel.app/"
              target="blank"
            >
              DailoSocial
            </Link>
          </div>
          <div className={s.rightRight}>
            <h4 className={s.h4}>ContactUs</h4>
            <Link
              className={s.footerLink}
              href="https://www.canwebe.tech/form/contact/"
              target="_blank"
            >
              Contact
            </Link>
            <Link
              className={s.footerLink}
              href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=teamcanwebe@gmail.com"
              target="_blank"
            >
              Gmail
            </Link>
            <Link
              className={s.footerLink}
              href="https://www.canwebe.tech/form/review"
              target="_blank"
            >
              Review
            </Link>
          </div>
        </div>
      </div>
      <div className={s.bottomFooter}>
        <div className={s.bottomLeft}>
          {" "}
          &#169; {new Date().getFullYear()} All rights are reserved by CanWeBe!{" "}
        </div>
        <div className={s.bottomRight}>
          <Link
            className={s.facebook}
            href="https://www.facebook.com/TeamCanWeBe"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook />
          </Link>
          <Link
            className={s.instagram}
            href="https://www.instagram.com/canwebeofficial/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </Link>
          <Link
            className={s.linkedin}
            href="https://www.linkedin.com/company/canwebe"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </Link>
          <Link
            className={s.youtube}
            href="https://www.youtube.com/channel/UCZQme48ejS0QY3C4JmWgI4Q"
            target="_blank"
            rel="noreferrer"
          >
            <FaYoutube />
          </Link>
          <Link
            className={s.twitter}
            href="https://twitter.com/teamcanwebe"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter />
          </Link>
        </div>
      </div>
    </footer>
  )
}
