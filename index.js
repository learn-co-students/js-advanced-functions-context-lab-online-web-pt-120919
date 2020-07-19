function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(function(emp){ 
        return createEmployeeRecord(emp)
    })
}

function createTimeInEvent(timeIn) {
    let [day, time] = timeIn.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: day
    })
    return this
}

function createTimeOutEvent(timeOut) {
    let [day, time] = timeOut.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: day
    })
    return this
}

function hoursWorkedOnDate(day) {
    let timeIn = this.timeInEvents.find(function(e){
        return e.date === day
    })

    let timeOut = this.timeOutEvents.find(function(e){
        return e.date === day
    })

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(day) {
    let workedHours = hoursWorkedOnDate.call(this, day)
    let payRate = this.payPerHour

    return workedHours * payRate
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(sourceArray, name) {
    return sourceArray.find(function(e){
        return e.firstName === name
    })
}

function calculatePayroll(employees){
    let empPay = employees.map(function(emp) {
        return allWagesFor.call(emp)
    })

    return empPay.reduce(function(a, b) {return a + b})
}