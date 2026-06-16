import { css } from 'lit-element';

export const characterCardStyles = css`
    :host {
        display: block;
        width: 100%;
    }

    article {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        background: #050816;
    }

    img {
        display: block;
        width: 100%;
        height: 320px;
        object-fit: cover;
    }

    .content {
        padding: 1rem;
    }

    h3 {
        margin: 0 0 1rem;
    }

    p {
        display: flex;
        gap: 0.5rem;
        margin: 0 0 1rem;
    }
`;
