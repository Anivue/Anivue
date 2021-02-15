import fetchApiWithToken from "./fetchApiWithToken";

const getAuthedUser = async token => {
    const query = `
        query {
            Viewer {
                id
                name
                avatar {
                    large
                    medium
                }
                bannerImage
                about(asHtml: true)
            }
        }
    `;

    return await fetchApiWithToken(token, query);
};

export default getAuthedUser;
