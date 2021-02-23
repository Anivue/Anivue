import fetchApiWithToken from "./fetchApiWithToken";

const nodes = {
    mediaNode: `
        nodes {
            id
            title {
                romaji
                english
            }
            type
            coverImage {
                medium
                extraLarge
            }
        }
    `,
    characterNode: `
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

const getAuthedUser = async (token) => {
    const query = `
        query {
            Viewer {
                id
                name
                favourites {
                    anime(page: 1, perPage: 50) {
                        ${nodes.mediaNode}
                    }
                    manga(page: 1, perPage: 50) {
                        ${nodes.mediaNode}
                    }
                    characters(page: 1, perPage: 50) {
                        ${nodes.characterNode}
                    }
                }
                avatar {
                    large
                    medium
                }
                bannerImage
                about(asHtml: true)
            }
        }
    `;

    return await fetchApiWithToken(token, query);
};

export default getAuthedUser;
