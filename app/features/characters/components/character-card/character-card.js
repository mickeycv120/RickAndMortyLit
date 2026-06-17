import { LitElement, html } from 'lit-element';
import { characterCardStyles } from './character-card.styles.css.js';
import { CHARACTER_STATUS_CONFIG, DEFAULT_STATUS_COLOR } from '../../../../core/constants/app.constants.js';
import { favoritesStore, FAVORITES_CHANGED_EVENT } from '../../../../core/stores/favorites.store.js';

export class CharacterCard extends LitElement {
    static styles = [characterCardStyles];

    static properties = {
        character: { type: Object },
        isFavorite: { type: Boolean },
    };

    constructor() {
        super();
        this.character = {};
        this.isFavorite = false;
        this._onFavoritesChanged = this._onFavoritesChanged.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener(FAVORITES_CHANGED_EVENT, this._onFavoritesChanged);
        this._syncFavoriteState();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener(FAVORITES_CHANGED_EVENT, this._onFavoritesChanged);
    }

    _onFavoritesChanged() {
        this._syncFavoriteState();
    }

    _syncFavoriteState() {
        this.isFavorite = favoritesStore.isFavorite(this.character?.id);
    }

    _handleClick() {
        this.dispatchEvent(
            new CustomEvent('character-select', {
                detail: { character: this.character },
                bubbles: true,
                composed: true,
            })
        );
    }

    _handleKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this._handleClick();
        }
    }

    _handleFavoriteClick(event) {
        event.stopPropagation();
        favoritesStore.toggle(this.character?.id);
    }

    render() {
        if (!this.character) {
            return html`<p>Character not found</p>`;
        }

        const { name, status, image, species, origin } = this.character;
        const { color = DEFAULT_STATUS_COLOR, label = status } = CHARACTER_STATUS_CONFIG[status] ?? {};

        return html`
        <article
            @click=${this._handleClick}
            @keydown=${this._handleKeydown}
            tabindex="0"
            role="button"
            aria-label="Ver detalles de ${name}"
        >
            <div class="media">
                <img src="${image}" alt="${name}" loading="lazy" />
                <button
                    class="favorite-btn ${this.isFavorite ? 'is-favorite' : ''}"
                    @click=${this._handleFavoriteClick}
                    aria-label="${this.isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}"
                    aria-pressed=${this.isFavorite}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
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
