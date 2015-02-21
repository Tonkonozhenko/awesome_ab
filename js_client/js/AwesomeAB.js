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