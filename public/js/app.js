$(document).ready(function () {
    const render = function (kudoData) {
        $('#kudos-view').empty();
        for (let i = 0; i < kudoData.length; i++) {
            const kudoId = kudoData[i]._id;
            $.get(`/api/user/${kudoId}`)
                .then(function (userData) {
                    // console.log('userData touser', userData.username);
                    const title = kudoData[i].title;
                    const body = kudoData[i].body;
                    const fromUser = kudoData[i].fromuser;
                    $('#kudos-view').append(`
                    <div class="card">
                    <div class="card-body">
                      <h5 class="card-title text-capitalize text-info">${title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${userData.username}</h6>
                      <p class="card-text">${body}</p>
                      <h6 class="card-subtitle mb-2 text-muted font-italic">~${fromUser} <i class="fa fa-smile-o" aria-hidden="true"></i></h6>
                    </div>
                  </div><br>`);
                });
        }
    }

    const getAllKudos = function () {
        $.get('/api/kudos')
            .then(function (data) {
                // console.log(data);
                render(data);
            });
    }
    getAllKudos();

    const populateSelect = function (userList) {
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

    const getUsers = function (e) {
        e.preventDefault();
        $.get('/api/users')
            .then(function (data) {
                // console.log(data);
                populateSelect(data);
            });
    }
    $('#give-kudo').on('click', getUsers);

    const postKudos = function (e) {
        e.preventDefault();
        const inpuTitle = $('#input-title').val().trim();
        const inputBody = $('#input-body').val().trim();
        const fromUser = $('#from-user').val();
        const toUser = $('#to-user').val();
        // console.log('from user', fromUser);
        // console.log('to user', toUser);
        const newKudo = {
            title: inpuTitle,
            body: inputBody,
            fromUser: fromUser,
            toUser: toUser
        }

        $.post('/api/kudo', newKudo)
            .then(function (data) {
                console.log(data);
                getAllKudos();
            });
    }
    $('#submit-kudo').on('click', postKudos);

    // const postUser = function(e) {
    //     e.preventDefault();
    //     const newUser = {
    //        username:  $('#user').val().trim(),
    //        kudos: []
    //     }
    //     $.post('/api/users', newUser)
    //     .then(function(data){
    //         console.log(data);
    //     });
    // }

    // $('#add-user').on('click', postUser);
});