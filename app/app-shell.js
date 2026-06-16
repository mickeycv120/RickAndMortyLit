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
        `;
    }
}
customElements.define('app-shell', AppShell);
