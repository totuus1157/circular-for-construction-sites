import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import jaLocale from "@fullcalendar/core/locales/ja";

function Calendar(props): JSX.Element {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "dayGridMonth,dayGridWeek",
      }}
      initialView="dayGridMonth" // 初期表示のモードを設定する
      events={"https://fullcalendar.io/api/demo-feeds/events.json"}
      allDaySlot={false}
      aspectRatio={0.75}
      locales={[jaLocale]}
      locale="ja"
    />
  );
}

export default Calendar;
