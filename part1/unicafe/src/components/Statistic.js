import React from 'react';

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}:</td>
    <td>{value}</td>
  </tr>
);

export default Statistic;
