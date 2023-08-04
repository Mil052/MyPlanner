export class DatePicker {
    year: number;
    month: number;
    monthName: string;
    day: number;

    monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    monthNumberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    constructor(date: Date) {
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.monthName = this.monthNames[this.month];
        this.day = date.getDate();
    }

    nextYear() {
        this.year++;
        if(this.year % 4) {
            this.monthNumberOfDays[1] = 28;
        } else {
            this.monthNumberOfDays[1] = 29;
        }
    }

    previousYear() {
        this.year--;
        if(this.year % 4) {
            this.monthNumberOfDays[1] = 28;
        } else {
            this.monthNumberOfDays[1] = 29;
        }
    }

    nextMonth() {
        this.month = this.month + 1;
        if (this.month === 12) {
            this.month = 0;
            this.nextYear();
        }
        this.monthName = this.monthNames[this.month];
        console.log(this.monthName);
    }

    previousMonth() {
        this.month = this.month - 1;
        if (this.month === -1) {
            this.month = 11;
            this.previousYear();
        }
        this.monthName = this.monthNames[this.month];
        console.log(this.monthName);
    }

    nextDay() {
        this.day++;
        if (this.day > this.monthNumberOfDays[this.month]) {
            this.day = 1;
            this.nextMonth();
        }
    }

    previousDay() {
        this.day--;
        if (this.day === 0) {
            this.previousMonth();
            this.day = this.monthNumberOfDays[this.month];
        }
    }

    get dateFromDatePicker() {
        return new Date(this.year, this.month, this.day);
    }

    calculatePreviousDays(amount: number) {
        const calculatePreviousDay = (currentDay: number, currentMonth: number) => {
            if (currentDay === 1) {
                const prevMonth = (currentMonth -1 + 12) % 12;
                return {day: this.monthNumberOfDays[prevMonth], month: prevMonth};
            } else {
                return {day: (currentDay - 1), month: currentMonth};
            }
        }
        
        const previousDays = [calculatePreviousDay(this.day, this.month)]
        for (let i = 1; i < amount; i++){
            previousDays.push(calculatePreviousDay(previousDays[i-1].day, previousDays[i-1].month));
        }
        return previousDays;
    }

    calculateNextDays(amount: number) {
        const calculateNextDay = (currentDay: number, currentMonth: number) => {
            if (currentDay === this.monthNumberOfDays[currentMonth]) {
                const nextMonth = (currentMonth + 1) % 12;
                return {day: 1, month: nextMonth};
            } else {
                return {day: (currentDay + 1), month: currentMonth};
            }
        }
        const nextDays = [calculateNextDay(this.day, this.month)];
        for (let i = 1; i < amount; i++){
            nextDays.push(calculateNextDay(nextDays[i-1].day, nextDays[i-1].month));
        }
        return nextDays;
    }
}