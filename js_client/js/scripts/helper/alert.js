define(function () {
    return {
        getHello: function () {
            alert('Hello');
            $('#btn').on('click', function () {
                alert('Hi');
            });
            return 'Hello World';
        }
        //ajaxPost: function () {
        //    $.ajax({
        //
        //    });
        //}
    };
});