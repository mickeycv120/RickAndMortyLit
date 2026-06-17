import { css } from 'lit-element';

export const characterCardSkeletonStyles = css`
    :host {
        display: block;
        width: 100%;
        height: 100%;
    }

    article {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 16px;
        background: linear-gradient(165deg, #0a1628 0%, #050816 48%, #12061f 100%);
        border: 1px solid rgba(151, 206, 76, 0.2);
        box-shadow:
            0 0 0 1px rgba(68, 214, 44, 0.05),
            0 12px 32px rgba(0, 0, 0, 0.45);
    }

    .media,
    .line,
    .pill {
        position: relative;
        overflow: hidden;
        background: rgba(151, 206, 76, 0.06);
    }

    .media::after,
    .line::after,
    .pill::after {
        content: '';
        position: absolute;
        inset: 0;
        transform: translateX(-100%);
        background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(151, 206, 76, 0.12) 45%,
            rgba(125, 255, 141, 0.2) 50%,
            rgba(151, 206, 76, 0.12) 55%,
            transparent 100%
        );
        animation: shimmer 1.4s ease-in-out infinite;
    }

    .media {
        flex-shrink: 0;
        height: 280px;
    }

    .content {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 0.875rem;
        padding: 1.25rem 1.25rem 1.5rem;
    }

    .line {
        height: 1.15rem;
        border-radius: 999px;
    }

    .line.title {
        width: 72%;
        height: 1.35rem;
    }

    .meta {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .pill {
        width: 42%;
        height: 1.75rem;
        border-radius: 999px;
    }

    .pill.wide {
        width: 58%;
    }

    .status {
        width: 34%;
        height: 1.85rem;
        margin-top: auto;
        border-radius: 999px;
    }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
`;
