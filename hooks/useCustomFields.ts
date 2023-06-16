import { gql, useQuery } from '@apollo/client';

import { CustomFields } from 'types';

export const GET_CUSTOM_FIELDS = gql`
    query CustomFields {
        getCustomFields {
            fields {
                id
                name
                type
                options
                position
                lines
                public
            }
        }
    }
`;

export const useCustomFields = () => {
    const { data, loading, error } = useQuery<CustomFields>(GET_CUSTOM_FIELDS);

    return {
        data,
        loading,
        error
    };
};
