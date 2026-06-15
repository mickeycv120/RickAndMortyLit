import { LitElement, html, css } from 'lit-element';

export class AppShell extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`
        <h1>App Shell</h1>
        `;
    }
}
customElements.define('app-shell', AppShell);
