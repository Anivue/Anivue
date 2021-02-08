import getCharactersPage from "./getCharactersPage";

const getCharactersPageByTitle = async (title, pageNumber, perPage) => {
    const variables = {
        title,
        pageNumber,
        perPage,
        sortBy: "SEARCH_MATCH",
    };
    return await getCharactersPage(variables);
};

export default getCharactersPageByTitle;
