import { useState, useEffect, SetStateAction } from "react";
import { db } from "../components/firebase";
import { collectionGroup, getDocs } from "firebase/firestore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import jaLocale from "@fullcalendar/core/locales/ja";

function Calendar(props): JSX.Element {
  const mydata: SetStateAction<any[]> = [];
  const [data, setData] = useState(mydata);

  useEffect((): void => {
    const docRef = collectionGroup(db, "schedules");
    getDocs(docRef).then((snapshot): void => {
      snapshot.forEach((document): void => {
        const doc = document.data();
        mydata.push({ title: doc.plan, start: doc.start, end: doc.end });
      });
      setData(mydata);
    });
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      initialView="dayGridMonth" // 初期表示のモードを設定する
      allDaySlot={false}
      slotDuration="01:00:00"
      aspectRatio={0.75}
      locales={[jaLocale]}
      locale="ja"
      events={data}
    />
  );
}

export default Calendar;
