export default function ScheduleCalendar({ bookingUrl }: { bookingUrl: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <iframe
        src={bookingUrl}
        className="h-[700px] w-full border-0"
        title="Schedule a call"
      />
    </div>
  );
}
