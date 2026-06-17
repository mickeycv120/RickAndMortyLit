import { css } from 'lit-element';

export const characterListStyles = css`
    :host {
        display: block;
    }

    .character-list {
        display: grid;
        width: 100%;
        row-gap: 1.5rem;
        column-gap: 1.5rem;
        align-items: stretch;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    }

    .character-list > character-card,
    .character-list > character-card-skeleton {
        display: block;
        height: 100%;
    }

    .character-list.is-loading {
        pointer-events: none;
    }

    .character-list-error {
        grid-column: 1 / -1;
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

    .character-list-error--banner {
        margin-bottom: 1rem;
    }

    .character-list-error p {
        margin: 0;
        line-height: 1.5;
    }

    .character-list-error button {
        min-height: 40px;
        padding: 0.5rem 1.25rem;
        border: 1px solid rgba(151, 206, 76, 0.45);
        border-radius: 999px;
        background: rgba(151, 206, 76, 0.12);
        color: #f4f8ff;
        font-weight: 600;
        cursor: pointer;
    }

    .character-list-error button:hover {
        background: rgba(151, 206, 76, 0.2);
    }
`;
