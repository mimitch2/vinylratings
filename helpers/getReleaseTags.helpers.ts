import type { BasicInformation, DiscogsVersion } from 'types';

export const getVersionsTags = ({ item }: { item: DiscogsVersion }) => {
    const { released, format, country } = item;

    const tagsArray = released ? [released] : [];
    if (country) {
        tagsArray.push(country);
    }
    // const descriptions = format?.split(',') ?? [];

    if (item?.label) {
        tagsArray.push(item.label[0]);
    }

    format &&
        format.forEach((description, idx) => {
            const trimmedDescription = description.trim();
            const isLpType =
                trimmedDescription === 'LP' || trimmedDescription === 'Album';

            if (!isLpType && idx < 3) {
                tagsArray.push(trimmedDescription);
            }
        });

    return tagsArray;
};

export const getReleaseTags = ({
    item,
    limit = true,
    isVersions = false
}: {
    item: BasicInformation | DiscogsVersion;
    limit?: boolean;
    isVersions?: boolean;
}) => {
    if (isVersions) {
        return getVersionsTags({ item: item as DiscogsVersion });
    }

    const { year, formats, country } = item as BasicInformation;

    const formatInfo = formats.reduce(
        (data, format) => {
            if (format?.qty && format?.name === 'Vinyl') {
                data.qty = data.qty + +format.qty;
            }

            if (format?.text) {
                data.text = format.text;
            }

            return data;
        },
        { qty: 0, text: '' }
    );

    const [{ descriptions }] = formats;
    const tagsArray = year ? [year.toString()] : [];

    if (country) {
        tagsArray.push(country);
    }

    if (formatInfo?.qty) {
        const IsMultiple = +formatInfo.qty > 1;

        tagsArray.push(`${formatInfo.qty} ${IsMultiple ? 'Discs' : 'Disc'}`);
    }

    if (formatInfo?.text && !limit) {
        tagsArray.push(formatInfo.text);
    }

    descriptions &&
        descriptions.forEach((description, idx) => {
            const trimmedDescription = description.trim();
            const isLpType =
                trimmedDescription === 'LP' || trimmedDescription === 'Album';

            if (!isLpType && limit && idx < 3) {
                tagsArray.push(trimmedDescription);
            } else if (!isLpType && !limit) {
                tagsArray.push(trimmedDescription);
            }
        });

    return tagsArray;
};
