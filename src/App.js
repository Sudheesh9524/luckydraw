import React, { useState, useEffect } from 'react';
import './App.css';
import footerImage from './f29b196b2c2c592a9a456dbbbfc15c7d.png'
import button from './button.png'
import light from './light.png'
import congrat from './Congrat.png'
import buttonDisable from './button-disable.png'
import background from './background.png'

function App() {
  const [numbers, setNumbers] = useState(Array(6).fill(0));
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSpinningSuccess, setIsSpinningSuccess] = useState(false);
  const [intervalIds, setIntervalIds] = useState([]);

  const spinNumbers = () => {
    setIsSpinningSuccess(false)
    setIsSpinning(true);
    const newIntervalIds = [];
    numbers.forEach((_, index) => {
      newIntervalIds.push(
        setInterval(() => {
          setNumbers(prevNumbers => {
            const newNumbers = [...prevNumbers];
            newNumbers[index] = (newNumbers[index] + 1) % 10; // Continuously increment (mod 10 for 0-9)
            return newNumbers;
          });
        }, 50) // Adjust speed of number rolling (lower for faster)
      );
    });

    numbers.forEach((_, index) => {
      const randomStopTime = Math.floor(Math.random() * 1000) + 500; // Random between 500ms and 1500ms
      newIntervalIds.push(
        setTimeout(() => {
          clearInterval(newIntervalIds[index]); // Stop individual box rolling
          if (index === numbers.length - 1) {
            setIsSpinning(false);
            setIsSpinningSuccess(true)
            document.getElementById("bannerSuccess").style.visibility = "visible";
            document.getElementById("firstprize").style.visibility = "visible";
            setTimeout(() => {
              document.getElementById("firstprize").style.color = "red";
              document.getElementById("firstprize").classList.add("winner-effect");
            }, 1000);
          }
        }, randomStopTime)
      );
    });

    setIntervalIds(newIntervalIds);
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => intervalIds.forEach(clearInterval);
  }, [intervalIds]);

  useEffect(() => {
    if (!isSpinning) {
      setNumbers(Array(6).fill(0)); // Reset numbers to initial state
    }
  }, [isSpinning]);

  return (
    <div className="full-blue" style={{ background: `url(${background}) center/cover`, backgroundSize: '87%', }}>
      <div id="bannerSuccess" className="congrats-banner" style={{ visibility: "hidden" }}>
        <img src={congrat} className="congrats-image" alt="Congratulations"></img>

      </div>
      <div id="firstprize" className='first-prize' style={{ visibility: "hidden" }}>
        <text>1ST PRIZE</text>
        {/* //dddddddddddddd */}
      </div>
      <div className="boxes-container">
        {numbers.map((number, index) => (
          <div key={index} className='box'>
            <img src={light} alt="Light" className="light-image" style={{
              height:
                index === 0 || index === 5
                  ? "190px"
                  : index === 1 || index === 4
                    ? "195px"
                    : index === 2 || index === 3
                      ? "215px"
                      : null, // Default value or null
              bottom: index === 0 || index === 5
                ? "205px"
                : index === 1 || index === 4
                  ? "195px"
                  : index === 2 || index === 3
                    ? "185px"
                    : null,
            }} />
            <span className="number">{number}</span>

          </div>
        ))}
      </div>

      <div className='botton-Image'>
        <img src={footerImage} alt="Footer" style={{ width: "100%", height: "150px" }} />
      </div>
      <div className="button-container">
        {isSpinning ?
          <img src={buttonDisable} alt="Button" style={{ width: "200px", height: "80px" }} /> : <img src={button} alt="Button" style={{ width: "200px", height: "70px" }} onClick={spinNumbers} />}
        {/* <img src={footerImage} alt="Footer" style={{width:"100%"}} /> */}
      </div>
    </div>
  );
}

export default App;
