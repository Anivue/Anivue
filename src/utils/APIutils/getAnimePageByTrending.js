import getAnimePage from "./getAnimePage";

const getAnimePageByTrending = async (pageNumber, perPage) => {
    const variables = {
        sortBy: "TRENDING_DESC",
        pageNumber,
        perPage,
    };
    return await getAnimePage(variables);
};

export default getAnimePageByTrending;
