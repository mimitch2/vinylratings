import {
    BasicInformation,
    DiscogsVersion,
    DiscogsRelease,
    Releases,
    Pagination,
    Data
} from 'types';

export const foldersMock = [
    { id: 0, name: 'All', count: 3 },
    {
        id: 1,
        name: 'Americana',
        count: 3
    },
    {
        id: 3,
        name: 'Jazz',
        count: 0
    }
];

export const basicInformationMock: BasicInformation = {
    title: 'Our Mother The Mountain',
    thumb: 'fake_url.jpeg',
    year: 2015,
    artists: [{ name: 'Townes Van Zandt' }],
    genres: ['Rock', 'Folk, World, & Country'],
    styles: ['Folk Rock', 'Country Rock', 'Folk'],
    formats: [
        {
            name: 'Vinyl',
            qty: '1',
            text: null,
            descriptions: ['LP', 'Album', 'Repress']
        }
    ]
};

export const discogsVersionMock: DiscogsVersion = {
    year: 2019,
    id: '14633642',
    title: 'Our Mother The Mountain',
    thumb: 'fake_url.jpeg',
    label: 'Fat Possum Records',
    country: 'US',
    formats: [],
    format: 'LP, Album, Reissue, Remastered',
    released: '2019',
    styles: [],
    genres: [],
    artists: [],
    user_data: {
        in_collection: false,
        in_wantlist: false
    }
};

export const releaseMock: DiscogsRelease = {
    uri: 'some_fake_uri',
    formats: [
        {
            name: 'Vinyl',
            qty: '1',
            text: null,
            descriptions: ['LP', 'Album', 'Repress']
        }
    ],
    title: 'Our Mother The Mountain',
    thumb: 'fake_url.jpeg',
    year: 2015,
    artists: [{ name: 'Townes Van Zandt' }],
    genres: ['Rock', 'Folk, World, & Country'],
    styles: ['Folk Rock', 'Country Rock', 'Folk'],
    released: '2015',
    country: 'US',
    master_id: 12345,
    vinylRatingsRelease: null,
    images: [{ resource_url: 'fakeUrl', height: 60, width: 60 }],
    tracklist: [{ position: 'A', title: 'Some song', duration: '3:00' }],
    notes: 'Some notes',
    identifiers: [
        {
            description: 'Side A [Hand Etched]',
            type: 'Matrix / Runout',
            value: 'FP1090-1-A [CMS logo] JW130119'
        },
        {
            description: 'Side A [Stamped]',
            type: 'Matrix / Runout',
            value: '106363E1/A'
        }
    ],
    community: {
        have: 100,
        want: 200,
        rating: {
            average: 4.67,
            count: 51
        }
    }
};

export const collectionItemMock: Releases = {
    id: 12345,
    rating: 3.5,
    basic_information: basicInformationMock
};

export const paginationMock: Pagination = {
    items: 3,
    per_page: 25,
    page: 1,
    pages: 1
};

export const collectionMock: Data = {
    getCollection: {
        pagination: {
            items: 3,
            page: 1,
            pages: 1,
            per_page: 25
        },
        releases: [
            {
                id: '2773268',
                date_added: '2022-12-21T13:17:39-08:00',
                instance_id: '1212061942',
                rating: 0,
                basic_information: {
                    title: 'The Good Life',
                    thumb: 'https://i.discogs.com/_dtG4Urr8bIwihSc-9tG8CzMQdm1Zeh2JUAXUTnFwe4/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI3NzMy/NjgtMTMwNjI5MTE3/MC5qcGVn.jpeg',
                    year: 2008,
                    artists: [{ name: 'Justin Townes Earle' }],
                    genres: ['Folk, World, & Country'],
                    styles: ['Country'],
                    formats: [
                        {
                            name: 'Vinyl',
                            qty: '1',
                            text: null,
                            descriptions: ['LP', 'Album', 'Limited Edition']
                        }
                    ]
                }
            },
            {
                id: '17572702',
                date_added: '2022-08-27T08:19:09-07:00',
                instance_id: '1114282661',
                rating: 0,
                basic_information: {
                    title: 'Kiss Me Kiss Me Kiss Me',
                    thumb: 'https://i.discogs.com/5D6766S4C0qUSplks3IFeVVYjxW-V1Jk2pOar6jdkDs/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3NTcy/NzAyLTE2NDQ1NzU2/MTItMzgzNS5qcGVn.jpeg',
                    year: 0,
                    artists: [{ name: 'The Cure' }],
                    genres: ['Electronic', 'Rock'],
                    styles: ['Alternative Rock', 'Synth-pop'],
                    formats: [
                        {
                            name: 'Vinyl',
                            qty: '2',
                            text: null,
                            descriptions: ['LP', 'Album', 'Reissue']
                        }
                    ]
                }
            },
            {
                id: '16136664',
                date_added: '2022-08-15T06:32:29-07:00',
                instance_id: '1104582515',
                rating: 0,
                basic_information: {
                    title: 'Long Hot Summers / The Story Of The Style Council',
                    thumb: 'https://i.discogs.com/T2XVqJOtomDTRLPmTRQd8fftZelf8tla5pmtQkjZgN0/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2MTM2/NjY0LTE2MDkxNjE4/NTgtODUwOC5qcGVn.jpeg',
                    year: 2020,
                    artists: [{ name: 'The Style Council' }],
                    genres: ['Rock', 'Funk / Soul', 'Pop'],
                    styles: ['New Wave', 'Mod', 'Soul', 'Pop Rock'],
                    formats: [
                        {
                            name: 'Vinyl',
                            qty: '3',
                            text: null,
                            descriptions: [
                                'LP',
                                'Compilation',
                                'Limited Edition',
                                'Remastered'
                            ]
                        }
                    ]
                }
            }
        ]
    }
};
