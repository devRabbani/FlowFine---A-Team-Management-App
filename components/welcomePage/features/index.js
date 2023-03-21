import FeatureCard from "./featureCard"
import s from "./features.module.css"
import { MdMobileFriendly } from "react-icons/md"
import { SiPwa } from "react-icons/si"
import { FaFeather } from "react-icons/fa"

export default function Features() {
  return (
    <div className={`${s.features} wrapper`}>
      <h2>What we Offer</h2>
      <hr />
      {/* <p>
        Effortlessly manage your tasks on-the-go with our mobile-friendly app!
        Streamline your workflow and empower your team with its user-friendly
        interface and hassle-free task management. Best of all, it's completely
        free to use. Revolutionize your productivity today!
      </p> */}
      <div className={s.featureContainner}>
        <FeatureCard
          cardTitle="Mobile friendly & easy to use"
          cardPara="Our mobile-friendly app offers hassle-free task management on-the-go! With its easy-to-use interface, streamline your workflow and manage your team effortlessly."
          cardIcon={<MdMobileFriendly />}
        />
        <FeatureCard
          cardTitle="Light weight and PWA"
          cardPara="Experience easy task management on-the-go with our mobile-friendly app. Streamline your workflow with effortless ease!"
          cardIcon={<SiPwa />}
        />
        <FeatureCard
          cardTitle="Free to use"
          cardPara="Enjoy hassle-free task management on-the-go with our free-to-use mobile-friendly app. Streamline your workflow with ease!
          "
          cardIcon={<FaFeather />}
        />
      </div>
    </div>
  )
}
