const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
  const { parts } = course;

  const sum = parts.reduce((acc, part) => acc + part.exercises, 0);

  return <p>Number of exercises {sum}</p>;
};

const Part = props => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  const { parts } = course;
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
