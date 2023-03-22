import s from './video.module.css'
import Image from 'next/image'
import search from '../../../assets/searchSort.svg'
import privacy from '../../../assets/privacy.svg'

export default function Video() {
  return (
    <div className={s.videoWrapper}>
      <div className={`${s.video} wrapper`}>
        <div className={s.videoLeft}>
          <iframe
            src="https://www.youtube.com/embed/0MNqEywCxp0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </div>
        <div className={s.videoRight}>
          <div className={s.point1}>
            <Image className={s.searchSvg} src={search} alt="search" />
            <h4 className={s.pointsH4}>Search Sort Filter</h4>
            <p className={s.pointsPara}>
              &quot;Effortlessly sort, search, and filter through data with our
              advanced features. Customizable search criteria and intuitive
              sorting options streamline your workflow for increased
              productivity.&quot;
            </p>
          </div>
          <div className={s.point2}>
            <div className={s.borderPoint}>
              <h4 className={s.points2H4}>Team Management Made Easy</h4>
              <p>
                Our platform allows you to create teams with specific member
                roles and permissions. Assign team owners, editors, and members
                to streamline collaboration and maintain control over your
                projects. Work together seamlessly with the power to manage and
                share resources.
              </p>
            </div>
          </div>
          <div className={s.point3}>
            <Image className={s.searchSvg} src={privacy} alt="privacy" />
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
    </div>
  )
}
