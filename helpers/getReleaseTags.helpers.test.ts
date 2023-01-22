import { getReleaseTags } from './getReleaseTags.helpers';
import {
    basicInformationMock,
    discogsVersionMock,
    releaseMock
} from 'src/test';

describe('getReleaseTags', () => {
    it.each([
        {
            label: 'BasicInformation',
            item: basicInformationMock,
            limit: true,
            isVersions: false,
            expected: ['2015', '1 Disc', 'Repress']
        },
        {
            label: 'DiscogsVersion',
            item: discogsVersionMock,
            limit: true,
            isVersions: true,
            expected: ['2019', 'US', 'Fat Possum Records', 'Reissue']
        },
        {
            label: 'DiscogsRelease',
            item: releaseMock,
            limit: false,
            isVersions: false,
            expected: ['2015', 'US', '1 Disc', 'Repress']
        },
        {
            label: 'DiscogsRelease with format text',
            item: {
                ...releaseMock,
                formats: [
                    { ...releaseMock.formats[0], text: 'Something cool!' }
                ]
            },
            limit: false,
            isVersions: false,
            expected: ['2015', 'US', '1 Disc', 'Something cool!', 'Repress']
        }
    ])(
        'should return correct tags for $label',
        ({ item, limit, isVersions, expected }) => {
            expect(getReleaseTags({ item, limit, isVersions })).toStrictEqual(
                expected
            );
        }
    );
});
