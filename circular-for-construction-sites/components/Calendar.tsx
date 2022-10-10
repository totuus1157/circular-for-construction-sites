import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import { doc, collectionGroup, getDocs, deleteDoc } from "firebase/firestore";
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import jaLocale from "@fullcalendar/core/locales/ja";

function Calendar(props: { counter: number }): JSX.Element {
  const { counter } = props;

  type Mydata = { title: string; start: string; end: string; docId: string };

  const mydata: Mydata[] = [];
  const [data, setData] = useState(mydata);

  useEffect((): void => {
    const docRef = collectionGroup(db, "schedules");
    getDocs(docRef).then((snapshot): void => {
      snapshot.forEach((document): void => {
        const doc = document.data();
        mydata.push({
          title: doc.plan,
          start: doc.start,
          end: doc.end,
          docId: document.id,
        });
      });
      setData(mydata);
    });
  }, [counter]);

  /* const doDelete = (e: EventClickArg, docId: string): void => {
   *   console.log("e.event.title: ", e.event.title);
   *   console.log("docId: ", docId);
   *   confirm(`「${e.event.title}」を削除しますか？`) &&
   *     console.log("削除しますた");
   * };
   */
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
      eventClick={(info): void => doDelete(info, data.docId)}
    />
  );
}

export default Calendar;
