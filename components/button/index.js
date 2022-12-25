import s from './button.module.css'

export default function Button(props) {
  const { children, type, ...otherProps } = props
  return (
    <button {...otherProps} className={`${s.btn} ${type}`}>
      {children}
    </button>
  )
}
