function createEmployeeRecord(employeeArray) {
    return Object.assign({
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    })
}

function createEmployeeRecords(arrayOfArrays){
    let employeeArray = []
    for (const employee of arrayOfArrays){
        employeeArray.push(createEmployeeRecord(employee))
    }
    return employeeArray
}

function createTimeInEvent(dateTime){
    let [date, hour] = dateTime.split(" ")
    let newRecord = this
    newRecord.timeInEvents.push({
        "type": "TimeIn",
        "hour": parseInt(hour, 10),
        date,
    })
    return newRecord 
}

function createTimeOutEvent(dateTime){
    let [date, hour] = dateTime.split(" ")
    let newRecord = this
    newRecord.timeOutEvents.push({
        "type": "TimeOut",
        "hour": parseInt(hour, 10),
        date,
    })
    return newRecord 
}

function hoursWorkedOnDate(date){
    let inEvent = this.timeInEvents.find(function(event){
        return event.date === date 
    })

    let outEvent = this.timeOutEvents.find(function(event){
        return event.date === date
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(date){
    let hours = hoursWorkedOnDate.call(this, date)
    return hours * this.payPerHour
}


function findEmployeeByFirstName(srcArray, firstName){
    let employee = srcArray.find(function(event){
        return event.firstName === firstName
    })

    return employee
}

function calculatePayroll(array){
    let wages = array.reduce(function(wages, employee){
        return wages + allWagesFor.call(employee)
    }, 0)

    return wages
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
