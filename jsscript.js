var slider = document.querySelector("[data-lengthSlider]");
var lengthNumber = document.querySelector("[data-lengthNumber]");
var displayPass = document.querySelector("[data-passwordDisplay]");
let sliderValue = slider.value;
sliderValue = 10;
lengthNumber.innerText = 10;
var checkbox = document.querySelectorAll("[type = checkbox");
checkbox[0].checked = true;
var functions = [
  getRandomUpperCase,
  getRandomLowerCase,
  getRandomNumbers,
  getRandomSymbols,
];
var dataIndicator = document.querySelector("[data-indicator]");

var checkSum = 0;

var copyMsgText = document.querySelector("[data-copyMsg]")

var copyMsgImg = document.querySelector("[data-copyMsgImg]");
copyMsgImg.addEventListener("click", function () {
    if(displayPass.value){
        copyMsg();
    }
  
});

async function copyMsg() {
    try{
        await navigator.clipboard.writeText(displayPass.value);
        copyMsgText.innerText = "copied";
    }
    catch(e){
        copyMsgText.innerText = "Failed";
    }

    copyMsgText.classList.add('active');

    setTimeout(()=> {
        copyMsgText.classList.remove('active');
    },2000);
  
}

document.querySelector("[data-lengthSlider]").oninput = function () {
  myFunction();
};

function myFunction() {
  sliderValue = slider.value;
  lengthNumber.innerText = sliderValue;
}

var generatePassButton = document.querySelector(".generateButton");

generatePassButton.addEventListener("click", function () {
  generatePass();
});

function generatePass() {
    checkSum =0;
    var arr = [];
    for (let j = 0; j < 4; j++) {
    if (checkbox[j].checked == true) {
      checkSum += 1;
      arr.push(j);
    }
  }

  if(checkSum < 1) {
    alert("select atleast one checkbox");
  }

  if(checkSum>sliderValue){
    slider.value= checkSum;
    myFunction();

  }

  var password ="";

  if(checkbox[0].checked){
    password +=getRandomUpperCase();
  }
  if(checkbox[1].checked){
    password +=getRandomLowerCase();
  }
  if(checkbox[2].checked){
    password +=getRandomNumbers();
  }
  if(checkbox[3].checked){
    password +=getRandomSymbols();
  }

  for (let i = 0; i < sliderValue-checkSum; i++) {
    let randomElement = arr[Math.floor(Math.random() * arr.length)];
    let t = functions[randomElement]();
    password += t;
  }

  password = fisherYatesShuffle(Array.from(password));

  displayPass.value = password;
  strength();
}

function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at index i and index j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
}

function strength() {
  if (sliderValue < 6 || checkSum <= 1) {
    dataIndicator.style.backgroundColor = "red";
  } else if (sliderValue > 15) {
    dataIndicator.style.backgroundColor = "green";
  } else if (sliderValue < 15 && checkSum > 2) {
    dataIndicator.style.backgroundColor = "orange";
  }
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function getRandomUpperCase() {
  let num = getRandomInt(65, 90);
  return String.fromCharCode(num);
}

function getRandomLowerCase() {
  let num = getRandomInt(97, 122);

  return String.fromCharCode(num);
}

function getRandomNumbers() {
  let num = getRandomInt(48, 57);

  return String.fromCharCode(num);
}
function getRandomSymbols() {
  let num = getRandomInt(33, 47);

  return String.fromCharCode(num);
}
