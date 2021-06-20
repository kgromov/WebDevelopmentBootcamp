exports.getDate = function() {
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    return today.toLocaleDateString("en-US", options);
};

// more verbose way
exports.getDay = day;
function day() {
    const today = new Date();
    const options = {
        weekday: "long"
    };
    return today.toLocaleDateString("en-US", options);
}