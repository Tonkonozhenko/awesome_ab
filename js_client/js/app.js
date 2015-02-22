function App() {
    this.SERVER_HOSTNAME = '192.168.100.84';
    this.SERVER_PORT = 9292;
};

$(document).ready(function () {
    var awesome_ab = new AwesomeAB('name', '.testing-content', [1, 1]);
    awesome_ab.start('.testing-content');
});