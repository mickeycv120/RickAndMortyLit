import { LitElement, html } from 'lit-element';
import { characterModalStyles } from './character-modal.styles.css.js';
import { CHARACTER_STATUS_CONFIG, DEFAULT_STATUS_COLOR } from '../../../../core/constants/app.constants.js';

export class CharacterModal extends LitElement {
    static styles = [characterModalStyles];

    static properties = {
        character: { type: Object },
    };

    constructor() {
        super();
        this.character = null;
        this._onKeydown = this._onKeydown.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('keydown', this._onKeydown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('keydown', this._onKeydown);
    }

    _onKeydown(event) {
        if (event.key === 'Escape') {
            this._close();
        }
    }

    _close() {
        this.dispatchEvent(
            new CustomEvent('modal-close', { bubbles: true, composed: true })
        );
    }

    _handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            this._close();
        }
    }

    _renderDetail(label, value, full = false) {
        if (!value) return html``;
        return html`
            <div class="detail-item ${full ? 'detail-item--full' : ''}">
                <dt>${label}</dt>
                <dd>${value}</dd>
            </div>
        `;
    }

    render() {
        if (!this.character) return html``;

        const { name, status, image, species, type, gender, origin, location, episodeCount } =
            this.character;

        const { color = DEFAULT_STATUS_COLOR, label = status } =
            CHARACTER_STATUS_CONFIG[status] ?? {};

        return html`
            <div class="backdrop" @click=${this._handleBackdropClick}>
                <div
                    class="modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <button
                        class="modal-close"
                        @click=${this._close}
                        aria-label="Cerrar"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    <div class="modal-image">
                        <img src="${image}" alt="${name}" />
                    </div>

                    <div class="modal-body">
                        <h2 id="modal-title" class="modal-name">${name}</h2>
                        <span class="modal-status" style="color: ${color};">${label}</span>

                        <dl class="modal-details">
                            ${this._renderDetail('Especie', species)}
                            ${this._renderDetail('Género', gender)}
                            ${this._renderDetail('Tipo', type)}
                            ${this._renderDetail('Origen', origin, true)}
                            ${this._renderDetail('Ubicación actual', location, true)}
                            ${this._renderDetail('Episodios', episodeCount ? `${episodeCount} episodios` : null)}
                        </dl>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('character-modal', CharacterModal);
