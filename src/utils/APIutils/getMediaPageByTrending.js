import getMediaPage from "./getMediaPage";

const getMediaPageByTrending = async (type, pageNumber, perPage) => {
    const variables = {
        type,
        pageNumber,
        perPage,
        sortBy: "TRENDING_DESC",
    };
    return await getMediaPage(variables);
};

export default getMediaPageByTrending;
