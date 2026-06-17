import { css } from 'lit-element';

export const appErrorStyles = css`
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem;
        border: 1px solid rgba(255, 107, 125, 0.35);
        border-radius: 12px;
        background: rgba(255, 107, 125, 0.08);
        color: #f4f8ff;
        text-align: center;
    }

    p {
        margin: 0;
        line-height: 1.5;
    }

    button {
        min-height: 40px;
        padding: 0.5rem 1.25rem;
        border: 1px solid rgba(151, 206, 76, 0.45);
        border-radius: 999px;
        background: rgba(151, 206, 76, 0.12);
        color: #f4f8ff;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    button:hover {
        background: rgba(151, 206, 76, 0.2);
    }

    button:focus-visible {
        outline: 2px solid rgba(151, 206, 76, 0.7);
        outline-offset: 2px;
    }
`;
