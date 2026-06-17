import { LitElement, html } from 'lit-element';
import { mapCharactersResponse } from '../../mappers/character.mapper.js';
import { getCharacters } from '../../services/character.service';
import { PAGINATION } from '../../../../core/constants/app.constants.js';
import '../character-card/character-card.js';
import '../character-card-skeleton/character-card-skeleton.js';
import '../character-pagination/character-pagination.js';
import '../character-modal/character-modal.js';
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
        this._loadRequestId = 0;
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

    async firstUpdated() {
        await this._loadPage(1);
    }

    async _loadPage(page) {
        const requestId = ++this._loadRequestId;

        this.loading = true;
        this.error = false;
        this.pendingPage = page;

        try {
            const response = await getCharacters(page);

            if (requestId !== this._loadRequestId) return;

            this._applyResponse(response, page);
        } catch (err) {
            if (requestId !== this._loadRequestId) return;

            this.error = true;
        } finally {
            if (requestId === this._loadRequestId) {
                this.loading = false;
                this.pendingPage = null;
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
            return Array.from(
                { length: this._getSkeletonCount() },
                () => html`<character-card-skeleton></character-card-skeleton>`
            );
        }

        return this.characters.map(
            (character) => html`<character-card .character=${character}></character-card>`
        );
    }

    _renderError() {
        return html`
            <div class="character-list-error" role="alert">
                <p>No se pudieron cargar los personajes. Por favor, inténtalo de nuevo.</p>
                <button @click=${this._handleRetry}>Reintentar</button>
            </div>
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
            <character-pagination
                .currentPage=${this.currentPage}
                .totalPages=${this.totalPages}
                .hasNext=${this.hasNext}
                .hasPrev=${this.hasPrev}
                .loading=${this.loading}
                .pendingPage=${this.pendingPage}
                @page-change=${this._handlePageChange}
            ></character-pagination>
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
