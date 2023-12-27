function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

var toggle = document.getElementById('toggle');

toggle.onclick = function(){
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')){
        toggle.src = "mode/darkmode.png";
    }else{
        toggle.src = "modes/lightmode.png";

    }
}




function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const phrases = ['program', 'study', 'sleep', 'work out'];
const el = document.getElementById('typewriter');

let sleepTime = 100;

let curPhraseIndex = 0;

const writeLoop = async () => {
    while (true) {
        let curWord = phrases[curPhraseIndex];
        console.log(curWord);

        for (let i = 0; i <curWord.length; i++) {
            el.innerText = curWord.substring(0, i + 1);
            await sleep(sleepTime);
        }

        await sleep(sleepTime * 27.8);

        for (let i = curWord.length; i > 0; i--) {
            el.innerText = curWord.substring(0, i - 1);
            await sleep(sleepTime);
        }

        await sleep(sleepTime * 5);

        if (curPhraseIndex === phrases.length - 1) {
            curPhraseIndex = 0;
        } else {
            curPhraseIndex++;
        }
    }
};

writeLoop();

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});


const secondElements = document.querySelectorAll('.second');
secondElements.forEach((el) => observer.observe(el));