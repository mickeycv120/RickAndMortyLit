import { css } from 'lit-element';

export const heroSectionStyles = css`
    :host {
        display: block;
    }

    .hero {
        display: flex;
        justify-content: center;
        padding: 2rem 0 1.5rem;
    }

    .hero-logo {
        width: min(100%, 420px);
        height: auto;
        filter: drop-shadow(0 0 16px rgba(151, 206, 76, 0.35));
    }
`;
