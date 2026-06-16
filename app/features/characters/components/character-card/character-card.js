import { LitElement, html } from 'lit-element';
import { characterCardStyles } from './character-card.styles.css.js';

export class CharacterCard extends LitElement {
    static styles = [characterCardStyles];

    static properties = {
        character: { type: Object }
    };

    constructor() {
        super();
        this.character = {};
    }

    get statusColor() {
        switch (this.character.status) {
            case 'Alive':
                return '#7dff8d';
            case 'Dead':
                return '#ff6b7d';
            default:
                return '#b6c2d2';
        }
    }

    render() {

        if (!this.character) {
            return html`<p>Character not found</p>`;
        }

        const { name, status, image, species, origin } = this.character;

        return html`
        <article>
            <div class="media">
                <img src="${image}" alt="${name}" loading="lazy" />
            </div>
            <div class="content">
                <h3>${name}</h3>
                <p class="meta">
                    <span>${species}</span>
                    <span>${origin?.name ?? origin}</span>
                </p>
                <span class="status" style="color: ${this.statusColor};">${status}</span>
            </div>
        </article>
        `;
    }
}
customElements.define('character-card', CharacterCard);
