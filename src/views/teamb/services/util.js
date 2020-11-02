export default class util {

    GetCurrentYear(currentPeriod) {
        var Splits = currentPeriod.split(".");
        var CurrentYear = Splits[0];
        var semester = Splits[1];

        var Year1, Year2;

        if (parseInt(semester) > 1) {
            Year1 = CurrentYear;
            Year2 = CurrentYear.slice(2);
            parseInt(Year2);
            Year2++;
        }
        else {
            Year2 = CurrentYear.slice(2);
            Year1 = parseInt(CurrentYear);
            parseInt(Year1);
            Year1--;
        }
        return (Year1 + "-" + Year2)
    }

    GetCurretTimeDate() {
        var date = new Date();
        var currentDate = date.getFullYear() + "-" + (date.getMonth() +1) + "-" + date.getDate();
        var currentTime = date.getHours() + ":" + date.getMinutes();
        var now = currentDate + " " + currentTime;
        return now;
    }
}