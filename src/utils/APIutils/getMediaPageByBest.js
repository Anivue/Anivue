import getMediaPage from "./getMediaPage";

const getMediaPageByBest = async (type, pageNumber, perPage) => {
    const variables = {
        type,
        pageNumber,
        perPage,
        sortBy: "SCORE_DESC",
    };
    return await getMediaPage(variables);
};

export default getMediaPageByBest;
