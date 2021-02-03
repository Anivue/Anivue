import getMediaPage from "./getMediaPage";

const getMediaPageByTitle = async (type, title, pageNumber, perPage) => {
    const variables = {
        type,
        title,
        pageNumber,
        perPage,
    };
    return await getMediaPage(variables);
};

export default getMediaPageByTitle;
