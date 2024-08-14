import { DateTime } from 'luxon';

const parseDateString = (dateStr:string) => {
    let dateArr: string | string[] = dateStr.split(' ');
    let month: any = dateArr[1].substring(0, dateArr[1].length -3);
    dateArr[1] = month;
    dateArr = dateArr.join(' ');
    let parsedDateObj = DateTime.fromFormat(dateArr, 'LLL d yyyy');
    return parsedDateObj;
};

const hasBeenGhosted = (lastUpdated: string) => {
    const todayMonth = DateTime.local().month;
    const todayDate = DateTime.local().day;
    const lastUpdatedMonth = parseInt(lastUpdated.slice(0,2));
    const lastUpdatedDay = parseInt(lastUpdated.slice(2,4))
    if((todayDate -lastUpdatedDay)>= 14) {
        return true;
    }
    return false;
};

export { hasBeenGhosted, parseDateString };