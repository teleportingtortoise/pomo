// Base function, init the important stuff
function Timer(duration, interval) {
    this.tickActions = [];
    this.endActions = [];
    this.duration = duration;
    this.interval = interval || 1000;
    this.running = false;
    this.start = Date();
    this.current = Date();
}

// Counter init function
Timer.prototype.counterInit = function() {
    this.elapsedM = 0;
    this.elapsedS = 0;
    this.remainingM = 0;
    this.remainingS = 0;
};

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
            return;
        }

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
        console.log("Already running.")
        return;
    }

    this.counterInit();

    this.running = true;
    this.start = Date.now();
    this.tick();
};