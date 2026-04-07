const Notification = ({ message, type }) => {
  if (!message) return null

  const className = `notification ${type || ''}`

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification