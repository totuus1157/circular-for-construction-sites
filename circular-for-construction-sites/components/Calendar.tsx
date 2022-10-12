import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import {
  doc,
  collectionGroup,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import jaLocale from "@fullcalendar/core/locales/ja";

type Props = { selectedAreaAndSection: string; counter: number };

function Calendar(props: Props): JSX.Element {
  const { selectedAreaAndSection, counter } = props;

  type Mydata = { title: string; start: string; end: string; docId: string };

  const mydata: Mydata[] = [];
  const [data, setData] = useState(mydata);

  const separatedData =
    selectedAreaAndSection !== "all" ? selectedAreaAndSection.split(",") : null;

  useEffect((): void => {
    const docRef = collectionGroup(db, "schedules");
    let q = docRef;
    if (
      separatedData !== null &&
      separatedData[0] !== undefined &&
      separatedData[1] !== undefined
    )
      q = query(
        docRef,
        where("from.area", "==", separatedData[0]),
        where("from.section", "==", separatedData[1])
      );
    getDocs(q).then((snapshot): void => {
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
