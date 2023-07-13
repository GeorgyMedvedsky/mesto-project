import * as api from './api.js';
import * as card from './card.js';

export function deleteCard(cardId, button) {
    api.deleteCardFromServer(cardId);
    card.deleteCard(button);
}