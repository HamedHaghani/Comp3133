import Student from "./IStudent";

export default class PartTimeStudent implements Student {
    readonly sid: number;
    snm: string;
    per: number;
    isPass: boolean;
    private studentType: string;
    protected fees: number = 0;

    constructor(sid: number, snm: string, per: number, isPass: boolean, studentType: string) {
        this.sid = sid;
        this.snm = snm;
        this.per = per;
        this.isPass = isPass;
        this.studentType = studentType;
    }

    display(): void {
        console.log(this.sid);
        console.log(this.studentType);
    }

    getStudentType(): string {
        return this.studentType;
    }
}
