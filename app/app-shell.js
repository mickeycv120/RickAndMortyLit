import { LitElement, html, css } from 'lit-element';
import './features/characters/components/character-list/character-list.js';
import './features/characters/components/navbar/navbar.js';
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

    render() {
        return html`
         <header>
            <navbar-component></navbar-component>
        </header>
        <main>
            <hero-section></hero-section>
            <character-list></character-list>
        </main>
        `;
    }
}
customElements.define('app-shell', AppShell);
