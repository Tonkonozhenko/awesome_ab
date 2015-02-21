$(document).ready(function () {
    var abTest = new abTesting(50);
    abTest.start();

    var awesome_ab = new AwesomeAB('name', '#container', [
        {weight: 10},
        {weight: 5}
    ])
});
