export const useFetch = () => {
    const getFetchResponse = async ({
        url,
        type = 'json'
    }: {
        url: string;
        type: 'json' | 'text';
    }) => {
        try {
            const response = await fetch(url);
            const result = await response[type]();

            return result;
        } catch (error) {
            console.log(error);
        }
    };

    return { getFetchResponse };
};
