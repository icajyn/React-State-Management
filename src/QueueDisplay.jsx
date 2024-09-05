import React, { useEffect, useState } from "react";

const ProgressBar = ({ progress, duration }) => {
  const progressBarStyle = {
    width: `${progress * 100}px`,
    transition: `width ${duration}ms ease`, 
    backgroundColor: "green", 
  };

  return (
    <div className="progress-bar" style={progressBarStyle}></div>
  );
};

const QueueDisplay = ({ queueName, queueList, progress, queueType }) => {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    setProgressWidth(progress);
  }, [progress]);

  return (
    <div className={`number-box${queueType === "high-priority" ? " high-priority" : ""}`}>
      <h2>{queueName}</h2>
      <div className="queue-list">
        <p>Queue List:</p>
        <div className="number-row">
          {queueList.map((task, index) => (
            <div
              key={index}
              className={`number-item${queueType === "high-priority" ? " high-priority" : ""}`}
            >
              {task.value}
            </div>
          ))}
        </div>
      </div>
      <div className="duration-bar">
        <p>Duration:</p>
        <div className="progress-bar-container">
        <ProgressBar progress={progressWidth} duration={3000} />
        </div>
      </div>
    </div>
  );
};

export default QueueDisplay;