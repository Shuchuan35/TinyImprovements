$(document).ready(function () {
    const render = function(userList) {
        // console.log('user list', userList.length);
        for (let i = 0; i < userList.length; i++) {
            // console.log('kudos[] length', userList[i].kudos.length);
            if (userList[i].kudos.length > 0) {
                const toUser = userList[i].username;
                for (let j = 0; j < userList[i].kudos.length; j++) {
                    const title = userList[i].kudos[j].title;
                    const body = userList[i].kudos[j].body;
                    const fromUser = userList[i].kudos[j].fromuser;
                    $('#kudos-view').append(`
                    <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${toUser}</h6>
                      <p class="card-text">${body}</p>
                      <h6 class="card-subtitle mb-2 text-muted font-italic">~${fromUser} <i class="fa fa-smile-o" aria-hidden="true"></i></h6>
                    </div>
                  </div>`);
                }
            }
        }
    }

    const getAllKudos = function() {
        // $.get('/api/kudos')
        // .then(function(data) {
        //     console.log(data);
        // });
        $.get('/api/users')
            .then(function (data) {
                console.log(data);
                render(data);
            });
    }
    getAllKudos();

    const populateUsers = function (userList) {
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
                populateUsers(data);
            });
    }
    $('#give-kudo').on('click', giveKudo);

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
            getAllKudos();
        });
    }
    $('#submit-kudo').on('click', postKudos);
});