//test
const questions = [
  {
    image: "images/q1.png",
    scores: ["dojin", "ion", "kangho", "woorim", "hansol"]
  },
  {
    image: "images/q2.png",
    scores: ["woorim", "kangho", "hansol", "dojin", "ion"]
  },
  {
    image: "images/q3.png",
    scores: ["hansol", "dojin", "ion", "woorim", "kangho"]
  },
  {
    image: "images/q4.png",
    scores: ["ion", "woorim", "kangho", "hansol", "dojin"]
  },
  {
    image: "images/q5.png",
    scores: ["kangho", "hansol", "dojin", "ion", "woorim"]
  },
  {
    image: "images/q6.png",
    scores: ["dojin", "woorim", "hansol", "kangho", "ion"]
  },
  {
    image: "images/q7.png",
    scores: ["ion", "dojin", "woorim", "kangho", "hansol"]
  },
  {
    image: "images/q8.png",
    scores: ["hansol", "kangho", "ion", "dojin", "woorim"]
  }
];

let currentQuestion = -1;

const memberScores = {
  dojin: 0,
  ion: 0,
  kangho: 0,
  woorim: 0,
  hansol: 0
};

function resetScores() {
  memberScores.dojin = 0;
  memberScores.ion = 0;
  memberScores.kangho = 0;
  memberScores.woorim = 0;
  memberScores.hansol = 0;
}

function startTest() {
  resetScores();
  currentQuestion = 0;
  renderQuestion();
}

function goHome() {
  resetScores();
  currentQuestion = -1;
  renderQuestion();
}

function selectChoice(choiceIndex) {
  const member = questions[currentQuestion].scores[choiceIndex];
  memberScores[member]++;

  currentQuestion++;

  if (currentQuestion >= questions.length) {
    showResult();
  } else {
    renderQuestion();
  }
}

function showResult() {
  let resultMember = "dojin";
  let maxScore = 0;

  for (const member in memberScores) {
    if (memberScores[member] > maxScore) {
      maxScore = memberScores[member];
      resultMember = member;
    }
  }

  document.getElementById("app").innerHTML = `
    <div style="position:relative; width:100%;">
      <img
        src="images/${resultMember}.png"
        alt="결과 이미지"
        style="width:100%; display:block;"
      >

      <button
        onclick="goHome()"
        style="
          position:absolute;
          left:3%;
          top:83%;
          width:43%;
          height:9%;
          background:transparent;
          border:none;
          cursor:pointer;
        "
      >
      </button>

      <button
        onclick="window.open('https://youtu.be/x8EEqEXjmxc?si=tVZYL3zmOaUmf6WK', '_blank')"
        style="
          position:absolute;
          right:3%;
          top:83%;
          width:46%;
          height:9%;
          background:transparent;
          border:none;
          cursor:pointer;
        "
      >
      </button>
    </div>
  `;
}

function renderQuestion() {

  if (currentQuestion === -1) {
    document.getElementById("app").innerHTML = `
      <div style="position:relative; width:100%;">
        <img
          src="images/home.png"
          alt="홈"
          style="width:100%; display:block;"
        >

        <button
          onclick="startTest()"
          style="
            position:absolute;
            left:10%;
            top:78%;
            width:80%;
            height:10%;
            background:transparent;
            border:none;
            cursor:pointer;
          "
        >
        </button>
      </div>
    `;
    return;
  }

  const question = questions[currentQuestion];

  document.getElementById("app").innerHTML = `
    <div style="position:relative; width:100%;">
      <img
        src="${question.image}"
        alt="질문"
        style="width:100%; display:block;"
      >

      <button onclick="selectChoice(0)"
        style="position:absolute; left:12%; top:36%; width:76%; height:8%; background:transparent; border:none; cursor:pointer;">
      </button>

      <button onclick="selectChoice(1)"
        style="position:absolute; left:12%; top:46%; width:76%; height:8%; background:transparent; border:none; cursor:pointer;">
      </button>

      <button onclick="selectChoice(2)"
        style="position:absolute; left:12%; top:56%; width:76%; height:8%; background:transparent; border:none; cursor:pointer;">
      </button>

      <button onclick="selectChoice(3)"
        style="position:absolute; left:12%; top:66%; width:76%; height:8%; background:transparent; border:none; cursor:pointer;">
      </button>

      <button onclick="selectChoice(4)"
        style="position:absolute; left:12%; top:77%; width:76%; height:8%; background:transparent; border:none; cursor:pointer;">
      </button>
    </div>
  `;
}

renderQuestion();