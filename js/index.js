/*generate a random number between two numbers*/
function generateRandomNumbers(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function startGame() {
  let level = getLevel();
  //let level = 1;
  let count = 0;
  let score = 0;
  const levelTarget = generateRandomNumbers(45, 50);
  let levelMaxAttempt = generateRandomNumbers(30, 35);
  let levelText = document.getElementById('level');
  let attemptsRemainingText = document.getElementById('attempts-remaining');
  let bottomWarningText = document.getElementById('bottom-warning-text');
  let attemptsCounterText = document.getElementById('attempts-counter');
  let scoreText = document.getElementById('score');
  // Get the modal
  let successModal = document.getElementById('mySuccessModal');
  let failureModal = document.getElementById('myFailureModal');

  // Get the button
  let btn = document.getElementById('try-your-luck-btn');
  let tryAgainBtn = document.getElementById('try-again-btn');
  let okBtn = document.getElementById('ok-btn');

  levelText.innerHTML = `Level: ${level}`;
  attemptsRemainingText.innerHTML = `Attempts remaining:${levelMaxAttempt}`;
  document.getElementById('target').innerHTML = `Your Target: ${levelTarget}`;
  document.getElementById(
    'max-attempt'
  ).innerHTML = `Your max attempt: ${levelMaxAttempt}`;
  bottomWarningText.innerHTML = `You can click the button upto ${levelMaxAttempt} times to reach the targeted value`;

  btn.onclick = function () {
    count = count + 1;
    let generatedNumber = generateRandomNumbers(0, 5);
    //console.log(`generated number ${generatedNumber}`);

    if (score + generatedNumber <= levelTarget) {
      score = score + generatedNumber;
      //console.log(`score ${score}`);
      Validation();
    } else {
      score = score;
      Validation();
    }

    //console.log(`Score ${score}`);

    attemptsRemainingText.innerHTML = `Attempts remaining:${
      levelMaxAttempt - count
    }`;
    attemptsCounterText.innerHTML = `Attempts count: ${count}`;
    scoreText.innerHTML = `Score: ${score}`;
  };

  function Validation() {
    if (count < levelMaxAttempt) {
      if (score == levelTarget) {
        //showSuccessModal();
        setTimeout(showSuccessModal, 100);
      }
    } else {
      //setTimeout(showFailureModal, 100);
      showFailureModal();
    }
  }

  function showSuccessModal() {
    successModal.style.display = 'block';
  }
  function showFailureModal() {
    failureModal.style.display = 'block';
  }

  tryAgainBtn.onclick = function () {
    window.location.reload();
  };

  okBtn.onclick = function () {
    level++;
    localStorage.setItem('level', level);
    window.location.reload();
  };
}
function getLevel() {
  let x = localStorage.getItem('level');
  //document.getElementById('level').innerHTML = x;
  if (x == null) {
    return (x = 1);
  }
  //console.log(`level ${x}`);
  else return x;
}
window.onload = function () {
  //localStorage.clear();
  startGame();
  //getLevel();
  //console.log('on load');
  //document.getItem('level');
};
// document.addEventListener('DOMContentLoaded', () => {
//   console.log('Hello World!');
// });
