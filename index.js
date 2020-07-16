/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
let createEmployeeRecord = function(arr) {
    return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

let createEmployeeRecords = function(array) {
    return array.map(createEmployeeRecord)

}

let createTimeInEvent = function(dateTime) {
    let [date, hour] = dateTime.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
        return this

}



let createTimeOutEvent = function(dateTime) {
    let [date, hour] = dateTime.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
        return this

}

let hoursWorkedOnDate = function(needDate) {
    let clockIn = this.timeInEvents.find(function(e) {
       return e.date === needDate
    })

    let clockOut = this.timeOutEvents.find(function(e){
       return e.date === needDate
    })
    return (clockOut.hour - clockIn.hour) / 100
}

let wagesEarnedOnDate = function(needDate) {
    let gross = hoursWorkedOnDate.call(this, needDate) 
     * this.payPerHour

     return gross

}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(name){
        return  name.firstName === firstName
     })
}

let calculatePayroll = function(records) {
    return records.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)},0)
    

}
let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}