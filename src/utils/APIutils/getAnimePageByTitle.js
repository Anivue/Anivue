import getAnimePage from "./getAnimePage";

const getAnimePageByTitle = async (title, pageNumber, perPage) => {
    const variables = {
        title,
        pageNumber,
        perPage,
    };
    return await getAnimePage(variables);
};

export default getAnimePageByTitle;
