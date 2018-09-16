$(document).ready(function () {

    setInterval(function () {
        var now = new Date;
        var $clock = $('.time');
        var $date = $('.col');
        // дата и время
        hour_data = now.toLocaleString("ru", { hour: '2-digit' });
        minute_data = now.toLocaleString("ru", { minute: '2-digit' });
        week_data = now.toLocaleString("en-US", { weekday: 'long' });
        month_data = now.toLocaleString("en-US", { month: 'long', day: '2-digit' });

        // показания счетчиков
        fetch('https://api.waqi.info/api/feed/@8641/obs.en.json')
            .then(res => res.json())
            .then(json => air_sens = json.rxs.obs[0].msg.iaqi[0].v[0])

        fetch('https://api.thingspeak.com/channels/266210/feeds.json')
            .then(res => res.json())
            .then(json => thp_sens = json.feeds[99])
        var tem_sens = thp_sens.field1
        var hum_sens = thp_sens.field2
        var press_sens = thp_sens.field3

        // публикация данных на страницу
        $clock.html(hour_data + '<span class="fade">:</span>' + minute_data);
        $date.html(week_data + ' - ' + month_data)

        $('.tem_sens').html(tem_sens);
        $('.hum_sens').html(hum_sens);
        $('.press_sens').html(press_sens);
        $('.air_sens').html(air_sens);
    }, 1000);


});