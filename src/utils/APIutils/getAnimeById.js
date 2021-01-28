import fetchApi from "./fetchApi";

// A dynamic id query template

// Used when opening specific anime page

// Provides full info about specific anime including trailer url, description, and etc...
const getAnimeById = async id => {
    const query = `
        query ($id: Int) {
            Media (id: $id, type: ANIME) {
                title {
                    english
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
                }
                bannerImage

                characters {
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
                trailer {
                    id
                    site
                    thumbnail
                }
            }
        }
    `;
    return await fetchApi(query, { id });
};

export default getAnimeById;
