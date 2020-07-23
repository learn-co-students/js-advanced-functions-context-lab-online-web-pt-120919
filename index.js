/* Your Code Here */

let createEmployeeRecord = function(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents:[],
        timeOutEvents:[],
    }
}

let createEmployeeRecords = function(record){
    return record.map(function(array){
        return createEmployeeRecord(array)
    } )
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type:"TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let hoursWorkedOnDate = function(givenDate){
   let inEvent = this.timeInEvents.find(function(e){
       return e.date === givenDate
   })

    let outEvent = this.timeOutEvents.find(function(e){
           return e.date === givenDate
    })

    return (outEvent.hour - inEvent.hour)/100
}

let wagesEarnedOnDate = function(givenDate){
    let pay = hoursWorkedOnDate.call(this, givenDate) * this.payPerHour
        return pay
}

let allWagesFor = function(){
    let allDates = this.timeInEvents.map(function(e){ 
        return e.date
})
    
    let pay = allDates.reduce(function(memo, d){
    return memo + wagesEarnedOnDate.call(this, d)}.bind(this), 0)
        return pay
}

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(e){
        return e.firstName === firstName
    })
}

let calculatePayroll = function(array){
    return array.reduce(function(memo, r){
        return memo + allWagesFor.call(r)
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }