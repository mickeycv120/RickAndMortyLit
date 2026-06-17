import { describe, it, expect } from 'vitest';
import { mapCharacter, mapCharacters, mapCharactersResponse } from './character.mapper.js';

describe('mapCharacter', () => {
    it('devuelve null si el input es null', () => {
        expect(mapCharacter(null)).toBeNull();
    });

    it('devuelve null si el input es undefined', () => {
        expect(mapCharacter(undefined)).toBeNull();
    });

    it('mapea todos los campos correctamente', () => {
        const apiCharacter = {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: 'Scientist',
            gender: 'Male',
            image: 'https://example.com/rick.png',
            origin: { name: 'Earth (C-137)' },
            location: { name: 'Citadel of Ricks' },
            episode: ['ep1', 'ep2', 'ep3'],
        };

        expect(mapCharacter(apiCharacter)).toEqual({
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: 'Scientist',
            gender: 'Male',
            image: 'https://example.com/rick.png',
            origin: 'Earth (C-137)',
            location: 'Citadel of Ricks',
            episodeCount: 3,
        });
    });

    it('usa cadena vacía como fallback cuando type y gender son null', () => {
        const apiCharacter = {
            id: 2,
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            type: null,
            gender: null,
            image: 'img.png',
            origin: { name: 'Earth' },
            location: { name: 'Earth' },
            episode: [],
        };

        const result = mapCharacter(apiCharacter);

        expect(result.type).toBe('');
        expect(result.gender).toBe('');
    });

    it('usa 0 como episodeCount cuando no hay episodios', () => {
        const apiCharacter = {
            id: 3,
            name: 'Beth Smith',
            status: 'Alive',
            species: 'Human',
            image: 'img.png',
        };

        expect(mapCharacter(apiCharacter).episodeCount).toBe(0);
    });

    it('extrae el nombre de origin y location como string', () => {
        const apiCharacter = {
            id: 4,
            name: 'Jerry Smith',
            status: 'Alive',
            species: 'Human',
            image: 'img.png',
            origin: { name: 'Testicle Monster Dimension' },
            location: { name: 'Earth (Replacement Dimension)' },
        };

        const result = mapCharacter(apiCharacter);

        expect(result.origin).toBe('Testicle Monster Dimension');
        expect(result.location).toBe('Earth (Replacement Dimension)');
    });
});

describe('mapCharacters', () => {
    it('devuelve un array vacío por defecto', () => {
        expect(mapCharacters()).toEqual([]);
    });

    it('filtra los resultados null o inválidos', () => {
        const input = [
            null,
            { id: 1, name: 'Rick', status: 'Alive', species: 'Human', image: '' },
        ];

        expect(mapCharacters(input)).toHaveLength(1);
    });

    it('mapea todos los personajes del array', () => {
        const input = [
            { id: 1, name: 'Rick', status: 'Alive', species: 'Human', image: '' },
            { id: 2, name: 'Morty', status: 'Alive', species: 'Human', image: '' },
        ];

        const result = mapCharacters(input);

        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('Rick');
        expect(result[1].name).toBe('Morty');
    });
});

describe('mapCharactersResponse', () => {
    it('maneja una respuesta null', () => {
        const result = mapCharactersResponse(null);

        expect(result.characters).toEqual([]);
        expect(result.currentPage).toBe(1);
        expect(result.totalPages).toBe(1);
        expect(result.hasNext).toBe(false);
        expect(result.hasPrev).toBe(false);
    });

    it('usa la página 1 por defecto', () => {
        const result = mapCharactersResponse({});

        expect(result.currentPage).toBe(1);
    });

    it('mapea correctamente la paginación', () => {
        const response = {
            results: [],
            info: { pages: 42, next: 'https://api.example.com?page=3', prev: null },
        };

        const result = mapCharactersResponse(response, 2);

        expect(result.currentPage).toBe(2);
        expect(result.totalPages).toBe(42);
        expect(result.hasNext).toBe(true);
        expect(result.hasPrev).toBe(false);
    });

    it('detecta hasPrev correctamente', () => {
        const response = {
            results: [],
            info: { pages: 5, next: null, prev: 'https://api.example.com?page=1' },
        };

        const result = mapCharactersResponse(response, 2);

        expect(result.hasNext).toBe(false);
        expect(result.hasPrev).toBe(true);
    });

    it('mapea los personajes de results', () => {
        const response = {
            results: [
                { id: 1, name: 'Rick', status: 'Alive', species: 'Human', image: '' },
            ],
            info: { pages: 1 },
        };

        const result = mapCharactersResponse(response, 1);

        expect(result.characters).toHaveLength(1);
        expect(result.characters[0].name).toBe('Rick');
    });
});
