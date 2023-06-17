import React, { useState } from 'react';
import { Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';

import { VRText } from 'components';

const VRSelect = ({ field }) => {
    const fieldWithNotSetOption = {
        ...field,
        options: ['Not set', ...field.options]
    };
    const valueToOptionIndex: number = fieldWithNotSetOption.options.indexOf(
        field.value
    );
    const initialSelectedIdx =
        valueToOptionIndex === -1 ? 0 : valueToOptionIndex;
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
        new IndexPath(initialSelectedIdx)
    );

    return (
        <Select
            placeholder="Not set"
            label={() => (
                <VRText styleOverride={{ marginBottom: 5, marginTop: 10 }}>
                    {fieldWithNotSetOption.name}
                </VRText>
            )}
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
