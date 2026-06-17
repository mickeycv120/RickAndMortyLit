import { LitElement, html } from 'lit-element';
import { characterCardStyles } from './character-card.styles.css.js';
import { CHARACTER_STATUS_CONFIG, DEFAULT_STATUS_COLOR } from '../../../../core/constants/app.constants.js';

export class CharacterCard extends LitElement {
    static styles = [characterCardStyles];

    static properties = {
        character: { type: Object }
    };

    constructor() {
        super();
        this.character = {};
    }

    render() {

        if (!this.character) {
            return html`<p>Character not found</p>`;
        }

        const { name, status, image, species, origin } = this.character;
        const { color = DEFAULT_STATUS_COLOR, label = status } = CHARACTER_STATUS_CONFIG[status] ?? {};

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
                <span class="status" style="color: ${color};">${label}</span>
            </div>
        </article>
        `;
    }
}
customElements.define('character-card', CharacterCard);
