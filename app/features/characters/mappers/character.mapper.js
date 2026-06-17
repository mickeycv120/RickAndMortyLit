export function mapCharacter(apiCharacter) {
    if (!apiCharacter) {
        return null;
    }

    return {
        id: apiCharacter.id,
        name: apiCharacter.name,
        status: apiCharacter.status,
        species: apiCharacter.species,
        type: apiCharacter.type ?? '',
        gender: apiCharacter.gender ?? '',
        image: apiCharacter.image,
        origin: apiCharacter.origin?.name ?? apiCharacter.origin,
        location: apiCharacter.location?.name ?? apiCharacter.location,
        episodeCount: apiCharacter.episode?.length ?? 0,
    };
}

export function mapCharacters(apiCharacters = []) {
    return apiCharacters.map(mapCharacter).filter(Boolean);
}

export function mapCharactersResponse(apiResponse, page = 1) {
    const { results = [], info = {} } = apiResponse ?? {};

    return {
        characters: mapCharacters(results),
        currentPage: page,
        totalPages: info.pages ?? 1,
        hasNext: Boolean(info.next),
        hasPrev: Boolean(info.prev),
    };
}
