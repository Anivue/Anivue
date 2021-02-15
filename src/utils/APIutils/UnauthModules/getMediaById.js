import fetchApi from "./fetchApi";

// A dynamic id query template

// Used when opening specific anime page

// Provides full info about specific anime including trailer url, description, and etc...
const getMediaById = async (type, id) => {
    const query = `
        query ($id: Int, $type: MediaType) {
            Media (id: $id, type: $type) {
                title {
                    english
                    romaji
                    native
                }
                status
                startDate {
                    year
                }
                type
                genres
                episodes
                chapters
                duration
                status
                nextAiringEpisode {
                    airingAt
                }
                relations {
                    nodes {
                        id
                        type
                        title {
                            english
                            romaji
                        }
                        coverImage {
                            extraLarge
                            medium
                            large
                            color
                        } 
                    }
                }
                description (asHtml: true)
                startDate {
                    day
                    month
                    year
                }
                endDate {
                    day
                    month
                    year
                }

                coverImage {
                    extraLarge
                    medium
                    color
                }
                bannerImage
                averageScore
                characters(sort: FAVOURITES_DESC) {
                    nodes {
                        name {
                            first
                            last
                        }
                        image {
                            medium
                            large
                        }
                        id
                    }
                }
                streamingEpisodes {
                    title
                    thumbnail
                    url
                }
            }
        }
    `;
    type = type.toUpperCase();
    return await fetchApi(query, { id, type });
};

export default getMediaById;
