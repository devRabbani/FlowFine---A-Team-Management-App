import s from "./pricing.module.css"
import Link from "next/link"

export default function Pricing() {
  return (
    <div className={s.wholePricing}>
      <div>
        <div className={`${s.pricing} wrapper`}>
          <h3>For Now Completly Free</h3>
          <p className={s.pricingP}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            aliquam deserunt ipsum dolore veniam, eius iure vel consequuntur
            fugit! Harum repellat sunt eos eveniet quaerat optio possimus
            officiis aspernatur facilis illo. Vitae ut quia hic, molestias
            deleniti saepe laborum distinctio!
          </p>
        </div>
        <div className={s.btnContainner}>
          <Link
            className={s.btn}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.canwebe.tech/"
          >
            Get Started
          </Link>
          <Link
            className={s.btn}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.canwebe.tech/"
          >
            ContactUs
          </Link>
        </div>
      </div>
    </div>
  )
}
