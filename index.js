function createEmployeeRecord(array){
  let employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee
}
function createEmployeeRecords(array){
  let records = array.map(info => createEmployeeRecord(info))
  return records
}
function createTimeInEvent(record, event){
  let timeInEvent = {
    date: event.split(" ")[0],
    hour: parseInt(event.split(" ")[1]),
    type: "TimeIn"
  }
  if (record.timeInEvents == undefined){
    let newRecord = createEmployeeRecord(record)
    newRecord.timeInEvents.push(timeInEvent)
    return newRecord
  } else {
    record.timeInEvents.push(timeInEvent)
    return record
  }
}
function createTimeOutEvent(record, event){
  let timeOutEvent = {
    date: event.split(" ")[0],
    hour: parseInt(event.split(" ")[1]),
    type: "TimeOut"
  }
  if (record.timeOutEvents == undefined){
    let newRecord = createEmployeeRecord(record)
    newRecord.timeOutEvents.push(timeOutEvent)
    return newRecord
  } else {
    record.timeOutEvents.push(timeOutEvent)
    return record
  }
}
function hoursWorkedOnDate(record, date){
  let timeInEvents = record.timeInEvents
  let timeIn = timeInEvents.find(event => event.date == date)
  let timeOutEvents = record.timeOutEvents
  let timeOut = timeOutEvents.find(event => event.date == date)
  let hours = (timeOut.hour - timeIn.hour) / 100
  return hours
}
function wagesEarnedOnDate(record, date){
  return hoursWorkedOnDate(record, date) * record.payPerHour
}
function allWagesFor (record){
  let wagesPerDay = record.timeInEvents.map(event => wagesEarnedOnDate(record, event.date))
  return wagesPerDay.reduce((total, wage) => total + wage)
}
function calculatePayroll(employees){
  let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0)
  return grandTotalOwed
}
function findEmployeeByFirstName(employees, firstName){
  return employees.find(employee => employee.firstName = firstName)
}
