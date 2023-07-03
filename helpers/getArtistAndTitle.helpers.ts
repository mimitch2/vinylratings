import { BasicInformation } from 'types';

export const getArtistAndTitle = (release: BasicInformation) => {
    const { artists, title } = release;

    return `${artists[0].name} - ${title}`;
};
