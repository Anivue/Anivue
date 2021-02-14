import handleRes from "./handleRes";

// Anilist api graphql POST request template
const fetchApi = async (query, variables = null) => {
    const url = "https://graphql.anilist.co",
        options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        };

    // Return handled promise output
    return await handleRes(fetch, url, options);
};

export default fetchApi;
