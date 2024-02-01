import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";




export default function App() {
  const [showModal, setShowModal] = useState(false);

  // add states for keeping track of previous and best times
  const [previousTime, setPreviousTime] = useState(0);
  const [bestTime, setBestTime] = useState(0);

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

//helper functions to handle starting/stopping/resetting timer ********
  function onGameStart () {
    timerStart();
  }

  function onGameEnd () {
    timerStop()
    //condition to only update bestTime if lowest time
    if(bestTime == 0 || time < bestTime){
      setBestTime(time)
    }
    setPreviousTime(time)
    timerReset()
  }
// ************************************************

  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        time={time}
        previousTime={previousTime} 
        bestTime={bestTime}
        openModal={() => setShowModal(true)}
      />
      <CardGame
        // add onGameStart, onGameEnd props
        onGameStart={onGameStart}
        onGameEnd={onGameEnd}
        cardTexts={cardTexts}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}

