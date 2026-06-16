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
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
`;
