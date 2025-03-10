import Student from "./IStudent";

class FullTimeStudent implements Student {
    sid: number;
    snm: string;
    per: number;
    isPass: boolean;
    studentType: string;

    constructor(sid: number, snm: string, per: number, isPass: boolean, studentType: string) {
        this.sid = sid;
        this.snm = snm;
        this.per = per;
        this.isPass = isPass;
        this.studentType = studentType;
    }

    print(): void {
        console.log(`Student Type: ${this.studentType}`);
    }
}

export default FullTimeStudent;
