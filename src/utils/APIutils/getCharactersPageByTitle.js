import getCharactersPage from "./getCharactersPage";

const getCharactersPageByTitle = async (title, pageNumber, perPage) => {
    const variables = {
        title,
        pageNumber,
        perPage,
    };
    return await getCharactersPage(variables);
};

export default getCharactersPageByTitle;
