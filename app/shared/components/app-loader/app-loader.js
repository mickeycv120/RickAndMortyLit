import { LitElement, html } from 'lit-element';
import { appLoaderStyles } from './app-loader.styles.css.js';
import '../../../features/characters/components/character-card-skeleton/character-card-skeleton.js';

export class AppLoader extends LitElement {
    static styles = [appLoaderStyles];

    static properties = {
        count: { type: Number },
    };

    constructor() {
        super();
        this.count = 20;
    }

    render() {
        return html`
            ${Array.from(
                { length: this.count },
                () => html`<character-card-skeleton></character-card-skeleton>`
            )}
        `;
    }
}

customElements.define('app-loader', AppLoader);
