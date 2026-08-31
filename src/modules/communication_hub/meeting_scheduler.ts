/**
 * Meeting Scheduling, Timezone Resolver & iCalendar (ICS) Generator
 */

export class MeetingScheduler {
  public generateICalendar(event: {
    uid: string;
    title: string;
    description: string;
    location: string;
    startTime: string; // ISO
    durationMinutes: number;
    organizerEmail: string;
    attendeeEmails: string[];
  }): string {
    const start = new Date(event.startTime);
    const end = new Date(start.getTime() + event.durationMinutes * 60000);

    const formatICSDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Apex OmniCustomer 360 CRM//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${event.uid}`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(start)}`,
      `DTEND:${formatICSDate(end)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/
/g, '\n')}`,
      `LOCATION:${event.location}`,
      `ORGANIZER;CN=Apex CRM:mailto:${event.organizerEmail}`,
      ...event.attendeeEmails.map(email => `ATTENDEE;ROLE=REQ-PARTICIPANT;RSVP=TRUE:mailto:${email}`),
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('
');
  }
}
