import { LitElement, html } from 'lit-element';
import { mapCharactersResponse, mapCharacters } from '../../mappers/character.mapper.js';
import { getCharacters, getCharactersByIds } from '../../services/character.service';
import { PAGINATION } from '../../../../core/constants/app.constants.js';
import { favoritesStore, FAVORITES_CHANGED_EVENT } from '../../../../core/stores/favorites.store.js';
import '../character-card/character-card.js';
import '../character-pagination/character-pagination.js';
import '../character-modal/character-modal.js';
import '../../../../shared/components/app-loader/app-loader.js';
import '../../../../shared/components/app-error/app-error.js';
import '../../../../shared/components/app-empty-state/app-empty-state.js';
import { characterListStyles } from './character-list.styles.css.js';

export class CharacterList extends LitElement {
    static styles = [characterListStyles];

    static properties = {
        characters: { type: Array },
        currentPage: { type: Number },
        totalPages: { type: Number },
        hasNext: { type: Boolean },
        hasPrev: { type: Boolean },
        loading: { type: Boolean },
        error: { type: Boolean },
        pendingPage: {},
        selectedCharacter: { type: Object },
        searchQuery: { type: String },
        showFavoritesOnly: { type: Boolean },
    };

    constructor() {
        super();
        this.characters = [];
        this.currentPage = 1;
        this.totalPages = 1;
        this.hasNext = false;
        this.hasPrev = false;
        this.loading = false;
        this.error = false;
        this.pendingPage = null;
        this.selectedCharacter = null;
        this.searchQuery = '';
        this.showFavoritesOnly = false;
        this._loadRequestId = 0;
        this._onFavoritesChanged = this._onFavoritesChanged.bind(this);
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
        if (this.showFavoritesOnly) {
            this.characters = this.characters.filter((c) => favoritesStore.isFavorite(c.id));
        }
    }

    updated(changedProperties) {
        const searchChanged = changedProperties.has('searchQuery') &&
            changedProperties.get('searchQuery') !== undefined;
        const favoritesFilterChanged = changedProperties.has('showFavoritesOnly') &&
            changedProperties.get('showFavoritesOnly') !== undefined;

        if (searchChanged || favoritesFilterChanged) {
            this._loadPage(1);
        }
    }

    _applyResponse(response, page) {
        const { characters, currentPage, totalPages, hasNext, hasPrev } =
            mapCharactersResponse(response, page);

        this.characters = characters;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.hasNext = hasNext;
        this.hasPrev = hasPrev;
    }

    _getSkeletonCount() {
        return this.characters.length || PAGINATION.DEFAULT_PAGE_SIZE;
    }

    _getEmptyMessage() {
        return this.showFavoritesOnly
            ? 'Aún no tienes personajes favoritos. ¡Marca alguno con el corazón!'
            : `No se encontraron personajes para "${this.searchQuery}".`;
    }

    async firstUpdated() {
        await this._loadPage(1);
    }

    async _loadPage(page) {
        if (this.showFavoritesOnly) {
            return this._loadFavorites();
        }

        const requestId = ++this._loadRequestId;

        this.loading = true;
        this.error = false;
        this.pendingPage = page;

        try {
            const response = await getCharacters(page, this.searchQuery);

            if (requestId !== this._loadRequestId) return;

            this._applyResponse(response, page);
        } catch (err) {
            if (requestId !== this._loadRequestId) return;

            if (err.response?.status === 404) {
                this.characters = [];
                this.currentPage = page;
                this.totalPages = 1;
                this.hasNext = false;
                this.hasPrev = false;
            } else {
                this.error = true;
            }
        } finally {
            if (requestId === this._loadRequestId) {
                this.loading = false;
                this.pendingPage = null;
            }
        }
    }

    async _loadFavorites() {
        const requestId = ++this._loadRequestId;

        this.loading = true;
        this.error = false;
        this.pendingPage = null;

        const ids = favoritesStore.getAll();

        if (!ids.length) {
            if (requestId === this._loadRequestId) {
                this.characters = [];
                this.currentPage = 1;
                this.totalPages = 1;
                this.hasNext = false;
                this.hasPrev = false;
                this.loading = false;
            }
            return;
        }

        try {
            const response = await getCharactersByIds(ids);

            if (requestId !== this._loadRequestId) return;

            const results = Array.isArray(response) ? response : [response];
            this.characters = mapCharacters(results);
            this.currentPage = 1;
            this.totalPages = 1;
            this.hasNext = false;
            this.hasPrev = false;
        } catch (err) {
            if (requestId !== this._loadRequestId) return;
            this.error = true;
        } finally {
            if (requestId === this._loadRequestId) {
                this.loading = false;
            }
        }
    }

    _handleRetry() {
        this._loadPage(this.currentPage);
    }

    _handleCharacterSelect(event) {
        this.selectedCharacter = event.detail.character;
    }

    _handleModalClose() {
        this.selectedCharacter = null;
    }

    _renderCharacters() {
        if (this.loading) {
            return html`<app-loader .count=${this._getSkeletonCount()}></app-loader>`;
        }

        if (!this.characters.length) {
            return html`<app-empty-state .message=${this._getEmptyMessage()}></app-empty-state>`;
        }

        return this.characters.map(
            (character) => html`<character-card .character=${character}></character-card>`
        );
    }

    _renderError() {
        return html`
            <app-error
                message="No se pudieron cargar los personajes. Por favor, inténtalo de nuevo."
                @retry=${this._handleRetry}
            ></app-error>
        `;
    }

    render() {
        return html`
            ${this.selectedCharacter
                ? html`<character-modal
                      .character=${this.selectedCharacter}
                      @modal-close=${this._handleModalClose}
                  ></character-modal>`
                : ''}
            <section
                class="character-list ${this.loading ? 'is-loading' : ''}"
                aria-busy=${this.loading}
                aria-live="polite"
                @character-select=${this._handleCharacterSelect}
            >
                ${this.error ? this._renderError() : this._renderCharacters()}
            </section>
            ${!this.showFavoritesOnly
                ? html`<character-pagination
                      .currentPage=${this.currentPage}
                      .totalPages=${this.totalPages}
                      .hasNext=${this.hasNext}
                      .hasPrev=${this.hasPrev}
                      .loading=${this.loading}
                      .pendingPage=${this.pendingPage}
                      @page-change=${this._handlePageChange}
                  ></character-pagination>`
                : ''}
        `;
    }

    _handlePageChange(event) {
        const { page } = event.detail;

        if (page === this.currentPage) return;
        if (page === this.pendingPage && this.loading) return;

        this._loadPage(page);
    }
}
customElements.define('character-list', CharacterList);
