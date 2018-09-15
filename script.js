$(document).ready(function () {

    setInterval(function () {
        var now = new Date;
        now = now.getHours() + ':' + now.getMinutes();
        var clock = $('.time');
        clock.html(now);
    }, 2000);
    

});