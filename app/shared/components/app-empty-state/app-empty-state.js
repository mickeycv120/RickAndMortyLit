import { LitElement, html } from 'lit-element';
import { appEmptyStateStyles } from './app-empty-state.styles.css.js';

export class AppEmptyState extends LitElement {
    static styles = [appEmptyStateStyles];

    static properties = {
        message: { type: String },
        image: { type: String },
    };

    constructor() {
        super();
        this.message = '';
        this.image = '';
    }

    render() {
        return html`
            ${this.image ? html`<img src="${this.image}" alt="" aria-hidden="true" />` : ''}
            <p role="status">${this.message}</p>
        `;
    }
}

customElements.define('app-empty-state', AppEmptyState);
