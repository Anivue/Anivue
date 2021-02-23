const checkForFav = (favorites, id) => {
    let found = false;

    for (const media of favorites) {
        if (found) break;

        found = media.id === id;
    }
    return found;
};

export default checkForFav;
