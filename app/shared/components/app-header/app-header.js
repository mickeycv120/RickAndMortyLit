import { LitElement, html } from 'lit-element';
import { appHeaderStyles } from './app-header.styles.css.js';
import { debounce } from '../../utils/debounce.js';
import { favoritesStore, FAVORITES_CHANGED_EVENT } from '../../../core/stores/favorites.store.js';

const SEARCH_DEBOUNCE_MS = 350;

export class AppHeader extends LitElement {
    static styles = [appHeaderStyles];

    static properties = {
        showFavoritesOnly: { type: Boolean },
        favoritesCount: { type: Number },
    };

    constructor() {
        super();
        this.showFavoritesOnly = false;
        this.favoritesCount = favoritesStore.count;
        this._onFavoritesChanged = this._onFavoritesChanged.bind(this);
        this._dispatchSearch = debounce((query) => {
            this.dispatchEvent(
                new CustomEvent('search-change', {
                    detail: { query },
                    bubbles: true,
                    composed: true,
                })
            );
        }, SEARCH_DEBOUNCE_MS);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener(FAVORITES_CHANGED_EVENT, this._onFavoritesChanged);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener(FAVORITES_CHANGED_EVENT, this._onFavoritesChanged);
    }

    _onFavoritesChanged() {
        this.favoritesCount = favoritesStore.count;
    }

    _handleSearchInput(event) {
        this._dispatchSearch(event.target.value.trim());
    }

    _handleFavoritesToggle() {
        this.showFavoritesOnly = !this.showFavoritesOnly;
        this.dispatchEvent(
            new CustomEvent('favorites-filter-change', {
                detail: { active: this.showFavoritesOnly },
                bubbles: true,
                composed: true,
            })
        );
    }

    render() {
        return html`
            <nav>
                <div class="nav-brand">
                    <img src="/assets/navbarIcon.png" alt="" class="nav-icon" />
                    <span class="nav-title">Rick and Morty</span>
                </div>

                <div class="nav-search">
                    <label class="search-wrapper">
                        <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="11" cy="11" r="7" />
                            <path d="M20 20l-4-4" />
                        </svg>
                        <input
                            type="search"
                            placeholder="Buscar personajes..."
                            class="search-input"
                            aria-label="Buscar personajes"
                            @input=${this._handleSearchInput}
                        />
                    </label>
                </div>

                <div class="nav-actions">
                    <button
                        class="favorites-btn ${this.showFavoritesOnly ? 'is-active' : ''}"
                        @click=${this._handleFavoritesToggle}
                        aria-label="${this.showFavoritesOnly ? 'Ver todos los personajes' : 'Ver favoritos'}"
                        aria-pressed=${this.showFavoritesOnly}
                    >
                        <svg class="heart-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        ${this.favoritesCount > 0
                            ? html`<span class="favorites-badge" aria-label="${this.favoritesCount} favoritos">${this.favoritesCount}</span>`
                            : ''}
                    </button>
                </div>
            </nav>
        `;
    }
}

customElements.define('app-header', AppHeader);
