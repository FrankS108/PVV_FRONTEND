export const Alert = ({alert}) => {
  return (
    <div className={`${alert.error ? 'alert__error' : 'alert__correct'}`}>
        {alert.msg}
    </div>
  )
}