import s from "./pricing.module.css"
import Link from "next/link"

export default function Pricing() {
  return (
    <div className={s.wholePricing}>
      <section className={`${s.pricing} wrapper`}>
        <h3>Completly Free</h3>
        <p className={s.pricingP}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
          aliquam deserunt ipsum dolore veniam, eius iure vel consequuntur
          fugit! Harum repellat sunt eos eveniet quaerat optio possimus officiis
          aspernatur facilis illo. Vitae ut quia hic, molestias deleniti saepe
          laborum distinctio!
        </p>
      </section>
      <div className={s.btnContainner}>
        <Link
          className={s.btn}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.canwebe.tech/"
        >
          KnowMore
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
  )
}
