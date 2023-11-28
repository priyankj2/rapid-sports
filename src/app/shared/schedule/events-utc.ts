import { SchedulerEvent } from '@progress/kendo-angular-scheduler';

/* tslint:disable */

const baseData: any[] = [
  {
    TaskID: 4,
    OwnerID: 2,
    Title: 'Joe Smith',
    Description: '',
    StartTimezone: null,
    Start: '2020-04-22T13:00:00.000Z',
    End: '2020-04-22T13:30:00.000Z',
    EndTimezone: null,
    RecurrenceRule: null,
    RecurrenceID: null,
    RecurrenceException: null,
    IsAllDay: false
  },
  {
    TaskID: 0,
    OwnerID: 2,
    Title: 'Suzy Smith',
    Description: '',
    StartTimezone: null,
    Start: '2020-04-22T13:00:00.000Z',
    End: '2020-04-22T13:30:00.000Z',
    EndTimezone: null,
    RecurrenceRule: null,
    RecurrenceID: null,
    RecurrenceException: null,
    IsAllDay: false
  },
  {
    TaskID: 5,
    OwnerID: 2,
    Title: 'Mary Stuber',
    Description: '',
    StartTimezone: null,
    Start: '2020-04-22T14:00:00.000Z',
    End: '2020-04-22T14:30:00.000Z',
    EndTimezone: null,
    RecurrenceRule: null,
    RecurrenceID: null,
    RecurrenceException: null,
    IsAllDay: false
  },
  {
    TaskID: 6,
    OwnerID: 2,
    Title: 'Ann Jaxon',
    Description: '',
    StartTimezone: null,
    Start: '2020-04-22T18:00:00.000Z',
    End: '2020-04-22T18:30:00.000Z',
    EndTimezone: null,
    RecurrenceRule: null,
    RecurrenceID: null,
    RecurrenceException: null,
    IsAllDay: false
  },
  {
    TaskID: 7,
    OwnerID: 2,
    Title: 'Fred Swanson',
    Description: '',
    StartTimezone: null,
    Start: '2020-04-23T13:00:00.000Z',
    End: '2020-04-23T13:30:00.000Z',
    EndTimezone: null,
    RecurrenceRule: null,
    RecurrenceID: null,
    RecurrenceException: null,
    IsAllDay: false
  },
  {
    TaskID: 8,
    OwnerID: 2,
    Title: 'Kenny Rogers',
    Description: '',
    StartTimezone: null,
    Start: '2020-04-23T15:00:00.000Z',
    End: '2020-04-23T15:30:00.000Z',
    EndTimezone: null,
    RecurrenceRule: null,
    RecurrenceID: null,
    RecurrenceException: null,
    IsAllDay: false
  },
  {
    TaskID: 9,
    OwnerID: 2,
    Title: 'Robert Goldthwait',
    Description: '',
    StartTimezone: null,
    Start: '2020-04-23T19:00:00.000Z',
    End: '2020-04-23T19:30:00.000Z',
    EndTimezone: null,
    RecurrenceRule: null,
    RecurrenceID: null,
    RecurrenceException: null,
    IsAllDay: false
  },
  {
    TaskID: 10,
    OwnerID: 2,
    Title: 'Fred Swanson',
    Description: '',
    StartTimezone: null,
    Start: '2020-04-24T13:00:00.000Z',
    End: '2020-04-24T13:30:00.000Z',
    EndTimezone: null,
    RecurrenceRule: null,
    RecurrenceID: null,
    RecurrenceException: null,
    IsAllDay: false
  },
  {
    TaskID: 11,
    OwnerID: 2,
    Title: 'Kenny Rogers',
    Description: '',
    StartTimezone: null,
    Start: '2020-04-24T15:00:00.000Z',
    End: '2020-04-24T15:30:00.000Z',
    EndTimezone: null,
    RecurrenceRule: null,
    RecurrenceID: null,
    RecurrenceException: null,
    IsAllDay: false
  },
  {
    TaskID: 12,
    OwnerID: 2,
    Title: 'Robert Goldthwait',
    Description: '',
    StartTimezone: null,
    Start: '2020-04-24T19:00:00.000Z',
    End: '2020-04-24T19:30:00.000Z',
    EndTimezone: null,
    RecurrenceRule: null,
    RecurrenceID: null,
    RecurrenceException: null,
    IsAllDay: false
  },
  {
    TaskID: 13,
    OwnerID: 2,
    Title: 'Fred Swanson',
    Description: '',
    StartTimezone: null,
    Start: '2020-04-25T13:00:00.000Z',
    End: '2020-04-25T13:30:00.000Z',
    EndTimezone: null,
    RecurrenceRule: null,
    RecurrenceID: null,
    RecurrenceException: null,
    IsAllDay: false
  },
  {
    TaskID: 14,
    OwnerID: 2,
    Title: 'Kenny Rogers',
    Description: '',
    StartTimezone: null,
    Start: '2020-04-25T15:00:00.000Z',
    End: '2020-04-25T15:30:00.000Z',
    EndTimezone: null,
    RecurrenceRule: null,
    RecurrenceID: null,
    RecurrenceException: null,
    IsAllDay: false
  },
  {
    TaskID: 15,
    OwnerID: 2,
    Title: 'Robert Goldthwait',
    Description: '',
    StartTimezone: null,
    Start: '2020-04-25T19:00:00.000Z',
    End: '2020-04-25T19:30:00.000Z',
    EndTimezone: null,
    RecurrenceRule: null,
    RecurrenceID: null,
    RecurrenceException: null,
    IsAllDay: false
  }
];

const parseAdjust = (eventDate: string): Date => {
  return new Date(eventDate);
};

export const sampleData = baseData.map(
  dataItem =>
    ({
      id: dataItem.TaskID,
      start: parseAdjust(dataItem.Start),
      startTimezone: dataItem.startTimezone,
      end: parseAdjust(dataItem.End),
      endTimezone: dataItem.endTimezone,
      isAllDay: dataItem.IsAllDay,
      title: dataItem.Title,
      description: dataItem.Description,
      recurrenceRule: dataItem.RecurrenceRule,
      recurrenceId: dataItem.RecurrenceID,
      recurrenceException: dataItem.RecurrenceException,

      roomId: dataItem.RoomID,
      ownerID: dataItem.OwnerID
    } as SchedulerEvent)
);
