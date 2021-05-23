import Statistic from './Statistic';

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="Total" value={total} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={`${positive}%`} />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
