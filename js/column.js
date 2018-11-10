/* ---------- COLUMNS ---------- */
function Column(id, name) {
    var self = this;
    
    this.id = id;
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
        var $column = $('<div>').addClass('column');
        var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
        var $columnCardList = $('<ul>').addClass('column-card-list');
        var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
        var $columnDelete = $('<button>').addClass('btn-delete-column').text('Delete column');

        $columnDelete.click(function() {
            self.removeColumn();
        });

        $columnAddCard.click(function(event) {
            var nameCard = prompt('Enter the name of the card');
            event.preventDefault();
            if (nameCard === '') {
                alert('Give the name of the card!');
            } else {
                $.ajax({
                    url: baseUrl + '/card',
                    method: 'POST',
                    data: {
                        name: nameCard,
                        bootcamp_kanban_column_id: self.id
                    },
                    success: function(response) {
                        var card = new Card(response.id, nameCard);
                        self.addCard(card);
                    }
                });
            }
        });

        $column.append($columnTitle)
            .append($columnAddCard)
            .append($columnDelete)
            .append($columnCardList);

        return $column;
    }
}

Column.prototype = {
    addCard: function(card) {
        this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function(response) {
                self.$element.remove();
            }
        });
    }
};