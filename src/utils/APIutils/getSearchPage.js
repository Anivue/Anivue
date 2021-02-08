import { getMediaPageByTitle, getCharactersPageByTitle } from "./Anime";

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

    const resAnime = await getMediaPageByTitle("ANIME", title, page, perPage);
    if (resAnime.res.ok) {
        anime.data = resAnime.data.Page.media;
        if (anime.data.length) {
            anime.found = true;
        }
    } else {
        anime.error = true;
    }
    // getMediaPageByTitle("ANIME", title, page, perPage)
    //     .then(res => {
    //         if (res.res.ok) {
    //             anime.data = res.data.Page.media;
    //             if (anime.data.length) {
    //                 anime.found = true;
    //             }
    //         } else {
    //             anime.error = true;
    //         }
    //     })
    //     .catch(e => console.log(e));
    const resManga = await getMediaPageByTitle("MANGA", title, page, perPage);
    if (resManga.res.ok) {
        manga.data = resManga.data.Page.media;
        if (manga.data.length) {
            manga.found = true;
        }
    } else {
        manga.error = true;
    }
    // getMediaPageByTitle("MANGA", title, page, perPage)
    //     .then(res => {
    //         if (res.res.ok) {
    //             manga.data = res.data.Page.media;
    //             if (manga.data.length) {
    //                 manga.found = true;
    //             }
    //         } else {
    //             manga.error = true;
    //         }
    //     })
    //     .catch(e => console.log(e));
    const resCharacters = await getCharactersPageByTitle(title, page, perPage);
    if (resCharacters.res.ok) {
        characters.data = resCharacters.data.Page.characters;
        if (characters.data.length) {
            characters.found = true;
        }
    } else {
        characters.error = true;
    }
    // getCharactersPageByTitle(title, page, perPage)
    //     .then(res => {
    //         if (res.res.ok) {
    //             characters.data = res.data.Page.characters;
    //             if (characters.data.length) {
    //                 characters.found = true;
    //             }
    //         } else {
    //             characters.error = true;
    //         }
    //     })
    //     .catch(e => console.log(e));

    return { anime, manga, characters };
};

export default getSearchPage;
