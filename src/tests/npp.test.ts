import { npp } from '../algorithms/npp';

test.each([
    [
        [0, 1, 2, 3], // Arrival times
        [5, 4, 2, 1], // Burst times
        [2, 1, 3, 4], // Priorities (lower value = higher priority)
        {
            solvedProcessesInfo: [
                { job: 1, at: 1, bt: 4, ft: 5, tat: 4, wat: 0 },
                { job: 0, at: 0, bt: 5, ft: 10, tat: 10, wat: 5 },
                { job: 2, at: 2, bt: 2, ft: 12, tat: 10, wat: 8 },
                { job: 3, at: 3, bt: 1, ft: 13, tat: 10, wat: 9 }
            ],
            ganttChartInfo: [
                { job: 1, start: 1, stop: 5 },
                { job: 0, start: 5, stop: 10 },
                { job: 2, start: 10, stop: 12 },
                { job: 3, start: 12, stop: 13 }
            ]
        }
    ]
])('NPP test %#', (arrivalTime, burstTime, priorities, expected) => {
    expect(npp(arrivalTime, burstTime, priorities)).toEqual(expected);
});
