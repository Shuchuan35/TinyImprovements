$(document).ready(function () {

    const render = function (userList) {
        $('#from-user').empty();
        $('#from-user').append(`<option selected>Select Sender...</option>`);
        $('#to-user').empty();
        $('#to-user').append(`<option selected>Select Receiver...</option>`);
        $('#input-title').val('');
        $('#input-body').val('');

        for (let i = 0; i < userList.length; i++) {
            $('#from-user').append(`<option value="${userList[i].username}">${userList[i].username}</option>`);
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

    const renderKudos = function(kudoList) {
        console.log('kudo list', kudoList.length);
        for (let i = 0; i < kudoList.length; i++) {
            console.log('Hi');
        }

    }

    const postKudos = function(e) {
        e.preventDefault();
        const inpuTitle =  $('#input-title').val().trim();
        const inputBody =  $('#input-body').val().trim();
        const fromUser = $('#from-user').val();
        const toUser = $('#to-user').val();
        console.log('from user', fromUser);
        console.log('to user', toUser);
        const newKudo = {
            title: inpuTitle,
            body: inputBody,
            fromUser: fromUser,
            toUser: toUser
        }

        $.post('/api/kudo', newKudo)
        .then(function(data) {
            console.log(data);
        });
    }
    $('#submit-kudo').on('click', postKudos);
});