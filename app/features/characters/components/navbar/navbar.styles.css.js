import { css } from 'lit-element';

export const navbarStyles = css`
    :host {
        display: block;
    }

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 0;
        border-bottom: 1px solid rgba(151, 206, 76, 0.25);
    }

    .nav-brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .nav-icon {
        width: 50px;
        height: 50px;
        filter: drop-shadow(0 0 8px rgba(151, 206, 76, 0.4));
    }

    .nav-brand span {
        font-size: 1.25rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        color: #f4f8ff;
        text-shadow: 0 0 12px rgba(151, 206, 76, 0.35);
    }

    .favorites-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        padding: 0;
        border: 1px solid rgba(151, 206, 76, 0.35);
        border-radius: 50%;
        background: rgba(151, 206, 76, 0.08);
        cursor: pointer;
        transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            background-color 0.2s ease,
            box-shadow 0.2s ease;
    }

    .favorites-btn:hover {
        transform: scale(1.05);
        border-color: rgba(151, 206, 76, 0.65);
        background-color: rgba(151, 206, 76, 0.15);
        box-shadow:
            0 0 16px rgba(151, 206, 76, 0.25),
            inset 0 0 12px rgba(151, 206, 76, 0.08);
    }

    .heart-icon {
        width: 22px;
        height: 22px;
        fill: rgba(151, 206, 76, 0.2);
        stroke: #97ce4c;
        stroke-width: 1.5;
        filter: drop-shadow(0 0 6px rgba(151, 206, 76, 0.5));
        transition:
            fill 0.2s ease,
            stroke 0.2s ease,
            filter 0.2s ease;
    }

    .favorites-btn:hover .heart-icon {
        fill: rgba(125, 255, 141, 0.35);
        stroke: #7dff8d;
        filter: drop-shadow(0 0 10px rgba(125, 255, 141, 0.6));
    }
`;
