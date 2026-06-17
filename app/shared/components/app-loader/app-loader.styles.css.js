import { css } from 'lit-element';

export const appLoaderStyles = css`
    :host {
        display: grid;
        grid-column: 1 / -1;
        width: 100%;
        row-gap: 1.5rem;
        column-gap: 1.5rem;
        align-items: stretch;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    }

    character-card-skeleton {
        display: block;
        height: 100%;
    }
`;
