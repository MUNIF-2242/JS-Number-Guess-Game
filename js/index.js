/*generate a random number between two numbers*/
function generateRandomNumbers(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function startGame() {
  let level = getLevel();
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
  let successModalBody = document.getElementById('success-modal-msg');
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

    //createCircle();
    if (score + generatedNumber <= levelTarget) {
      score = score + generatedNumber;
      createCircle();
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
  function createCircle() {
    for (let circleCounter = 1; circleCounter <= score; circleCounter++) {
      console.log(`circleCounter` + circleCounter);
    }
    createElementSpan(score);
    console.log(`score ${score}`);
  }
  function createElementSpan(numberOfCircle) {
    const element = document.getElementById('circle-container');
    element.remove();

    let container = document.querySelector('.container');
    let parent_obj = document.createElement('div');

    parent_obj.setAttribute('id', 'circle-container');
    container.appendChild(parent_obj);

    for (let i = 1; i <= numberOfCircle; i++) {
      let span_obj = document.createElement('span');
      span_obj.setAttribute('class', 'dot');
      // span_obj.textContent = `${i}`;
      parent_obj.appendChild(span_obj);
    }
  }
  function Validation() {
    if (count < levelMaxAttempt) {
      if (score == levelTarget) {
        setTimeout(showSuccessModal, 100);
      }
    } else {
      showFailureModal();
    }
  }

  function showSuccessModal() {
    let curLevel = level;
    let nextLevel = parseInt(curLevel) + 1;
    successModalBody.innerHTML = `Congrates! You passed the level ${curLevel}. Now you are in level ${nextLevel}`;
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
  if (x == null) return (x = 1);
  //console.log(`level ${x}`);
  else return x;
}
window.onload = function () {
  //localStorage.clear();
  startGame();
};
