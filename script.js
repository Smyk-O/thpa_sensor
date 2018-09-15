$(document).ready(function () {

    setInterval(function () {
        var now = new Date;
        var clock = $('.time');
        // дата и время
        now = now.getHours() + ':' + now.getMinutes();
        // показания счетчиков
        fetch('https://api.waqi.info/api/feed/@8641/obs.en.json')
            .then(res => res.json())
            .then(json => air_sens = json.rxs.obs[0].msg.iaqi[0].v[0])

        fetch('https://api.thingspeak.com/channels/266210/feeds.json')
            .then(res => res.json())
            .then(json => thp_sens = json.feeds[99])

            // field1:"Temperature"
            // field2:"Humidity"
            // field3:"Pressure"

        clock.html(now);
        $('.air_sens').html(air_sens);



    }, 2000);


});