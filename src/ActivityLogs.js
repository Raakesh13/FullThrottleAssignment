import React, { useState, useEffect, useCallback } from 'react'
import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function ActivityLogs (props) {
  const [day, setDay] = useState(new Date(moment().format('MMM DD YYYY')))    //set day view the default date and set new date in calendar
  const [show, setShow] = useState(false)                                     //sets show true or false depending on the modal         
  const [logs, setLogs] = useState([])                                        //set activity logs of a user.

  const handleClose = () => {                                                 //instructions to execute when the modal is closed 
    setDay(new Date(moment().format('MMM DD YYYY')))
    setShow(false)
  }

  const handleShow = () => setShow(true)                                      //instructions to execute when the modal is opened 

  const getLogs = useCallback(() => {                                         //filters log for the selected date and set logs to logs
    const logsToRender = props.user.activity_periods.filter(
      log =>
        new Date(log.start_time.slice(0, 11).trim()).toString().slice(4, 15) ===
        day.toString().slice(4, 15)
    )

    setLogs(logsToRender)
  }, [day, props.user.activity_periods])

  useEffect(() => {                                                           //instructions to execute when the state is updated
    getLogs()
  }, [getLogs])

  const onDateChange = date => {                                              //sets day when new date is selected on the calendar                                              
    if (date) {
      setDay(date)
    }
  }

  return (
    <div className='user'>
      <div
        onClick={handleShow}
        className='userinfo'
      >                                                       {/*Renders user information*/}
        <span>{props.user.id}</span> <span>{props.user.real_name}</span>{' '}
        <span>{props.user.tz}</span>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered="true"
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Sessions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <DatePicker
            className="datepicker"
            selected={day}
            onChange={onDateChange}
            dateFormat='MMM dd yyyy'
            maxDate={new Date()}
            showMonthDropdown
            monthDropdownItemNumber={12}
            scrollableMonthDropdown
            showYearDropdown
            yearDropdownItemNumber={15}
            scrollableYearDropdown
          />
          
          {logs.length>0 ?                                          //Renders session activity if data in logs
          <div className="sessions">
          <div className="sessions-head"><span className="in">IN</span><span className="out">OUT</span></div>
          {logs.map((log, i) => {
            return (
              <div className='session' key={i}>
                <span className="in">{log.start_time}</span><span className="out">{log.end_time}</span>
              </div>
            )
          })}
          </div>:<div>No session for this day.</div>}
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ActivityLogs
