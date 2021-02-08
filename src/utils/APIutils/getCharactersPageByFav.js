import getCharactersPage from "./getCharactersPage";

const getCharactersPageByFav = async (pageNumber, perPage) => {
    const variables = {
        pageNumber,
        perPage,
        sortBy: "FAVOURITES_DESC",
    };
    return await getCharactersPage(variables);
};

export default getCharactersPageByFav;
