const daysOfTheWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday ',
    'Saturday',
    'Sunday'
]

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const date = new Date()

export const dateObject = {
    dayOfTheMonth: date.getDate(),
    month: months[date.getMonth()],
    dayOfTheWeek: daysOfTheWeek[date.getDay() - 1],
}