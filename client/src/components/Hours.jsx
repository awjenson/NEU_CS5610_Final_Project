import React from 'react';
import hoursImage1 from '../images/hours1.png';
import hoursImage2 from '../images/hours2.png';

export default function Hours() {
    const businessHours = [
        { day: 'Monday', hours: '4:00 PM - 10:00 PM' },
        { day: 'Tuesday', hours: '4:00 PM - 10:00 PM' },
        { day: 'Wednesday', hours: '4:00 PM - 10:30 PM' },
        { day: 'Thursday', hours: '4:00 PM - 10:30 PM' },
        { day: 'Friday', hours: '4:00 PM - 11:30 PM' },
        { day: 'Saturday', hours: '3:00 PM - 11:30 PM' },
        { day: 'Sunday', hours: '3:00 PM - 10:00 PM' }
    ];

    return (
        <section id="hours">

            <header>
                <h2>Hours of Operation</h2>
            </header>

            <section className="hours-container">

                <section className="hours-left">
                    <p>We are open 7 days a week!</p>
                    {businessHours.map((schedule) => (
                        <div key={schedule.day} className="hours-row">
                            <span className="day">{schedule.day}</span>
                            <span className="hours">{schedule.hours}</span>
                        </div>
                    ))}
                </section>

                <section className="hours-right">
                    <img src={hoursImage1} alt="Exterior of Little Lemon restaurant" className="hours-image1" />
                    <img src={hoursImage2} alt="Interior of Little Lemon restaurant" className="hours-image2" />
                </section>

            </section>
        </section>
    );
}