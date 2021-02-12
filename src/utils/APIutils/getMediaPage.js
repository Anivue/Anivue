import fetchApi from "./fetchApi";

//* Anime page template (page means that there will be many anime objects in return).
const getMediaPage = async variables => {
    variables.type = variables.type.toUpperCase();
    // Check if specific argument provided, pass it in query if yes, otherwise ignore
    // 'SORT' ARGUMENT
    const sortArgument = "sortBy" in variables ? "$sortBy: [MediaSort]," : "";
    const sortVar = sortArgument ? "sort: $sortBy," : "sort: FAVOURITES_DESC";

    // 'SEARCH BY TITLE' ARGUMENT
    const searchArgument = "title" in variables ? "$title: String," : "";
    const searchVar = searchArgument ? "search: $title," : "";

    //* THESE ARGUMENTS CAN BE USED TOGETHER FOR SOME CASES

    const query = `
        query (${sortArgument} ${searchArgument} $type: MediaType $pageNumber: Int, $perPage: Int) {
            Page (page: $pageNumber, perPage: $perPage) {
                pageInfo {
                    total
                    currentPage
                    hasNextPage
                }
                media (${searchVar} ${sortVar} type: $type, isAdult: false) {
                    id
                    type
                    title {
                        english
                        romaji
                    }
                    coverImage {
                        medium
                        large
                        extraLarge
                        color
                    } 
                }
            }
        }
    `;

    // Passing this generated query to api request template
    return await fetchApi(query, variables);
};

export default getMediaPage;
