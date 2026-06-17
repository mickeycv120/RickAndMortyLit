import { LitElement, html } from 'lit-element';
import { appErrorStyles } from './app-error.styles.css.js';

export class AppError extends LitElement {
    static styles = [appErrorStyles];

    static properties = {
        message: { type: String },
    };

    constructor() {
        super();
        this.message = 'No se pudieron cargar los datos. Por favor, inténtalo de nuevo.';
    }

    _handleRetry() {
        this.dispatchEvent(new CustomEvent('retry', { bubbles: true, composed: true }));
    }

    render() {
        return html`
            <p>${this.message}</p>
            <button @click=${this._handleRetry}>Reintentar</button>
        `;
    }
}

customElements.define('app-error', AppError);
