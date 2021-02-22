import getMediaPage from "./getMediaPage";
import getCharactersPage from "./getCharactersPage";

const getSearchPage = async (page, perPage, title) => {
    const anime = {};
    const manga = {};
    const characters = {};

    // Fetch params
    const animeOptions = {
        type: "ANIME",
        title,
        page,
        perPage,
    };

    const mangaOptions = {
        type: "MANGA",
        title,
        page,
        perPage,
    };

    const charactersOptions = {
        title,
        page,
        perPage,
    };

    // ANIME

    const resAnime = await getMediaPage(animeOptions);
    if (resAnime.res.ok) {
        anime.error = false;
        anime.data = resAnime.data.Page.media;
        anime.found = resAnime.data.Page.pageInfo.total;
    } else {
        anime.error = true;
    }

    // MANGA

    const resManga = await getMediaPage(mangaOptions);
    if (resManga.res.ok) {
        manga.error = false;
        manga.data = resManga.data.Page.media;
        manga.found = resManga.data.Page.pageInfo.total;
    } else {
        manga.error = true;
    }

    // CHARACTERS
    const resCharacters = await getCharactersPage(charactersOptions);
    if (resCharacters.res.ok) {
        characters.error = false;
        characters.data = resCharacters.data.Page.characters;
        characters.found = resCharacters.data.Page.pageInfo.total;
    } else {
        characters.error = true;
    }

    return { anime, manga, characters };
};

export default getSearchPage;
