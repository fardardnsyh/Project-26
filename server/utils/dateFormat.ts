const addDateSuffix = dateStr => {

    // get last char of date string
    const lastChar = dateStr.charAt(dateStr.length - 1);

    if (lastChar === '1' && dateStr !== '11') {
        dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
        dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
        dateStr = `${dateStr}rd`;
    } else {
        dateStr = `${dateStr}th`;
    }

    return dateStr;
};

// function to format a timestamp, accepts the timestamp and an `options` object as parameters
const dateFormat = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
) => {
    // create month object
    const months = {
        0: monthLength === 'short' ? 'Jan' : 'January',
        1: monthLength === 'short' ? 'Feb' : 'February',
        2: monthLength === 'short' ? 'Mar' : 'March',
        3: monthLength === 'short' ? 'Apr' : 'April',
        4: monthLength === 'short' ? 'May' : 'May',
        5: monthLength === 'short' ? 'Jun' : 'June',
        6: monthLength === 'short' ? 'Jul' : 'July',
        7: monthLength === 'short' ? 'Aug' : 'August',
        8: monthLength === 'short' ? 'Sep' : 'September',
        9: monthLength === 'short' ? 'Oct' : 'October',
        10: monthLength === 'short' ? 'Nov' : 'November',
        11: monthLength === 'short' ? 'Dec' : 'December'
    };

    const dateObj = new Date(timestamp);
    const dateStr = dateObj.toLocaleDateString()
    let [month, day, year] = dateStr.split('/');
    const formattedMonth = months[(Number(month) - 1)];

    const dayOfMonth = dateSuffix
        ? addDateSuffix(day)
        : day;

    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year}`;

    return formattedTimeStamp;
};

export default dateFormat