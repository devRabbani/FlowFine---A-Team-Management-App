import s from './button.module.css'

export default function Button(props) {
  const { children, variant, ...otherProps } = props
  return (
    <button {...otherProps} className={`${s.btn} ${variant}`}>
      {children}
    </button>
  )
}
