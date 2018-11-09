

function initSortable() {
    $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: 'card-placeholder'
    }).disableSelection();
};

/* ---------- New column in the main table ---------- */
var board = {
    addColumn: function(column) {
        this.$element.append(column.$element);
        initSortable();
    },
    $element: $('#board .column-container')
};

$('.create-column').click(function() {
    var nameColumnMainBoard = prompt('Enter a column name');

    if (nameColumnMainBoard === '') {
        alert('Give the name of the column!');
    }
    else {
        $.ajax({
            url: baseUrl + '/column',
            method: 'POST',
            data: {
                name: nameColumnMainBoard
            },
            success: function(response) {
                var column = new Column(response.id, nameColumnMainBoard);
                board.addColumn(column);      
            }
        })
    }
});
