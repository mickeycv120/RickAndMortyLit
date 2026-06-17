import { css } from 'lit-element';

export const characterModalStyles = css`
    :host {
        display: block;
    }

    .backdrop {
        position: fixed;
        inset: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: rgba(2, 3, 10, 0.75);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        animation: backdrop-in 0.2s ease forwards;
    }

    @keyframes backdrop-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .modal {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 100%;
        max-width: 680px;
        max-height: calc(100dvh - 2rem);
        overflow: hidden;
        border-radius: 20px;
        background: linear-gradient(165deg, #0a1628 0%, #050816 48%, #12061f 100%);
        border: 1px solid rgba(151, 206, 76, 0.35);
        box-shadow:
            0 0 0 1px rgba(68, 214, 44, 0.1),
            0 24px 64px rgba(0, 0, 0, 0.7),
            0 0 48px rgba(151, 206, 76, 0.15);
        animation: modal-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    @keyframes modal-in {
        from { opacity: 0; transform: scale(0.92) translateY(24px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .modal-close {
        position: absolute;
        top: 0.875rem;
        right: 0.875rem;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        padding: 0;
        border: 1px solid rgba(151, 206, 76, 0.3);
        border-radius: 50%;
        background: rgba(10, 22, 40, 0.85);
        color: #cfe9ff;
        cursor: pointer;
        transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    }

    .modal-close:hover {
        background: rgba(151, 206, 76, 0.15);
        border-color: rgba(151, 206, 76, 0.7);
        color: #f4f8ff;
    }

    .modal-close:focus-visible {
        outline: 2px solid rgba(151, 206, 76, 0.8);
        outline-offset: 2px;
    }

    .modal-close svg {
        width: 18px;
        height: 18px;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
        stroke-linecap: round;
    }

    .modal-image {
        flex-shrink: 0;
        width: 220px;
        align-self: stretch;
        overflow: hidden;
    }

    .modal-image img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        filter: saturate(1.1) contrast(1.05);
    }

    .modal-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1.75rem 1.5rem 1.75rem;
        overflow-y: auto;
        min-width: 0;
    }

    .modal-name {
        margin: 0 2rem 0.625rem 0;
        font-size: 1.35rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        line-height: 1.3;
        color: #f4f8ff;
        text-shadow: 0 0 16px rgba(151, 206, 76, 0.4);
        word-break: break-word;
    }

    .modal-status {
        display: inline-flex;
        align-items: center;
        align-self: flex-start;
        gap: 0.4rem;
        margin-bottom: 1.5rem;
        padding: 0.35rem 0.75rem;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.35);
        border: 1px solid currentColor;
        box-shadow: 0 0 12px color-mix(in srgb, currentColor 40%, transparent);
    }

    .modal-status::before {
        content: '';
        flex-shrink: 0;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: currentColor;
        box-shadow: 0 0 8px currentColor;
    }

    .modal-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.875rem 1rem;
        margin: 0;
    }

    .detail-item {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        min-width: 0;
    }

    .detail-item dt {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(207, 233, 255, 0.5);
    }

    .detail-item dd {
        margin: 0;
        font-size: 0.875rem;
        font-weight: 500;
        color: #cfe9ff;
        word-break: break-word;
    }

    .detail-item--full {
        grid-column: 1 / -1;
    }

    @media (max-width: 540px) {
        .modal {
            flex-direction: column;
            max-height: calc(100dvh - 2rem);
        }

        .modal-image {
            width: 100%;
            height: 220px;
        }

        .modal-details {
            grid-template-columns: 1fr;
        }

        .detail-item--full {
            grid-column: auto;
        }
    }
`;
