import { gql, useQuery } from '@apollo/client';

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

const useCustomFields = ({ fieldValues }) => {
    const { data, loading, error } = useQuery(GET_CUSTOM_FIELDS);

    return {
        data,
        loading,
        error
    };
};

export default useCustomFields;
