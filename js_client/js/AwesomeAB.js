/**
 * Created by abodnya on 21.02.15.
 */
function AwesomeAB(namespace, container, period) {

    if (namespace) {
        this.namespace = namespace;
        this.container = container;
        this.shower = period;
    }

    this.testingVariant = function (weights) {
        var ranges = [];
        var sum = 0;
        weights.forEach(function (e) {
            sum += e;
            if (ranges.length == 0) {
                ranges.push([0, e])
            } else {
                ranges.push([ranges[ranges.length - 1][1], ranges[ranges.length - 1][1] + e])
            }
        });
        var rand = Math.random() * sum;
        for (var i = 0; i < ranges.length; i++) {
            if (ranges[i][0] <= rand && ranges[i][1] > rand) {
                return i;
            }
        }
        return 0;
    };

    var loadExperiment = function (namespace, container, variant) {
        var app = new App();
        var date = new Date();
        var md5 = $.md5(date.toUTCString());
        debugger;
        $.ajax({
            type: "POST",
            url: "http://" + app.SERVER_HOSTNAME + ":" + app.SERVER_PORT + "/experiment?session_id=" + md5 + "&name=" + namespace + "&variant=" + variant,
            //url: "http://192.168.100.84:9292/experiment?session_id=" + md5 + "&name=" + namespace + "&variant=" + variant,
            data: {session_id: md5, name: namespace, variant: variant},
            success: function (data) {
                var status = JSON.parse(data);
                console.log('Status:' + status.status);
            },
            error: function (data) {
                var status = JSON.parse(data);
                console.log('Status:' + status.status);
            }
        });
        $(container).load('templates/' + namespace + '/experiment' + variant + '.html');
    };

    this.start = function () {
        var variant = this.testingVariant(this.shower);
        loadExperiment(this.namespace, this.container, variant + 1);
    };

    //var createCookie = function (cookieValue) {
    //    debugger;
    //    var date = new Date();
    //    date.setDate(date.getDate() + 30);
    //    document.cookie = cookieValue + "; ending=" + date.toUTCString() + "; path=/";
    //};
    //
    //var getCookieValue = function () {
    //    var cookie;
    //    var cookies = getCookies();
    //    debugger;
    //for (var i = 0; i < cookies.length; i++) {
    //    cookie = cookies[i].split("=");
    //    if (cookie.length > 1)
    //        return cookie[1];
    //}
    //return null;
    //};
    //
    //var getCookies = function () {
    //    var cookies = document.cookie.split(";");
    //    return cookies;
    //};
}