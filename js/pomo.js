var timeAmountS = 30,
timeAmountM = timeAmountS * 1000;

window.onload = function() {
    var display = document.querySelector('#spanner'),
    counter = document.querySelector('#counter'),
    timer = new Timer(timeAmountS, 17);

    timer.addAction(format).addAction(restart);
    this.timer = timer;

    function restart() {
        if (timer.elapsedS >= timer.duration) {
            setTimeout(function() { timer.duration = timeAmountS; timer.run(); }, 1000);
        }
    }

    function format() {
        counter.innerText = ('00' + ((timer.remainingS / 60) | 0)).slice(-2) + ':' + ('00' + (timer.remainingS % 60)).slice(-2);
        counter.style.fontSize = `${display.getBoundingClientRect().height/2}px`;
        counter.style.lineHeight = `${display.getBoundingClientRect().height}px`;    
        display.style.width = Math.map(timer.elapsedM,0,timer.duration * 1000,0,100) + '%'
        display.style.backgroundColor = 'rgb(' + Math.map(timer.elapsedM,0,timer.duration * 1000,96,216) + ',' + Math.map(timer.elapsedM,0,timer.duration * 1000,216,64) + ',' + '032)'
    }

    this.setTime = function() {
        var variable = document.getElementById("input_id").value;
        timeAmountS = variable;
    }
}