import React, { useState } from 'react';
import { Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';

import { VRText } from 'components';
import { CustomFieldsValue } from 'types';

const VRSelect = ({
    field,
    renderLabel = true
}: {
    field: CustomFieldsValue;
    renderLabel?: boolean;
}) => {
    const fieldWithNotSetOption = {
        ...field,
        options: ['Not set', ...(field.options as string[])]
    };
    const valueToOptionIndex = fieldWithNotSetOption.options.indexOf(
        field.value as string
    );
    const initialSelectedIdx =
        valueToOptionIndex === -1 ? 0 : valueToOptionIndex;
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
        new IndexPath(initialSelectedIdx)
    );

    return (
        <Select
            placeholder="Not set"
            label={
                renderLabel
                    ? () => (
                          <VRText
                              styleOverride={{ marginBottom: 5, marginTop: 10 }}
                          >
                              {fieldWithNotSetOption.name}
                          </VRText>
                      )
                    : undefined
            }
            selectedIndex={selectedIndex}
            onSelect={(idx) => setSelectedIndex(idx)}
            value={() => (
                <VRText>
                    {selectedIndex
                        ? fieldWithNotSetOption.options[
                              (selectedIndex as IndexPath).row
                          ]
                        : 'Not set'}
                </VRText>
            )}
        >
            {fieldWithNotSetOption.options.map((option: string) => {
                return (
                    <SelectItem
                        title={() => <VRText>{option}</VRText>}
                        key={option}
                    />
                );
            })}
        </Select>
    );
};

export default VRSelect;
