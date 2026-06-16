import { LitElement, html } from 'lit-element';
import { getCharacters } from '../../services/character.service';
import '../character-card/character-card.js';
import { characterListStyles } from './character-list.styles.css.js';

export class CharacterList extends LitElement {
    static styles = [characterListStyles];

    static properties = {
        characters: { type: Array }
    };

    constructor() {
        super();
        this.characters = [];
    }

    async firstUpdated() {
        const response = await getCharacters();
        this.characters = response.results ?? [];
    }

    render() {
        return html`
            <section class="character-list">
                ${this.characters.map(
                    (character) =>
                        html`<character-card .character=${character}></character-card>`
                )}
            </section>
        `;
    }
}
customElements.define('character-list', CharacterList);
