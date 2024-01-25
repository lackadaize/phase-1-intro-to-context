function createEmployeeRecord(createEmployeeRecordArray) {
    let employeeInfo = {
        firstName: createEmployeeRecordArray[0],
        familyName: createEmployeeRecordArray[1],
        title: createEmployeeRecordArray[2],
        payPerHour: createEmployeeRecordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeInfo;
};

function createEmployeeRecords(employeeRecordsArray) {
    return employeeRecordsArray.map(createEmployeeRecord);
};

function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: date,       
        hour: parseInt(hour)

    });
    return employeeRecord;
};

function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour)
    });
    return employeeRecord;
};

function hoursWorkedOnDate(employeeRecord, date) {
    let dateTimeIn = employeeRecord.timeInEvents.find (event => event.date === date)
    let dateTimeOut = employeeRecord.timeOutEvents.find (event => event.date === date)
    return (dateTimeOut.hour - dateTimeIn.hour) / 100;
};

function wagesEarnedOnDate(employeeRecord, date) {
    let dateHoursWorked = hoursWorkedOnDate(employeeRecord, date)
    let dateWages = employeeRecord.payPerHour;
    return dateHoursWorked * dateWages;
};

function allWagesFor(employeeRecord) {
    let allDates = employeeRecord.timeInEvents.map(event => event.date);
    return allDates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
};

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
};

// console.log(createEmployeeRecord(["Gray", "Worm", "Security", 1]));
