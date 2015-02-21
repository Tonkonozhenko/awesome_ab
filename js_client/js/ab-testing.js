/**
 * Created by abodnya on 21.02.15.
 */
function abTesting(period) {
    if (period)
        this.shower = period;

    this.aTest = null;
    this.aTestGroup = function () {
        debugger;
        if (this.aTest != null) {
            return this.aTest;
        }
        //this.aTest = getCookieValue();
        if (this.aTest == undefined || this.aTest == null) {
            this.aTest = (Math.random() * 100) < this.shower;
            //createCookie(this.aTest);
        } else {
            this.aTest = (this.aTest == "true");
        }
        return this.aTest;
    };

    this.start = function () {
        if (this.aTestGroup())
            aVariant();
        else
            bVariant();
    };
    var aVariant = function () {
        $('.testing-content').load('templates/a-variant.html');
    };

    var bVariant = function () {
        $('.testing-content').load('templates/b-variant.html');
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