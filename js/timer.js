// Base function, just calls variable init
function Timer(duration, interval) {
    this.duration = duration;
    this.interval = interval || 1000;
    this.running = false;

    this.varInit = function() {
        console.log("Initializing variables...")
        this.tickActions = [];
        this.endActions = [];
        this.start = Date();
        this.current = Date();
        this.elapsedM = 0;
        this.elapsedS = 0;
        this.remainingM = 0;
        this.remainingS = 0;
    };

    this.varInit();
}

// Add functions to an action array
Timer.prototype.addAction = function(func, array = this.tickActions) {
    if (typeof func == 'function') {
        array.push(func);
    }
    return this;
};

// setInterval as the main tick
Timer.prototype.tick = function() {
    // Give access to dotthis
    var that = this;

    // Name the setInterval so we can clear it later (make kill function later)
    var mytick = setInterval(function() {
        // Stop the timer when the time is up
        if (that.elapsedS >= that.duration) {
            clearInterval(mytick);
            that.running = false;
            console.log("Time is up!");
            return;
        }

        //console.log(`start time: ${that.start}`)
        //console.log(`current time: ${that.current}`)
        //console.log(`elapsed mili: ${that.elapsedM}`)
        //console.log(`elapsed secs: ${that.elapsedS}`)
        //console.log(`remaining mili: ${that.remainingM}`)
        //console.log(`remaining secs: ${that.remainingS}`)
//
        // Update all the various tracked times
        that.current = Date.now();
        that.remainingM = that.current - that.start;
        that.remainingS = that.duration - ((that.remainingM / 1000) | 0);
        that.elapsedM = -(that.duration - that.remainingM);
        that.elapsedS = that.duration - that.remainingS;

        // Run tick actions
        that.tickActions.forEach(function(func) {
            func.call(this);
        });
    }, that.interval);
    mytick;
};


// Reinit some values and start the timer, ignore if already running
Timer.prototype.run = function() {
    if (this.running) {
        console.log("Already running.");
        return;
    }

    this.varInit();

    console.log(`${this.tickActions}`)
    console.log(`${this.endActions}`)
    console.log(`${this.start}`)
    console.log(`${this.current}`)
    console.log(`${this.elapsedM}`)
    console.log(`${this.elapsedS}`)
    console.log(`${this.remainingM}`)
    console.log(`${this.remainingS}`)
    console.log(`${this.running}`)

    this.running = true;
    this.start = Date.now();
    console.log(`Running ${this.running}. Started on ${this.start}`)
    this.tick();
};