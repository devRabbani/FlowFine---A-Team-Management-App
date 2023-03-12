import s from "./video.module.css"

export default function Video() {
  return (
    <div className={`${s.video} wrapper`}>
      <div className={s.videoLeft}>
        <iframe
          src="https://www.youtube.com/embed/VoCNMBo0kZ8"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className={s.videoRight}>
        <div className={s.point1}>
          <h4 className={s.pointsH4}>This is the Title1</h4>
          <p className={s.pointsPara}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            ipsam eum pariatur vitae aspernatur ipsum fugit ad eveniet obcaecati
            odio vero, qui ut dolorum quae aperiam, modi atque sit repellat.
          </p>
        </div>
        <div className={s.point2}>
          <h4 className={s.pointsH4}>This is the Title2</h4>
          <p className={s.pointsPara}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ullam
            pariatur hic libero quo. Molestiae quisquam recusandae sed
            repellendus tenetur excepturi eveniet nisi fugiat id eos. Voluptas,
            deleniti excepturi beatae, natus ullam at reprehenderit
            exercitationem saepe voluptatem numquam molestiae velit?
          </p>
        </div>
        <div className={s.point3}>
          <h4 className={s.pointsH4}>This is the Title3</h4>
          <p className={s.pointsPara}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa eius
            eaque nesciunt, velit maxime reprehenderit perspiciatis. Dolor
            blanditiis aspernatur assumenda suscipit, eaque magni aliquam
            quisquam quibusdam iste voluptates iure tempore odit libero repellat
            voluptate provident.
          </p>
        </div>
      </div>
    </div>
  )
}
