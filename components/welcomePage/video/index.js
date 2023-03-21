import s from "./video.module.css"
import Image from "next/image"
import search from "../../../assets/searching.png"

export default function Video() {
  return (
    <div className={s.video}>
      <div className={s.videoLeft}>
        <iframe
          // width="560"
          // height="315"
          src="https://www.youtube.com/embed/0MNqEywCxp0"
          title="YouTube video player"
          // frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div className={s.videoRight}>
        <div className={s.point1}>
          <Image className={s.searchSvg} src={search} alt="search" />
          <h4 className={s.pointsH4}>Search Sort Filter</h4>
          <p className={s.pointsPara}>
            "Effortlessly sort, search, and filter through data with our
            advanced features. Customizable search criteria and intuitive
            sorting options streamline your workflow for increased
            productivity."
          </p>
        </div>
        <div className={s.point2}>
          <h4 className={s.points2H4}>Team Management Made Easy</h4>
          <p className={s.pointsPara}>
            Our platform allows you to create teams with specific member roles
            and permissions. Assign team owners, editors, and members to
            streamline collaboration and maintain control over your projects.
            Work together seamlessly with the power to manage and share
            resources.
          </p>
        </div>
        <div className={s.point3}>
          <h4 className={s.pointsH4}>Flexible Team Collab</h4>
          <p className={s.pointsPara}>
            Our platform offers flexible team options, allowing you to create
            public or private teams based on your needs. Public teams provide
            open-source collaboration, while private teams ensure privacy by
            requiring a join request.
          </p>
        </div>
      </div>
    </div>
  )
}
