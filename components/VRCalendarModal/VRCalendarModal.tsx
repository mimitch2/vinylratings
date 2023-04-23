import React from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import { Pressable } from 'react-native';

import { VRModal, VRText, VRLoading } from 'components';
import { COLORS, FONTS } from 'constants/index';

const VRCalendarModal = ({
    onDatePress,
    modalOpen,
    setModalOpen,
    loading
}: {
    onDatePress: (value: string) => void;
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    loading: boolean;
}) => {
    const now = new Date();

    const padTo2Digits = (num: number) => {
        return num.toString().padStart(2, '0');
    };

    const HandleDayPress = (pickedDate: DateData) => {
        const dateString = `${padTo2Digits(pickedDate.month)}/${padTo2Digits(
            pickedDate.day
        )}/${pickedDate.year}`;

        onDatePress(dateString);
    };

    return (
        <VRModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            title="Pick a date"
        >
            {loading ? (
                <VRLoading />
            ) : (
                <>
                    <Calendar
                        onDayPress={(pickedDate) => {
                            HandleDayPress(pickedDate);
                        }}
                        maxDate={now.toLocaleDateString()}
                        monthFormat={'MMM yyyy'}
                        onPressArrowLeft={(subtractMonth) => subtractMonth()}
                        onPressArrowRight={(addMonth) => addMonth()}
                        disableAllTouchEventsForDisabledDays
                        enableSwipeMonths={true}
                        style={{
                            marginBottom: 20
                        }}
                        theme={{
                            selectedDayTextColor: COLORS.primary,
                            todayTextColor: COLORS.primary,
                            dayTextColor: COLORS.darkGrey,
                            arrowColor: COLORS.primary,
                            disabledArrowColor: COLORS.lightGrey,
                            monthTextColor: COLORS.darkGrey,
                            textDayFontFamily: FONTS.primary,
                            textMonthFontFamily: FONTS.primary,
                            textDayHeaderFontFamily: FONTS.primary,
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 16
                        }}
                    />
                    <VRText fontType="h4">Or</VRText>
                    <Pressable
                        onPress={() => {
                            onDatePress('');
                        }}
                    >
                        <VRText styleOverride={{ marginTop: 10 }}>Reset</VRText>
                    </Pressable>
                </>
            )}
        </VRModal>
    );
};

export default VRCalendarModal;
