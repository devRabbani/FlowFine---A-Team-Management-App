import FeatureCard from "./featureCard"
import s from "./features.module.css"

export default function Features() {
  return (
    <div className={`${s.features} wrapper`}>
      <h2>Features</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem est
        animi, porro aliquid inventore sapiente deserunt cumque aspernatur.
        Deleniti, accusantium.
      </p>
      <div className={s.featureContainner}>
        <FeatureCard
          cardTitle="The Card Title 1"
          cardPara="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus
          maiores fuga alias perspiciatis ratione. Tenetur nobis maxime
          quibusdam "
        />
        <FeatureCard
          cardTitle="The Card Title 2"
          cardPara="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus
          maiores fuga alias perspiciatis ratione. Tenetur nobis omnis, maxime
          quibusdam eligendi reprehenderit"
        />
        <FeatureCard
          cardTitle="The Card Title 3"
          cardPara="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus
          maiores fuga alias perspiciatis ratione. Tenetur nobis omnis, maxime
          "
        />
      </div>
    </div>
  )
}
