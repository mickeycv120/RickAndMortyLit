import { LitElement, html } from 'lit-element';
import { appEmptyStateStyles } from './app-empty-state.styles.css.js';

export class AppEmptyState extends LitElement {
    static styles = [appEmptyStateStyles];

    static properties = {
        message: { type: String },
    };

    constructor() {
        super();
        this.message = '';
    }

    render() {
        return html`<p role="status">${this.message}</p>`;
    }
}

customElements.define('app-empty-state', AppEmptyState);
