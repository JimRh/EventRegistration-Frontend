import React, { useState, useEffect } from 'react';

import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

function Dashboard() {
  const navigate=useNavigate()
  const [data, setData] = useState([]);
  const [eventdata,setEventData]=useState([])
  const [eventlistdata,setEventlistData]=useState([])
  const [loading, setLoading] = useState(true);
  const bearerToken = localStorage.getItem('token'); // Replace with your actual bearer token

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchData();
  }, []); // Trigger a re-fetch when the token changes

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetcheventData();
  }, []); // Trigger a re-fetch when the token changes
 
  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetcheventlistData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:8000/event/regeventlist', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.error) {
          console.log(responseData)
          // If the response indicates the user has not registered, set an empty data array
          setData([]);
        } else {
          // Otherwise, set the retrieved data
          setData(responseData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        // Set loading to false when the fetch operation is complete
        setLoading(false);
      });
  };

  const fetcheventData = () => {
    fetch('http://localhost:8000/event/eventlist', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.error) {
          console.log(responseData)
          // If the response indicates the user has not registered, set an empty data array
          setEventData([]);
        } else {
          // Otherwise, set the retrieved data
          setEventData(responseData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        // Set loading to false when the fetch operation is complete
        setLoading(false);
      });
  };

  const fetcheventlistData = () => {
    fetch('http://localhost:8000/event/alleventlist', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.error) {
          console.log(responseData)
          // If the response indicates the user has not registered, set an empty data array
          setEventlistData([]);
        } else {
          // Otherwise, set the retrieved data
          setEventlistData(responseData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        // Set loading to false when the fetch operation is complete
        setLoading(false);
      });
  };


  const handleActionClick = (eventId) => {
    // Make an API request to unregister the event
    fetch(`http://localhost:8000/event/unregisterevent/${eventId}`, {
      method: 'POST', // or 'DELETE' depending on your API
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      // Additional options like body, etc., can be added here
    })
      .then((response) => {
        if (response.ok) {
          // If the API request is successful, fetch updated data
          fetchData();
          fetcheventData()
          fetcheventlistData()
        } else {
          console.error('Failed to unregister event:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error unregistering event:', error);
      });
  };

  const handleActionClick2 = (eventId) => {
    // Make an API request to unregister the event
    fetch(`http://localhost:8000/event/registerevent/${eventId}`, {
      method: 'POST', // or 'DELETE' depending on your API
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      // Additional options like body, etc., can be added here
    })
      .then((response) => {
        if (response.ok) {
          // If the API request is successful, fetch updated data
          fetcheventData();
          fetchData()
          fetcheventlistData()
        } else {
          console.error('Failed to unregister event:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error unregistering event:', error);
      });
  };

  const handlelogout = () => {
    
    localStorage.clear()
    
    navigate('/login')

  };

  const CreateEvent = () => {
    
    navigate('/create-event')

  };


  return (
    <div className="Dashboard">
      <button onClick={() => handlelogout()}>logout</button>
      <h1>Registered Event</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data.length === 0 ? (
            <p>You have not registered for any events.</p>
          ) : (
            <table>
              <thead>
                <tr>
                <th>Event ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Slots</th>
                  <th>Organizer</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((meeting) => (
                  <tr key={meeting.event_id}>
                    <td>{meeting.event_id}</td>
                    <td>{meeting.event_title}</td>
                    <td>{meeting.event_description}</td>
                    <td>{meeting.event_date}</td>
                    <td>{meeting.event_time}</td>
                    <td>{meeting.location}</td>
                    <td>{meeting.slots}</td>
                    <td>{meeting.organizer}</td>
                    <td>
                      <button onClick={() => handleActionClick(meeting.event_id)}>Unregister</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
          <h1>Unregisterd Event List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {eventdata.length === 0 ? (
            <p>No events have been created yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Event ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Slots</th>
                  <th>Organizer</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {eventdata.map((meeting) => (
                  <tr key={meeting.event_id}>
                    <td>{meeting.event_id}</td>
                    <td>{meeting.event_title}</td>
                    <td>{meeting.event_description}</td>
                    <td>{meeting.event_date}</td>
                    <td>{meeting.event_time}</td>
                    <td>{meeting.location}</td>
                    <td>{meeting.slots}</td>
                    <td>{meeting.organizer}</td>
                    <td>
                      <button onClick={() => handleActionClick2(meeting.event_id)}>Register</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          )}
          
        </div>

        
      )}

<h1>All Event List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {eventlistdata.length === 0 ? (
            <p>No events have been created yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Event ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Slots</th>
                  <th>Organizer</th>
                  
                </tr>
              </thead>
              <tbody>
                {eventlistdata.map((meeting) => (
                  <tr key={meeting.event_id}>
                    <td>{meeting.event_id}</td>
                    <td>{meeting.event_title}</td>
                    <td>{meeting.event_description}</td>
                    <td>{meeting.event_date}</td>
                    <td>{meeting.event_time}</td>
                    <td>{meeting.location}</td>
                    <td>{meeting.slots}</td>
                    <td>{meeting.organizer}</td>
                 
                  </tr>
                ))}
              </tbody>
            </table>
            
          )}
          
        </div>

        
      )}
      

      <button onClick={() => CreateEvent()}>Create Event</button>
    </div>
  );
}


export default Dashboard;