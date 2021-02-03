import fetchApi from "./fetchApi";

// A dynamic id query template

// Used when opening specific anime page

// Provides full info about specific anime including trailer url, description, and etc...
const getMediaById = async (type, id) => {
    const query = `
        query ($id: Int, $type: MediaType) {
            Media (id: $id, type: $type) {
                title {
                    english,
                    romaji
                }
                genres
                episodes
                duration
                status
                nextAiringEpisode {
                    airingAt
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
                    large
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
                        }
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
