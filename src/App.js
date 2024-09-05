import React, { useState, useEffect } from "react";
import "./App.css"; 
import QueueDisplay from "./QueueDisplay"; 

function App() {
  const [numbers, setNumbers] = useState([]);
  const [highPriorityQueue, setHighPriorityQueue] = useState([]);
  const [regularQueue1, setRegularQueue1] = useState([]);
  const [regularQueue2, setRegularQueue2] = useState([]);
  const [regularQueue3, setRegularQueue3] = useState([]);

  const [highPriorityProgress, setHighPriorityProgress] = useState(0);
  const [regularQueue1Progress, setRegularQueue1Progress] = useState(0);
  const [regularQueue2Progress, setRegularQueue2Progress] = useState(0);
  const [regularQueue3Progress, setRegularQueue3Progress] = useState(0);

  const createTask = (num, queueList, duration) => {
    return {
      value: num,
      queueList: queueList,
      duration: duration,
    };
  };

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setNumbers([...numbers, randomNumber]);
  };

  const admitTask = () => {
    if (numbers.length === 0) {
      alert("No numbers to admit.");
      return;
    }

    const numToAdmit = numbers[0];
    let task;

    if (numToAdmit % 3 === 0) {
      task = createTask(numToAdmit, "High Priority Queue", numToAdmit * 10);
      setHighPriorityQueue((prevQueue) => [...prevQueue, task]);
      setHighPriorityProgress((prevProgress) => prevProgress + 1);
    } else if (numToAdmit % 2 === 0) {
      task = createTask(numToAdmit, "Regular Queue 1", numToAdmit * 10);
      setRegularQueue1((prevQueue) => [...prevQueue, task]);
      setRegularQueue1Progress((prevProgress) => prevProgress + 1);
    } else if (numToAdmit % 5 === 0) {
      task = createTask(numToAdmit, "Regular Queue 2", numToAdmit * 10);
      setRegularQueue2((prevQueue) => [...prevQueue, task]);
      setRegularQueue2Progress((prevProgress) => prevProgress + 1);
    } else {
      task = createTask(numToAdmit, "Regular Queue 3", numToAdmit * 10);
      setRegularQueue3((prevQueue) => [...prevQueue, task]);
      setRegularQueue3Progress((prevProgress) => prevProgress + 1);
    }

    setNumbers((prevNumbers) => prevNumbers.slice(1));

    setTimeout(() => {
      task.duration = 0;
      if (task.queueList === "High Priority Queue") {
        setHighPriorityQueue((prevQueue) => prevQueue.filter((item) => item !== task));
        setHighPriorityProgress((prevProgress) => prevProgress - 1);
      } else if (task.queueList === "Regular Queue 1") {
        setRegularQueue1((prevQueue) => prevQueue.filter((item) => item !== task));
        setRegularQueue1Progress((prevProgress) => prevProgress - 1);
      } else if (task.queueList === "Regular Queue 2") {
        setRegularQueue2((prevQueue) => prevQueue.filter((item) => item !== task));
        setRegularQueue2Progress((prevProgress) => prevProgress - 1);
      } else if (task.queueList === "Regular Queue 3") {
        setRegularQueue3((prevQueue) => prevQueue.filter((item) => item !== task));
        setRegularQueue3Progress((prevProgress) => prevProgress - 1);
      }
    }, task.duration*10);
  };

  useEffect(() => {
    setHighPriorityProgress((prevProgress) => Math.min(prevProgress, 10));
    setRegularQueue1Progress((prevProgress) => Math.min(prevProgress, 10));
    setRegularQueue2Progress((prevProgress) => Math.min(prevProgress, 10));
    setRegularQueue3Progress((prevProgress) => Math.min(prevProgress, 10));
  }, [
    highPriorityProgress,
    regularQueue1Progress,
    regularQueue2Progress,
    regularQueue3Progress,
  ]);

  return (
    <div className="App">
      <h1>State Management</h1>
      <div className="container">
        <div className="column">
          <div>
            <button onClick={generateRandomNumber} className="blue-button">
              Add Random Task
            </button>
            <button onClick={admitTask} className="blue-button">
              Admit Task
            </button>
          </div>
          <div className="number-box">
            <h2>Task Queue</h2>
            <div className="number-row">
              {numbers.map((number, index) => (
                <div
                  key={index}
                  className={`number-item${number % 3 === 0 ? " high-priority" : ""}`}
                >
                  {number}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="column">
          <QueueDisplay
            queueName="High Priority Queue 1"
            queueList={highPriorityQueue}
            progress={highPriorityProgress}
          />
          <QueueDisplay
            queueName="Regular Queue 2"
            queueList={regularQueue1}
            progress={regularQueue1Progress}
          />
          <QueueDisplay
            queueName="Regular Queue 3"
            queueList={regularQueue2}
            progress={regularQueue2Progress}
          />
          <QueueDisplay
            queueName="Regular Queue 4"
            queueList={regularQueue3}
            progress={regularQueue3Progress}
          />
        </div>
      </div>
    </div>
  );
}
export default App;