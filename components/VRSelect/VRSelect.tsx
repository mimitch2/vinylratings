import React, { useState } from 'react';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';

import { VRText } from 'components';
import { CustomFieldsValue } from 'types';

const VRSelect = ({
    field,
    renderLabel = true,
    onSelect
}: {
    field: CustomFieldsValue;
    renderLabel?: boolean;
    onSelect: (value: string) => void;
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
            onSelect={(idx) => {
                setSelectedIndex(idx);
                onSelect(
                    fieldWithNotSetOption.options?.[(idx as IndexPath).row] ??
                        ''
                );
            }}
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
