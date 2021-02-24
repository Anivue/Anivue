import fetchApiWithToken from "./fetchApiWithToken";

function getType(type) {
    if (type === "anime") {
        return "animeId";
    } else if (type === "manga") {
        return "mangaId";
    } else if (type === "characters") {
        return "characterId";
    } else {
        console.error("Wrong type provided");
    }
}

const schemas = {
    media: `
        nodes {
            id
            title {
                romaji
                english
            }
            type
            coverImage {
                medium
                large
            }
        }
    `,
    characters: `
        nodes {
            id
            name {
                full
            }
            image {
                large
                medium
            }
        }
    `,
};

const toggleFavorite = async (token, type, id) => {
    const typeId = getType(type);

    const mutation = `
        mutation ($id: Int) {
            ToggleFavourite (${typeId}: $id) {
                ${type}(page: 1, perPage: 50) {
                    ${
                        type === "characters"
                            ? schemas.characters
                            : schemas.media
                    }
                }
            } 
        }
    `;

    const variables = {
        id,
    };

    return await fetchApiWithToken(token, mutation, variables);
};

export default toggleFavorite;
