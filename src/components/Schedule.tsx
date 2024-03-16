import React from 'react';

interface Hours {
  condition: {
    text: string;
    icon: string;
  };
  time: string;
}

interface HourSchelude {
  hour: Array<Hours>;
}

interface Props {
  info: Array<HourSchelude>;
}

const Schedule: React.FC<Props> = ({ info }) => {
  return (
    <>
      {info.map((hourSchelude, index) => (
        <div key={index} className="hour-schedule">
          {hourSchelude.hour.map((hour, hourIndex) => {
            const timeParts = hour.time.split(' ')[1].split(':');
            const hourPart = timeParts[0];
            const minutePart = timeParts[1];

            return (
              <div className="hour-item" key={hourIndex}>
                <div className="hour-time">
                  {hourPart}:{minutePart}
                </div>
                <div className="hour-condition">
                  {hour.condition.text}{' '}
                  <img src={hour.condition.icon} alt="" className="icon" />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Schedule;
