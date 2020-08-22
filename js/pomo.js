var timeAmountS = 30,
timeAmountM = timeAmountS * 1000;

window.onload = function() {
    var display = document.querySelector('#spanner'),
    counter = document.querySelector('#counter'),
    timer = new Timer(timeAmountS, 17);

    timer.addAction(format).addAction(restart).run();

    function restart() {
        if (timer.elapsedS >= timer.duration) {
            setTimeout(function() { timer.run(); }, 1000);
        }
    }

    function format() {
        counter.innerText = ('00' + ((timer.remainingS / 60) | 0)).slice(-2) + ':' + ('00' + (timer.remainingS % 60)).slice(-2);
        display.style.width = Math.map(timer.elapsedM,0,timeAmountM,0,100) + '%'
        display.style.backgroundColor = 'rgb(' + Math.map(timer.elapsedM,0,timeAmountM,96,216) + ',' + Math.map(timer.elapsedM,0,timeAmountM,216,64) + ',' + '032)'
    }

    function setTime() {
        
    }
}