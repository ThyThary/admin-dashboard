import React, { useState, useEffect } from "react";

const DateKhmer = () => {
  // Get time
  const date = new Date();
  const weekday = Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    date
  );
  const day = Intl.DateTimeFormat("en-US", { day: "numeric" }).format(date);
  const month = Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  const year = Intl.DateTimeFormat("en-US", { year: "numeric" }).format(date);
  const time = Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Phnom_Penh",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // set to true if you want AM/PM
  }).format(date);

  // Map English shift to Khmer
  const shiftTranslations = {
    Morning: "ព្រឹក",
    Afternoon: "រសៀល",
    Night: "យប់",
  };

  // Convert weekday inot khmer
  let weekdayKh;
  switch (weekday) {
    case "Monday":
      weekdayKh = "ចន្ទ";
      break;
    case "Tuesday":
      weekdayKh = "អង្គារ";
      break;
    case "Wednesday":
      weekdayKh = "ពុធ";
      break;
    case "Thursday":
      weekdayKh = "ព្រហស្បតិ៍";
      break;
    case "Friday":
      weekdayKh = "សុក្រ";
      break;
    case "Saturday":
      weekdayKh = "សៅរ៍";
      break;
    case "Sunday":
      weekdayKh = "អាទិត្យ";
  }
  // Convert day ino khmer
  let dayKh;
  switch (day) {
    case "1":
      dayKh = "១";
      break;
    case "2":
      dayKh = "២";
      break;
    case "3":
      dayKh = "៣";
      break;
    case "4":
      dayKh = "៤";
      break;
    case "5":
      dayKh = "៥";
      break;
    case "6":
      dayKh = "៥";
      break;
    case "7":
      dayKh = "៧";
      break;
    case "8":
      dayKh = "៨";
      break;
    case "9":
      dayKh = "៩";
      break;
    case "10":
      dayKh = "១០";
      break;
    case "11":
      dayKh = "១១";
      break;
    case "12":
      dayKh = "១២";
      break;
    case "13":
      dayKh = "១៣";
      break;
    case "14":
      dayKh = "១៤";
      break;
    case "15":
      dayKh = "១៥";
      break;
    case "16":
      dayKh = "១៦";
      break;
    case "17":
      dayKh = "១៧";
      break;
    case "18":
      dayKh = "១៨";
      break;
    case "19":
      dayKh = "១៩";
      break;
    case "20":
      dayKh = "២០";
      break;
    case "21":
      dayKh = "២១";
      break;
    case "22":
      dayKh = "២២";
      break;
    case "23":
      dayKh = "២៣";
      break;
    case "24":
      dayKh = "២៤";
      break;
    case "25":
      dayKh = "២៥";
      break;
    case "26":
      dayKh = "២៦";
      break;
    case "27":
      dayKh = "២៧";
      break;
    case "28":
      dayKh = "២៨";
      break;
    case "29":
      dayKh = "២៩";
      break;
    case "30":
      dayKh = "៣០";
      break;

    case "31":
      dayKh = "៣១";
  }
  // Convert month ino khmer
  let monthKh;
  switch (month) {
    case "January":
      monthKh = "មករា";
      break;
    case "February":
      monthKh = "កុម្ភៈ";
      break;
    case "March":
      monthKh = "មីនា";
      break;
    case "April":
      monthKh = "មេសា";
      break;
    case "May":
      monthKh = "ឧសភា";
      break;
    case "June":
      monthKh = "មិថុនា";
      break;
    case "July":
      monthKh = "កក្កដា";
      break;
    case "August":
      monthKh = "សីហា";
      break;
    case "September":
      monthKh = "កញ្ញា";
      break;
    case "October":
      monthKh = "តុលា";
      break;
    case "November":
      monthKh = "វិច្ឆិកា";
      break;
    case "December":
      monthKh = "ធ្នូ";
  }
  // Convert year ino khmer
  const convertYearToKh = (number) => {
    const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
    return number
      .toString()
      .split("")
      .map((digit) => khmerDigits[digit])
      .join("");
  };
  let yearKh = convertYearToKh(year);

  // Helper function to get shift by time
  const getShiftByTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;

    if (totalMinutes >= 300 && totalMinutes < 720) {
      return "Morning";
    } else if (totalMinutes >= 720 && totalMinutes < 1080) {
      return "Afternoon";
    } else {
      return "Night";
    }
  };
  const KhmerShiftFromTime = ({ time }) => {
    const shift = getShiftByTime(time);
    const khmerShift = shiftTranslations[shift];

    return <span>{khmerShift}</span>;
  };
  //Convert time into khmer
  const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

  const convertTimeToKhmer = (time) => {
    return time
      .split("")
      .map((char) => (/\d/.test(char) ? khmerDigits[parseInt(char)] : char))
      .join("");
  };

  const KhmerClock = () => {
    const [khmerTime, setKhmerTime] = useState("");
    useEffect(() => {
      const updateTime = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          //   second: "2-digit",
          hour12: true, // This removes AM/PM
        });
        const timeSplite = timeStr.split(" ");

        setKhmerTime(convertTimeToKhmer(timeSplite[0]));
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }, []);

    return <div> {khmerTime}</div>;
  };
  return (
    <>
      <label
        className="text-sm whitespace-nowrap flex flex-row gap-1"
        style={{ fontFamily: "Hanuman, sans-serif" }}
      >
        {`${weekdayKh},${dayKh}-${monthKh}-${yearKh} `}
        <KhmerClock />
        <KhmerShiftFromTime time={time} />
      </label>
    </>
  );
};

export default DateKhmer;
