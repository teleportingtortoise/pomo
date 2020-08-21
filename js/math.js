Math.map = function(input, in_low, in_high, out_low, out_high) {
    return out_low + (out_high - out_low) * (input - in_low) / (in_high - in_low);
}