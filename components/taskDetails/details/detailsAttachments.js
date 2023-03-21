import { RiDownload2Line } from 'react-icons/ri'
import { useTaskDetails } from '../../../context/TaskDetailsContext'
import s from '../taskDetails.module.css'

export default function DescriptionAttachments() {
  const { fullInfo } = useTaskDetails()

  if (!fullInfo?.attachments?.length) {
    return null
  }

  return (
    <div>
      <h3 className={s.header}>Attachments</h3>
      <div className={s.attachments}>
        {fullInfo.attachments.map((attachment, i) => (
          <a
            href={attachment.url}
            className={s.attachments_file}
            key={i}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiDownload2Line /> {attachment.name}
          </a>
        ))}
      </div>
    </div>
  )
}
