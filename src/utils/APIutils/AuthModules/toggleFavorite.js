import fetchApiWithToken from "./fetchApiWithToken";

function getType(type) {
    if (type === "anime") {
        return "animeId";
    } else if (type === "manga") {
        return "mangaId";
    } else if (type === "characters" || type === "character") {
        return "characterId";
    } else {
        console.error("Wrong type provided");
    }
}

const schemas = {
    anime: `
        anime(page: 1, perPage: 1) {
            nodes {
                id
            }
        }
    `,
    manga: `
        manga(page: 1, perPage: 1) {
            nodes {
                id
            }
        }
    `,
    characters: `
        characters(page: 1, perPage: 1) {
            nodes {
                id
            }
        }
    `,
};

const toggleFavorite = async (token, type, id) => {
    const typeId = getType(type);

    const mutation = `
        mutation ($id: Int) {
            ToggleFavourite (${typeId}: $id) {
                ${schemas[type]}
            } 
        }
    `;

    const variables = {
        id,
    };

    return await fetchApiWithToken(token, mutation, variables);
};

export default toggleFavorite;
