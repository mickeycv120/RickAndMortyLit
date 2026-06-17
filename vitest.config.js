import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'happy-dom',
        include: ['app/**/*.spec.js'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            include: ['app/**/*.js'],
            exclude: ['app/**/*.styles.css.js', 'app/**/*.spec.js'],
        },
    },
});
