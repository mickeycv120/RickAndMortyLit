import { css } from 'lit-element';

export const appEmptyStateStyles = css`
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem 2rem;
        color: rgba(207, 233, 255, 0.55);
        text-align: center;
    }

    p {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.6;
    }
`;
