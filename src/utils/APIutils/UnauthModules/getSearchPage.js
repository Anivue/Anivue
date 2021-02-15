import getMediaPage from "./getMediaPage";
import getCharactersPage from "./getCharactersPage";

const getSearchPage = async (page, perPage, title) => {
    const anime = {
        found: false,
        data: {},
        error: false,
    };
    const manga = {
        found: false,
        data: {},
        error: false,
    };
    const characters = {
        found: false,
        data: {},
        error: false,
    };

    let counter = 0;

    // ANIME

    const resAnime = await getMediaPage({
        type: "ANIME",
        title,
        page,
        perPage,
    });
    if (resAnime.res.ok) {
        anime.data = resAnime.data.Page.media;
        counter += resAnime.data.Page.pageInfo.total;
        if (anime.data.length) {
            anime.found = true;
        }
    } else {
        anime.error = true;
    }

    // MANGA

    const resManga = await getMediaPage({
        type: "MANGA",
        title,
        page,
        perPage,
    });
    if (resManga.res.ok) {
        manga.data = resManga.data.Page.media;
        counter += resManga.data.Page.pageInfo.total;
        if (manga.data.length) {
            manga.found = true;
        }
    } else {
        manga.error = true;
    }

    // CHARACTERS
    const resCharacters = await getCharactersPage({ title, page, perPage });
    if (resCharacters.res.ok) {
        characters.data = resCharacters.data.Page.characters;
        counter += resCharacters.data.Page.pageInfo.total;
        if (characters.data.length) {
            characters.found = true;
        }
    } else {
        characters.error = true;
    }

    return { anime, manga, characters, counter };
};

export default getSearchPage;
