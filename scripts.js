$(function() {
    // GET/READ
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/winers',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.winers.forEach(function(winner) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + winner.id + '</td>\
                            <td><input type="text" class="name" value="' + winner.name + '"></td>\
                            <td>\
                                <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createInput = $('#create-input');

        $.ajax({
            url: '/winers',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: function(response) {
                console.log(response);
                createInput.val('');
                $('#get-button').click();
            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();

        $.ajax({
            url: '/winers/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/winers/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

});
