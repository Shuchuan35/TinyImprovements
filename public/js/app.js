$(document).ready(function () {

    const render = function (userList) {
        $('#from-user').empty();
        $('#from-user').append(`<option selected>Select Sender...</option>`);
        $('#to-user').empty();
        $('#to-user').append(`<option selected>Select Sender...</option>`);

        for (let i = 0; i < userList.length; i++) {
            $('#from-user').append(`<option value="${userList[i]._id}">${userList[i].username}</option>`);
            $('#to-user').append(`<option value="${userList[i]._id}">${userList[i].username}</option>`);
        }
    }
    const giveKudo = function (e) {
        e.preventDefault();
        $.get('/api/users')
            .then(function (data) {
                console.log(data);
                render(data);
            });
    }

    $('#view-kudo').on('click', giveKudo);
});