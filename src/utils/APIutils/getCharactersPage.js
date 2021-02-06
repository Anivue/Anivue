import fetchApi from "./fetchApi";

//* Anime page template (page means that there will be many anime objects in return).
const getCharactersPage = async variables => {
    // Check if specific argument provided, pass it in query if yes, otherwise ignore

    // 'SEARCH BY TITLE' ARGUMENT
    const searchArgument = "title" in variables ? "$title: String," : "";
    const searchVar = searchArgument ? "search: $title," : "";

    //* THESE ARGUMENTS CAN BE USED TOGETHER FOR SOME CASES

    const query = `
        query (${searchArgument} $pageNumber: Int, $perPage: Int) {
            Page (page: $pageNumber, perPage: $perPage) {
                pageInfo {
                    total
                    currentPage
                    hasNextPage
                }
                characters (${searchVar} sort: FAVOURITES_DESC) {
                    id
                    name {
                        first
                        last
                    }
                    image {
                        medium
                        large
                    }
                }
            }
        }
    `;

    // Passing this generated query to api request template
    return await fetchApi(query, variables);
};

export default getCharactersPage;
