const wordEl = document.querySelector("#word")
const popup = document.querySelector("#popup-container")
const messageEl = document.getElementById("success-message")
const wrongEl = document.querySelector("#wrong-letters")
const items = document.querySelectorAll(".item")
const messageBottom = document.querySelector("#message")
const playAgain = document.querySelector("#Play-Again")

function getRandomWord(){
    const words = ["javascript", "python", "java", "css","html", "react" , "angular"]  //random word become
    return words[Math.floor(Math.random()*words.length)]
}

const corectLetters = [];
const wrongLetters = []; 
let selectedWords = getRandomWord();

function displayWord(){  //! Attention

    wordEl.innerHTML = `${selectedWords.split('').map(letter => `
            <div class="letter">
                ${corectLetters.includes(letter) ? letter : ''}
            </div>
    `).join('')}`;

    const bottomWords = wordEl.innerText.replace(/\n/g,'')
    if(bottomWords === selectedWords){
        popup.style.display = 'flex';
        messageEl.innerText = "Congratulations! You Won."
    }
}

function updateWrongLetters(){
        wrongEl.innerHTML = ` 
        ${wrongLetters.length > 0 ? '<h3>Wrong Letters</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
        `;
    items.forEach((item,index) => {
        const errorCount = wrongLetters.length;

        if(index < errorCount){
            item.style.display = 'block';
        }else{
            item.style.display = "none";
        }
    });
    if(wrongLetters.length === items.length){
        popup.style.display = 'flex';
        messageEl.innerText = "Sorry! You Lost."
    }
}

function displayMessage(){
messageBottom.classList.add('show')

setTimeout(function(){
    messageBottom.classList.remove('show');
},2000)
}

playAgain.addEventListener('click', function(){
    corectLetters.splice(0);
    wrongLetters.splice(0);

    selectedWords = getRandomWord();
    displayWord();
    updateWrongLetters();
    popup.style.display = "none";
})

window.addEventListener('keydown', function(e){ //The keyCode property is deprecated.
    if(e.which >= 65 && e.which <= 90){
    const letter = e.key
    console.log(e.which);

    if(selectedWords.includes(letter.toLowerCase())){
        if(!corectLetters.includes(letter)){
            corectLetters.push(letter);
            displayWord();
        }else{
            displayMessage();
            messageBottom.classList.add('show')
        }
    }else{
        if(!wrongLetters.includes(letter)){
            wrongLetters.push(letter);
            updateWrongLetters();
        }
        else{
            displayMessage()
        }
    }
    }
})

displayWord()