import handleRes from "../handleRes";

const fetchApiWithToken = async (accessToken, query, variables = {}) => {
    const url = "https://graphql.anilist.co";
    const options = {
        method: "POST",
        headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    };

    return await handleRes(url, options);
};

export default fetchApiWithToken;
