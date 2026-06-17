import { LitElement, html } from 'lit-element';
import { characterCardSkeletonStyles } from './character-card-skeleton.styles.css.js';

export class CharacterCardSkeleton extends LitElement {
    static styles = [characterCardSkeletonStyles];

    render() {
        return html`
            <article aria-hidden="true">
                <div class="media"></div>
                <div class="content">
                    <div class="line title"></div>
                    <div class="meta">
                        <div class="pill"></div>
                        <div class="pill wide"></div>
                    </div>
                    <div class="pill status"></div>
                </div>
            </article>
        `;
    }
}

customElements.define('character-card-skeleton', CharacterCardSkeleton);
