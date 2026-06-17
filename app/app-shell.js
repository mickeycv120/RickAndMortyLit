import { LitElement, html, css } from 'lit-element';
import './features/characters/components/character-list/character-list.js';
import './features/characters/components/navbar/navbar.js';

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
            <h1>Rick and Morty Characters</h1>
            <character-list></character-list>
        </main>
        `;
    }
}
customElements.define('app-shell', AppShell);
