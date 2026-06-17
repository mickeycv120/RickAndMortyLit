import { css } from 'lit-element';

export const navbarStyles = css`
    :host {
        display: block;
    }

    nav {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: 1rem 1.5rem;
        padding: 0.875rem 0;
        border-bottom: 1px solid rgba(151, 206, 76, 0.25);
    }

    .nav-brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-width: 0;
    }

    .nav-icon {
        flex-shrink: 0;
        width: 44px;
        height: 44px;
        filter: drop-shadow(0 0 8px rgba(151, 206, 76, 0.4));
    }

    .nav-title {
        font-size: 1.1rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        color: #f4f8ff;
        text-shadow: 0 0 12px rgba(151, 206, 76, 0.35);
        white-space: nowrap;
    }

    .nav-search {
        display: flex;
        justify-content: center;
        width: 100%;
        max-width: 420px;
        margin: 0 auto;
    }

    .search-wrapper {
        position: relative;
        display: block;
        width: 100%;
    }

    .search-icon {
        position: absolute;
        top: 50%;
        left: 0.875rem;
        width: 18px;
        height: 18px;
        transform: translateY(-50%);
        fill: none;
        stroke: rgba(151, 206, 76, 0.75);
        stroke-width: 2;
        stroke-linecap: round;
        pointer-events: none;
    }

    .search-input {
        width: 100%;
        min-height: 44px;
        padding: 0.625rem 1rem 0.625rem 2.75rem;
        border: 1px solid rgba(151, 206, 76, 0.35);
        border-radius: 999px;
        background: #0a1628;
        color: #f4f8ff;
        font-size: 0.95rem;
        outline: none;
        transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            background-color 0.2s ease;
    }

    .search-input::placeholder {
        color: rgba(244, 248, 255, 0.5);
    }

    .search-input:hover {
        border-color: rgba(151, 206, 76, 0.5);
    }

    .search-input:focus {
        border-color: rgba(151, 206, 76, 0.75);
        background: #0d1c33;
        box-shadow: 0 0 0 3px rgba(151, 206, 76, 0.15);
    }

    .nav-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
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
        box-shadow: 0 0 16px rgba(151, 206, 76, 0.25);
    }

    .favorites-btn:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(151, 206, 76, 0.25);
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

    @media (max-width: 640px) {
        nav {
            grid-template-columns: auto 1fr auto;
            gap: 0.75rem;
        }

        .nav-title {
            display: none;
        }

        .nav-icon {
            width: 38px;
            height: 38px;
        }

        .nav-search {
            max-width: none;
        }

        .search-input {
            min-height: 40px;
            font-size: 0.875rem;
        }
    }
`;
