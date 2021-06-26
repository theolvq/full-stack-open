import React from 'react';
import { connect } from 'react-redux';

const Notification = props => {
  const notification = () => (props.notification ? props.notification : null);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return notification() !== null ? (
    <div style={style}>{notification()}</div>
  ) : null;
};
const mapStateToProps = state => ({
  notification: state.notification,
});

const connectedNotification = connect(mapStateToProps)(Notification);
export default connectedNotification;

// import React from 'react';
// import { useSelector } from 'react-redux';

// const Notification = () => {
//   const notification = useSelector(state => state.notification);

//   const style = {
//     border: 'solid',
//     padding: 10,
//     borderWidth: 1,
//   };
//   return notification && <div style={style}>{notification}</div>;
// };

// export default Notification;
