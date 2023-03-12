import s from "./featurecard.module.css"
import Image from "next/image"

export default function FeatureCard({ cardTitle, cardPara }) {
  return (
    <div className={s.featureCard}>
      <div className={s.cardImg}>{/* <Image alt="svg"></Image> */}</div>
      <div className={s.cardPara}>
        <h4>{cardTitle}</h4>
        <p>{cardPara}</p>
      </div>
    </div>
  )
}
