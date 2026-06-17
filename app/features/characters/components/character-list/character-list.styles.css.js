import { css } from 'lit-element';

export const characterListStyles = css`
    :host {
        display: block;
    }

    .character-list {
        display: grid;
        width: 100%;
        margin-bottom: 2rem;
        margin-top: 2rem;
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

    .character-list > app-error,
    .character-list > app-empty-state {
        grid-column: 1 / -1;
    }
`;
