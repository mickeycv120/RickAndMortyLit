import { LitElement, html, css } from 'lit-element';
import './features/characters/components/character-list/character-list.js';
import './shared/components/app-header/app-header.js';
import './features/characters/components/hero-section/hero-section.js';

export class AppShell extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                padding-left: 20px;
                padding-right: 20px;
                padding-bottom: 20px;
            }
        `
    ];

    static properties = {
        searchQuery: { type: String },
        showFavoritesOnly: { type: Boolean },
    };

    constructor() {
        super();
        this.searchQuery = '';
        this.showFavoritesOnly = false;
    }

    _handleSearchChange(event) {
        this.searchQuery = event.detail.query;
    }

    _handleFavoritesFilterChange(event) {
        this.showFavoritesOnly = event.detail.active;
    }

    render() {
        return html`
            <header>
                <app-header
                    @search-change=${this._handleSearchChange}
                    @favorites-filter-change=${this._handleFavoritesFilterChange}
                ></app-header>
            </header>
            <main>
                <hero-section></hero-section>
                <character-list
                    .searchQuery=${this.searchQuery}
                    .showFavoritesOnly=${this.showFavoritesOnly}
                ></character-list>
            </main>
        `;
    }
}
customElements.define('app-shell', AppShell);
