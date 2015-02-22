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
        var sessionId;
        if ($.cookie('session_id')) {
            sessionId = $.cookie('session_id');
        } else {
            sessionId = $.md5(date.toUTCString());
            $.cookie('session_id', sessionId);
        }
        $.ajax({
            type: "POST",
            url: "http://" + app.SERVER_HOSTNAME + ":" + app.SERVER_PORT + "/experiment?session_id=" + sessionId + "&name=" + namespace + "&variant=" + variant,
            data: {session_id: sessionId, name: namespace, variant: variant},
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

    this.start = function (container) {
        var app = new App();
        var sessionId;
        var self = this;

        if ($.cookie('session_id')) {
            sessionId = $.cookie('session_id');
            $.ajax({
                type: "GET",
                url: "http://" + app.SERVER_HOSTNAME + ":" + app.SERVER_PORT + '/find?session_id=' + sessionId,
                dataType: 'json',
                success: function (data) {
                    var variant;
                    if (data[self.namespace]) {
                        variant = data[self.namespace][0].variant;
                        loadExperiment(self.namespace, container, variant);
                    } else {
                        variant = self.testingVariant(self.shower);
                        loadExperiment(self.namespace, self.container, variant + 1);
                    }
                },
                error: function (data) {
                    console.log('Oops, try later');
                }
            })
        } else {
            var variant = this.testingVariant(this.shower);
            loadExperiment(this.namespace, this.container, variant + 1);
        }
    };
}