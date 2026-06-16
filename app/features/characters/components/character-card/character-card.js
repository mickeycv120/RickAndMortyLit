import { LitElement, html, css } from 'lit';

export class CharacterCard extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

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
            <img src="${image}" alt="${name}" loading="lazy" />
            <div>
                <h3>${name}</h3>  
                <p>
                    <span>${species}</span>
                    <span>${origin}</span>
                </p>
                <span style="color: ${this.statusColor};">${status}</span>
            </div>
        </article>
        `;
    }
}
customElements.define('character-card', CharacterCard);
