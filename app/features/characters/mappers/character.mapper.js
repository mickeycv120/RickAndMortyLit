export function mapCharacter(apiCharacter) {
    if (!apiCharacter) {
        return null;
    }

    return {
        id: apiCharacter.id,
        name: apiCharacter.name,
        status: apiCharacter.status,
        species: apiCharacter.species,
        image: apiCharacter.image,
        origin: apiCharacter.origin?.name ?? apiCharacter.origin,
    };
}
