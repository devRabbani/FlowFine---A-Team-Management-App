import s from './createPage.module.css'

export default function CreatePage() {
  return (
    <form>
      <input type="text" placeholder="Enter Task Title" />
      <textarea rows="10" placeholder="Enter Task Description" />
    </form>
  )
}
