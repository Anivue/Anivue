import fetchApi from "./fetchApi";

const getCharacterById = async id => {
    const query = `
        query ($id: Int) {
            Character (id: $id) {
                name {
                    first
                    last
                    native
                }
                image {
                    medium
                    large
                }
                description (asHtml: true)
                media (page: 1, perPage: 25, sort: FAVOURITES_DESC) {
                    nodes {
                        id
                        title {
                            romaji
                            english
                        }
                        coverImage {
                            medium
                            large
                            color
                        }
                    }
                }
            }
        }
    `;
    return await fetchApi(query, { id });
};

export default getCharacterById;
