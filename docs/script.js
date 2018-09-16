$(document).ready(function () {
    var $clock_h = $('.hour');
    var $clock_m = $('.minute');
    var $date = $('.col');

    // дата и время
    function init_clock() {
        var now = new Date;
        hour_data = now.toLocaleString("ru", { hour: '2-digit' });
        minute_data = now.toLocaleString("ru", { minute: '2-digit' });
        week_data = now.toLocaleString("en-US", { weekday: 'long' });
        month_data = now.toLocaleString("en-US", { month: 'long', day: '2-digit' });

        // публикация данных на страницу
        $clock_h.html(hour_data);
        $clock_m.html(minute_data);
        $date.html(week_data + ' - ' + month_data);
    };

    function init_sens() {
        // показания счетчиков
        fetch('https://api.waqi.info/api/feed/@8641/obs.en.json')
            .then(res => res.json())
            .then(json => {
                air_sens = json.rxs.obs[0].msg.iaqi[0].v[0]
                $('.air_sens').html(air_sens);
            })

        fetch('https://api.thingspeak.com/channels/266210/feeds.json')
            .then(res => res.json())
            .then(json => {
                thp_sens = json.feeds[99];

                var tem_sens = thp_sens.field1;
                var hum_sens = thp_sens.field2;
                var press_sens = thp_sens.field3;

                $('.tem_sens').html(tem_sens);
                $('.hum_sens').html(hum_sens);
                $('.press_sens').html(press_sens);
            });
    };

    setInterval(init_clock, 1000);
    setInterval(init_sens, 5 * 60 * 1000)

    init_clock();
    init_sens();

    $(function load() {
        if (localStorage.save_background_data) {
            try {
                var clr = JSON.parse(localStorage.save_background_data);
                document.querySelector('body').style.background = clr;
            } catch (e) {
                console.log('Storage cannot be parsed')
            }
        }
        if (localStorage.save_background_data) {
            try {
                var clr = JSON.parse(localStorage.save_color_data);
                document.querySelector('body').style.color = clr;
            } catch (e) {
                console.log('Storage cannot be parsed')
            }
        }
    });

    $(function () {
        $("#back_col").change(function () {
            var clr = $(this).val();
            document.querySelector('body').style.background = clr;
            localStorage.save_background_data = JSON.stringify(clr);
        });

        $("#font_col").change(function () {
            var clr = $(this).val();
            document.querySelector('body').style.color = clr;
            localStorage.save_color_data = JSON.stringify(clr);
        });
    });

});