/* ---------- CARDS ---------- */
function Card(id, name) {
    var self = this;
    
    this.id = id;
    this.name = name;
    this.$element = createCard();

    function createCard() {
        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.name);
        var $cardDelete = $('<button>').addClass('btn-delete-card').text('Delete card');

        $cardDelete.click(function() {
            self.removeCard();
        });

        $card.append($cardDescription)
            .append($cardDelete);

        return $card;
    };
}

Card.prototype = {
    removeCard: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function() {
                self.$element.remove();
            }
        });
    }
}