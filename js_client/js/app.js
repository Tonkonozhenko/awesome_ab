// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
//requirejs.config({
//    paths: {
//        //app: './js/scripts'
//        app: 'scripts'
//    }
//});
//
//// Start loading the main app file. Put all of
//// your application logic in there.
//requirejs(['js/scripts/main']);


App = Ember.Application.create();

App.Router.map(function () {
    // put your routes here
});


buttons = [{
    title: "button#1"
}, {
    title: "button#2"
}, {
    title: "button#3"
}, {
    title: "button#4"
}];

App.IndexRoute = Ember.Route.extend({
    model: function () {
        var randomItem = Math.ceil((0 - 1) + Math.random() * (buttons.length - (0 - 1)));
        return buttons[randomItem];
    }
});