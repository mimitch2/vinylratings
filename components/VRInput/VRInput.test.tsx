import { render, fireEvent } from '@testing-library/react-native';

import VRInput from './VRInput';

describe('VRInput', () => {
    const value = 'Radiohead';
    const onChangeMock = jest.fn();

    it('should update input when user types', () => {
        const inputValue = 'is awesome';
        const { getByDisplayValue } = render(
            <VRInput value={value} handleTextChange={onChangeMock} />
        );

        fireEvent.changeText(getByDisplayValue(value), inputValue);
        expect(onChangeMock).toHaveBeenLastCalledWith(inputValue);
    });

    it('should render label', () => {
        const label = 'Type here';
        const { getByText } = render(
            <VRInput
                value={value}
                handleTextChange={onChangeMock}
                label={label}
            />
        );

        expect(getByText(label)).toBeTruthy();
    });

    it('should word count', () => {
        const { getByText } = render(
            <VRInput value={value} handleTextChange={onChangeMock} showLength />
        );

        expect(getByText('9/250')).toBeTruthy();
    });
});
