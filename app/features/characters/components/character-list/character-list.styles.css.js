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

    .character-list > character-card {
        display: block;
        height: 100%;
    }
`;
