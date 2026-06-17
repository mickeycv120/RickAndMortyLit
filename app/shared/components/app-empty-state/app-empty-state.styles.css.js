import { css } from 'lit-element';

export const appEmptyStateStyles = css`
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.25rem;
        padding: 3rem 2rem;
        color: rgba(207, 233, 255, 0.55);
        text-align: center;
    }

    img {
        width: 180px;
        height: auto;
        opacity: 0.85;
        filter: drop-shadow(0 0 16px rgba(151, 206, 76, 0.2));
    }

    p {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.6;
    }
`;
