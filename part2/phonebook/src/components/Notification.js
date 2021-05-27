const Notification = ({ message }) => {
  const notifStyle = {
    border: '.2rem solid green',
  };

  const errorStyle = {
    border: '.2rem solid red',
  };
  return message ? (
    <div
      className="notification"
      style={message.includes('error') ? errorStyle : notifStyle}
    >
      {message}
    </div>
  ) : null;
};

export default Notification;
