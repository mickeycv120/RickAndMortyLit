import { LitElement, html} from 'lit-element';
import { navbarStyles } from './navbar.styles.css.js';

export class Navbar extends LitElement {
    static styles = [navbarStyles];

    render() {
        return html`
        <nav>
            <div class="nav-brand">
                <img src="/assets/navbarIcon.png" alt="Rick and Morty" class="nav-icon" />
                <span>Rick and Morty</span>
            </div>
            <button class="favorites-btn" aria-label="Favorites">
                <svg class="heart-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
        </nav>
        `;
    }
}
customElements.define('navbar-component', Navbar);
