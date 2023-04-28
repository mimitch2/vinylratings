import React from 'react';
import { fireEvent } from '@testing-library/react-native';

import VRInput from './VRInput';
import { renderWithProvider } from 'test';

describe('VRInput', () => {
    const value = 'Radiohead';
    const onChangeMock = jest.fn();

    it('should update input when user types', () => {
        const inputValue = 'is awesome';
        const { getByDisplayValue } = renderWithProvider(
            <VRInput value={value} handleTextChange={onChangeMock} />
        );

        fireEvent.changeText(getByDisplayValue(value), inputValue);
        expect(onChangeMock).toHaveBeenLastCalledWith(inputValue);
    });

    it('should render label', () => {
        const label = 'Type here';
        const { getByText } = renderWithProvider(
            <VRInput
                value={value}
                handleTextChange={onChangeMock}
                label={label}
            />
        );

        expect(getByText(label)).toBeTruthy();
    });

    it('should word count', () => {
        const { getByText } = renderWithProvider(
            <VRInput value={value} handleTextChange={onChangeMock} showLength />
        );

        expect(getByText('9/250')).toBeTruthy();
    });
});
