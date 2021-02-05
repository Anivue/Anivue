import getCharactersPage from "./getCharactersPage";

const getCharactersPageByFav = async (pageNumber, perPage) => {
    const variables = {
        pageNumber,
        perPage,
    };
    return await getCharactersPage(variables);
};

export default getCharactersPageByFav;
