import { css } from 'lit-element';

export const characterPaginationStyles = css`
    :host {
        display: block;
        position: relative;
    }

    .progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        overflow: hidden;
        border-radius: 999px;
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    .progress-bar.is-visible {
        opacity: 1;
    }

    .progress-bar-track {
        width: 40%;
        height: 100%;
        border-radius: 999px;
        background: linear-gradient(90deg, transparent, #7dff8d, #97ce4c, transparent);
        animation: slide 1.2s ease-in-out infinite;
    }

    @keyframes slide {
        0%   { transform: translateX(-200%); }
        100% { transform: translateX(400%); }
    }

    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.875rem 1rem;
        margin-top: 0.5rem;
        padding: 2rem 0 0.5rem;
        border-top: 1px solid rgba(151, 206, 76, 0.25);
    }

    .pagination-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        min-height: 44px;
        padding: 0.625rem 1.25rem;
        border: 1px solid rgba(151, 206, 76, 0.35);
        border-radius: 999px;
        background: rgba(151, 206, 76, 0.08);
        color: #f4f8ff;
        font-size: 0.9rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        cursor: pointer;
        transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            background-color 0.2s ease,
            box-shadow 0.2s ease,
            color 0.2s ease;
    }

    .pagination-button:hover {
        transform: translateY(-1px);
        border-color: rgba(151, 206, 76, 0.65);
        background-color: rgba(151, 206, 76, 0.15);
        box-shadow: 0 0 16px rgba(151, 206, 76, 0.25);
        color: #7dff8d;
    }

    .pagination-button:focus-visible,
    .pagination-page:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(151, 206, 76, 0.25);
    }

    .pagination-button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    .pagination-icon {
        width: 16px;
        height: 16px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        filter: drop-shadow(0 0 6px rgba(151, 206, 76, 0.45));
    }

    .pagination-pages {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 100%;
        overflow-x: auto;
        padding: 0.25rem;
        scrollbar-width: thin;
        scrollbar-color: rgba(151, 206, 76, 0.35) transparent;
    }

    .pagination-page {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        min-width: 44px;
        min-height: 44px;
        padding: 0 0.5rem;
        border: 1px solid rgba(151, 206, 76, 0.25);
        border-radius: 999px;
        background: rgba(151, 206, 76, 0.06);
        color: #cfe9ff;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            background-color 0.2s ease,
            box-shadow 0.2s ease,
            color 0.2s ease;
    }

    .pagination-page:hover:not(:disabled):not(.is-active):not(.is-loading) {
        transform: translateY(-1px);
        border-color: rgba(151, 206, 76, 0.55);
        background-color: rgba(151, 206, 76, 0.12);
        color: #f4f8ff;
    }

    .pagination-page:disabled {
        cursor: default;
    }

    .pagination-page.is-active {
        border-color: rgba(151, 206, 76, 0.75);
        background: rgba(151, 206, 76, 0.18);
        color: #f4f8ff;
        box-shadow: 0 0 16px rgba(151, 206, 76, 0.25);
        text-shadow: 0 0 12px rgba(151, 206, 76, 0.35);
        cursor: default;
    }

    /* Anillo giratorio sobre la página que está cargando */
    .pagination-page.is-loading {
        color: #7dff8d;
        border-color: rgba(151, 206, 76, 0.4);
        background: rgba(151, 206, 76, 0.1);
        cursor: wait;
        pointer-events: none;
    }

    .pagination-page.is-loading::before {
        content: '';
        position: absolute;
        inset: -3px;
        border-radius: 999px;
        border: 2px solid transparent;
        border-top-color: #97ce4c;
        border-right-color: rgba(151, 206, 76, 0.4);
        animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .pagination-ellipsis {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.5rem;
        color: rgba(207, 233, 255, 0.55);
        font-size: 0.95rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        user-select: none;
    }

    @media (max-width: 640px) {
        .pagination {
            gap: 0.75rem;
            padding-top: 1.5rem;
        }

        .pagination-button {
            min-height: 40px;
            padding: 0.5rem 1rem;
            font-size: 0.825rem;
        }

        .pagination-page {
            min-width: 40px;
            min-height: 40px;
            font-size: 0.8rem;
        }
    }
`;
