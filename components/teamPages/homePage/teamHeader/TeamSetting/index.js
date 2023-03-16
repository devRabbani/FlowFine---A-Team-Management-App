import Button from '../../../../button'
import s from './teamSetting.module.css'

export default function TeamSetting() {
  return (
    <div className={`${s.teamSettingBody} wrapper`}>
      <div className={s.teamLeaveDiv}>
        <h3>Want to leave this team!</h3> <button>Leave Team</button>
      </div>
      <div className="headerDiv">
        <h3>Team</h3>
      </div>
      <div>
        <div className="formDiv">
          <label htmlFor="name">Team Name</label>
          <input type="text" placeholder="Change Team Name" />
        </div>
        <div className={s.btnDiv}>
          <Button variant="primary">Change</Button>
          <Button variant="grey">Reset</Button>
        </div>
      </div>
    </div>
  )
}
