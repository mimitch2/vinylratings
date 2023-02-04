import React from 'react';
import { Calendar } from 'react-native-calendars';

import { COLORS, FONTS } from 'constants/index';

const VRCalendar = ({
    onDatePress
}: {
    onDatePress: (value: string) => void;
}) => {
    const padTo2Digits = (num: number) => {
        return num.toString().padStart(2, '0');
    };

    const now = new Date();

    return (
        <Calendar
            onDayPress={(pickedDate) => {
                const dateString = `${padTo2Digits(
                    pickedDate.month
                )}/${padTo2Digits(pickedDate.day)}/${pickedDate.year}`;

                onDatePress(dateString);
            }}
            maxDate={now.toLocaleDateString()}
            monthFormat={'MMM yyyy'}
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            disableAllTouchEventsForDisabledDays
            enableSwipeMonths={true}
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
    );
};

export default VRCalendar;
