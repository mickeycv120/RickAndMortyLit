import { LitElement, html } from 'lit-element';
import { heroSectionStyles } from './hero-section.css.js';

export class HeroSection extends LitElement {
    static styles = [heroSectionStyles];

    render() {
        return html`
            <section class="hero">
                <img
                    src="/assets/Rick_and_Morty.svg"
                    alt="Rick and Morty"
                    class="hero-logo"
                />
            </section>
        `;
    }
}
customElements.define('hero-section', HeroSection);
