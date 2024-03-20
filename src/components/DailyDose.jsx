/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "./NavBar";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function DailyDose() {
    const[buttonstate ,setbuttonstate]= useState(false);
  const [dailyDose, setDailyDose] = useState(null);
  const [streak, setStreak] = useState(0);
    
  /*useEffect(() => {
    // Fetch the daily dose data from an API or a local source
    const fetchData = async () => {
        //const apiurl='http://numbersapi.com/42'

      const response = await fetch('http://numbersapi.com/42');
      const data = await response.json();
      setDailyDose(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDailyDose = async () => {
      try {
        const response = await axios.get(`http://numbersapi.com/42`);
        setDailyDose(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDailyDose();
  }, []);

  useEffect(() => {
    // Check if the user has checked in today
    const today = new Date();
    const checkIn = localStorage.getItem('checkIn');
    if (checkIn !== today.toISOString().split('T')[0]) {
      localStorage.setItem('checkIn', today.toISOString().split('T')[0]);
      setStreak(1);
    } else {
      setStreak(streak + 1);
    }
  }, [dailyDose]);

  if (!dailyDose) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className="daily-dose">
      <h2>{dailyDose.title}</h2>
      <p>{dailyDose}</p>
      <button>Streak: {streak} day(s)</button>
      <Button class="mark-button" variant={buttonstate?"contained" :"outlined"}color="success" 
      onClick={() => {
        setbuttonstate(true);

        console.log('clicked');

      }}
      >Mark as Read</Button>
    
      
    </div>
  );
};

export default DailyDose;*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DailyDose.css';

const DailyDose = () => {
  const [dailyDose, setDailyDose] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);
  const d=new Date();

  const year=d.getFullYear();
  const date=d.getDate();
  const month=d.getMonth();


  var urlapi = 'https://newsapi.org/v2/everything?q=finance&from=2024-03-19&to='+{year}+'-'+{month}+'-'+{date}+'&sortBy=popularity&apiKey=ae0f4f17ed804a8c9d9710f7f40ba987';
  

  /*useEffect(() => {
    const fetchDailyDose = async () => {
      try {

        
        var req = new Request(url);

    const response =fetch(req)
    const data = response[0];
        /*const response = await fetch('http://numbersapi.com/42');
        const data = await response.json();
        setDailyDose(data);
      } catch (error) {
        console.error(error);
      }
    };

    
    fetchDailyDose();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

   useEffect(() => {
        const fetchDailyDose = async () => {
          try {
            const response = await axios.get(urlapi);
            setDailyDose(response.data.articles[3]);
          } catch (error) {
            console.error(error);
          }
        };
    fetchDailyDose();
  }, []);


  //
  /*useEffect(() => {
    // Check if the user has checked in today
    const today = new Date();
    const checkIn = localStorage.getItem('checkIn');
    if (checkIn !== today.toISOString().split('T')[0]) {
      localStorage.setItem('checkIn', today.toISOString().split('T')[0]);
      setStreak(1);
    } else {
      setStreak(streak + 1);
    }
  }, [dailyDose]);*/


  ///


  const handleCheckIn = async () => {
    try {
      //await axios.post({urlapi});
      setCheckedIn(true);
      setStreak(streak + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleReadMore = () => {
    setIsReadMoreOpen(!isReadMoreOpen);
  };
/*<p className="daily-dose__description">{dailyDose.description}</p>
            <button className="read-more-button">Read More</button>*/
  return (
    <div className="daily-dose">
      <div className="daily-dose__header">
        <h2>Daily Dose of Knowledge</h2>
        <button className="check-in-button" onClick={handleCheckIn}>
          {checkedIn ? `Streak: ${streak}` : 'Check In'}
        </button>
      </div>
      <div className="daily-dose__content">
        {dailyDose && (
          <>
            <img src={dailyDose.urlToImage} alt={dailyDose.title} className="daily-dose__image" />
            <h3 className="daily-dose__title">{dailyDose.title}</h3>

            
            <div className="daily-dose__description">
                {isReadMoreOpen ? dailyDose.content : dailyDose.description}
                {dailyDose.description.length >= dailyDose.description.length && (
                  <button className="read-more-button" onClick={toggleReadMore}>
                    {isReadMoreOpen ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DailyDose;