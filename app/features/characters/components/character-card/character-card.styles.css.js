import { css } from 'lit-element';

export const characterCardStyles = css`
    :host {
        display: block;
        width: 100%;
        height: 100%;
    }

    article {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 16px;
        background: linear-gradient(165deg, #0a1628 0%, #050816 48%, #12061f 100%);
        border: 1px solid rgba(151, 206, 76, 0.35);
        box-shadow:
            0 0 0 1px rgba(68, 214, 44, 0.08),
            0 12px 32px rgba(0, 0, 0, 0.55),
            0 0 24px rgba(151, 206, 76, 0.1);
        transition:
            transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.3s ease,
            border-color 0.3s ease;
    }

    article:hover {
        transform: translateY(-6px) scale(1.02);
        border-color: rgba(151, 206, 76, 0.65);
        box-shadow:
            0 0 0 1px rgba(68, 214, 44, 0.2),
            0 20px 48px rgba(0, 0, 0, 0.65),
            0 0 40px rgba(151, 206, 76, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }

    article::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        z-index: 2;
    }

    .media {
        flex-shrink: 0;
        height: 280px;
        overflow: hidden;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        filter: saturate(1.1) contrast(1.05);
        transition: transform 0.4s ease, filter 0.3s ease;
    }

    article:hover img {
        transform: scale(1.06);
        filter: saturate(1.2) contrast(1.1) brightness(1.05);
    }

    .content {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 1.25rem 1.25rem 1.5rem;
        background: linear-gradient(
            180deg,
            rgba(5, 8, 22, 0.35) 0%,
            rgba(5, 8, 22, 0.95) 100%
        );
    }

    .content::before {
        content: '';
        position: absolute;
        top: -48px;
        left: 0;
        right: 0;
        height: 48px;
        background: linear-gradient(to bottom, transparent, rgba(5, 8, 22, 0.92));
        pointer-events: none;
    }

    h3 {
        margin: 0 0 0.75rem;
        font-size: 1.15rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        line-height: 1.3;
        color: #f4f8ff;
        text-shadow: 0 0 12px rgba(151, 206, 76, 0.35);
        word-break: break-word;
    }

    .meta {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        margin: 0 0 1rem;
    }

    .meta span {
        display: inline-block;
        max-width: 100%;
        padding: 0.35rem 0.75rem;
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.04em;
        line-height: 1.4;
        text-transform: uppercase;
        color: #cfe9ff;
        background: rgba(151, 206, 76, 0.1);
        border: 1px solid rgba(151, 206, 76, 0.25);
        border-radius: 999px;
        word-break: break-word;
    }

    .status {
        display: inline-flex;
        align-items: center;
        align-self: flex-start;
        gap: 0.4rem;
        margin-top: auto;
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

    .status::before {
        content: '';
        flex-shrink: 0;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: currentColor;
        box-shadow: 0 0 8px currentColor;
    }
`;
