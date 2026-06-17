import { LitElement, html } from 'lit-element';
import { characterPaginationStyles } from './character-pagination.styles.css.js';

const SIBLING_COUNT = 1;

function getVisiblePages(currentPage, totalPages) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const leftSibling = Math.max(currentPage - SIBLING_COUNT, 1);
    const rightSibling = Math.min(currentPage + SIBLING_COUNT, totalPages);
    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPages - 1;

    if (!showLeftEllipsis && showRightEllipsis) {
        const leftItemCount = 3 + SIBLING_COUNT * 2;
        const leftRange = Array.from({ length: leftItemCount }, (_, index) => index + 1);
        return [...leftRange, 'ellipsis', totalPages];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
        const rightItemCount = 3 + SIBLING_COUNT * 2;
        const rightRange = Array.from(
            { length: rightItemCount },
            (_, index) => totalPages - rightItemCount + index + 1
        );
        return [1, 'ellipsis', ...rightRange];
    }

    const middleRange = Array.from(
        { length: rightSibling - leftSibling + 1 },
        (_, index) => leftSibling + index
    );

    return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages];
}

export class CharacterPagination extends LitElement {
    static styles = [characterPaginationStyles];

    static properties = {
        currentPage: { type: Number },
        totalPages: { type: Number },
        hasNext: { type: Boolean },
        hasPrev: { type: Boolean },
        loading: { type: Boolean, reflect: true },
        pendingPage: {},
    };

    constructor() {
        super();
        this.currentPage = 1;
        this.totalPages = 1;
        this.hasNext = false;
        this.hasPrev = false;
        this.loading = false;
        this.pendingPage = null;
    }

    _isLoadingPage(page) {
        return this.loading && this.pendingPage === page;
    }

    _isActivePage(page) {
        return page === this.currentPage;
    }

    _dispatchPageChange(page) {
        if (page === this.currentPage) return;

        this.dispatchEvent(
            new CustomEvent('page-change', {
                detail: { page },
                bubbles: true,
                composed: true,
            })
        );
    }

    _handlePrev() {
        if (this.currentPage <= 1) return;
        this._dispatchPageChange(this.currentPage - 1);
    }

    _handleNext() {
        if (this.currentPage >= this.totalPages) return;
        this._dispatchPageChange(this.currentPage + 1);
    }

    _handlePageClick(page) {
        if (this._isActivePage(page) || this._isLoadingPage(page)) return;
        this._dispatchPageChange(page);
    }

    _renderPageItem(item) {
        if (item === 'ellipsis') {
            return html`<span class="pagination-ellipsis" aria-hidden="true">…</span>`;
        }

        const isActive = this._isActivePage(item);
        const isLoading = this._isLoadingPage(item);

        return html`
            <button
                class="pagination-page ${isActive ? 'is-active' : ''} ${isLoading ? 'is-loading' : ''}"
                @click=${() => this._handlePageClick(item)}
                ?disabled=${isActive}
                aria-label=${isLoading ? `Cargando página ${item}` : `Ir a la página ${item}`}
                aria-current=${isActive ? 'page' : 'false'}
                aria-busy=${isLoading}
            >
                ${item}
            </button>
        `;
    }

    render() {
        if (this.totalPages <= 1) return html``;

        const visiblePages = getVisiblePages(this.currentPage, this.totalPages);

        return html`
            <div class="progress-bar ${this.loading ? 'is-visible' : ''}" aria-hidden="true">
                <div class="progress-bar-track"></div>
            </div>

            <nav class="pagination" aria-label="Paginación de personajes">
                <button
                    class="pagination-button"
                    @click=${this._handlePrev}
                    ?disabled=${this.currentPage <= 1}
                    aria-label="Página anterior"
                >
                    <svg class="pagination-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Anterior
                </button>

                <div class="pagination-pages" role="list">
                    ${visiblePages.map((item) => this._renderPageItem(item))}
                </div>

                <button
                    class="pagination-button"
                    @click=${this._handleNext}
                    ?disabled=${this.currentPage >= this.totalPages}
                    aria-label="Página siguiente"
                >
                    Siguiente
                    <svg class="pagination-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </nav>
        `;
    }
}

customElements.define('character-pagination', CharacterPagination);
