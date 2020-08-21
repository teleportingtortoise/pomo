function Timer(duration, interval) {
    this.duration = duration;
    this.interval = interval || 1000;
    this.tickActions = [];
    this.endActions = [];
    this.start = Date();
    this.current = Date();
    this.elapsedM = 0;
    this.elapsedS = 0;
    this.remainingM = 0;
    this.remainingS = 0;
    this.running = false;
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

        that.current = Date.now();
        that.remainingM = ((that.duration - ((that.current - that.start) / 1000))*1000 | 0);
        that.remainingS = that.duration - (((that.current - that.start) / 1000) | 0);
        that.elapsedM = -(that.duration - (that.current - that.start));
        that.elapsedS = that.duration - that.remainingS;

        // Run tick actions
        that.tickActions.forEach(function(func) {
            func.call(this);
        });
    }, that.interval);
    mytick;
};


// Init and start the timer, ignore if running
Timer.prototype.run = function() {
    if (this.running) {
        console.log("Already running.");
        return;
    }

    this.running = true;
    this.start = Date.now();
    console.log(`Running ${this.running}. Started on ${this.start}`)
    this.tick();
};