import React, { useState } from "react";

const Header = (c) => {
  return <h1>{c.course.name}</h1>;
};
const Part = (p) => {
  return (
    <p>
      {p.part} , {p.exercise}
    </p>
  );
};
const Content = (p) => {
  return (
    <div>
      <Part part={p.parts[0].name} exercise={p.parts[0].exercises} />

      <Part part={p.parts[1].name} exercise={p.parts[1].exercises} />

      <Part part={p.parts[2].name} exercise={p.parts[2].exercises} />
    </div>
  );
};

const Total = (p) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {p.parts[0].exercises + p.parts[1].exercises + p.parts[2].exercises}
      </p>
    </div>
  );
};
//ex 1.6- 1.14

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Head = (c) => {
  return <h1>{c.head}</h1>;
};

const Stat = (props) => {
  if (props.text === "Positive Percentage") {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>{props.text}</td>
              <td>{props.value} %</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Anecdote = (props) => {
  return <button onClick={props.quote}>Next Anecdote</button>;
};

const Vote = (props) => {
  return <button onClick={props.voteForQ}>Vote</button>;
};

const noFeedback = (total) => {
  if (total === 0) {
    return <div>No geedback given!</div>;
  } else {
    return (
      <>
        <Stat text={"Good"} value={good} sum={total} />
        <Stat text={"Neutral"} value={neutral} sum={total} />
        <Stat text={"Bad"} value={bad} sum={total} />
        <Stat text={"Total"} value={total} sum={total} />
        <Stat text={"Average"} value={avg} sum={total} />
        <Stat text={"Positive Percentage"} value={pPerc} sum={total} />
      </>
    );
  }
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const len = anecdotes.length;
  const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let [selected, setSelected] = useState(anecdotes[0]);
  let [voteCount, setvoteCount] = useState(0);
  let [popAnecdote, setPopAnecdote] = useState(" ");

  const total = good + bad + neutral;
  const avg = total ? (good + -1 * bad + 0 * neutral) / total : 0;
  //   const pPerc= (((good-bad)/good)*100)
  const pPerc = good ? ((good - bad) / good) * 100 : 0;
  //const copy= {...points}

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const handleQuoteSelect = () => {
    const k = Math.floor(Math.random() * len);
    setSelected((selected = anecdotes[k]));
    setvoteCount((voteCount = 0));
  };

  const handleVoteCount = () => {
    points[anecdotes.indexOf(selected)]++;
    setvoteCount((voteCount = points[anecdotes.indexOf(selected)]));
    let arr = Object.values(points);

    let max = Math.max(...arr);
    setPopAnecdote((popAnecdote = anecdotes[arr.indexOf(max)]));

    //copy[anecdotes.indexOf(selected)]++;
    //setvoteCount(voteCount=copy[anecdotes.indexOf(selected)])
  };

  return (
    <div>
      <Header course={course} />

      <Content parts={course.parts} />

      <Total parts={course.parts} />

      <Head head={"Give Feedback"} />

      <Button handleClick={handleGoodClick} text="good" />

      <Button handleClick={handleNeutralClick} text="neutral" />

      <Button handleClick={handleBadClick} text="bad" />

      <Head head={"Statistics"} />

      {noFeedback(total, good, neutral, bad, avg, pPerc)}

      <Head head={"Anecdote of The Day"} />

      <Anecdote quote={handleQuoteSelect} />

      <Vote voteForQ={handleVoteCount} />

      <br />
      <br />

      <div>{selected}</div>
      <br />
      <div>Votes: {voteCount}</div>
      <br />

      <Head head={"Most Popular Anecdote"} />
      <br />
      {popAnecdote}
      <br />
      <br />
    </div>
  );
};

export default App;
