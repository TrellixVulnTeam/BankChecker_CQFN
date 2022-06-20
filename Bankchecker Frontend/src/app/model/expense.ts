export class Expense {
    public id: number;
    public date: Date;
    public value: number;
    public notes: string;
    public user_id: number;


    constructor(id: number, date: Date, value: number, notes: string, user_id: number) {
        this.id = id;
        this.date = date;
        this.value = value;
        this.notes = notes;
        this.user_id = user_id;
    }
}