"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PartTimeStudent = /** @class */ (function () {
    function PartTimeStudent(sid, snm, per, isPass, studentType) {
        this.fees = 0;
        this.sid = sid;
        this.snm = snm;
        this.per = per;
        this.isPass = isPass;
        this.studentType = studentType;
    }
    PartTimeStudent.prototype.display = function () {
        console.log(this.sid);
        console.log(this.studentType);
    };
    PartTimeStudent.prototype.getStudentType = function () {
        return this.studentType;
    };
    return PartTimeStudent;
}());
exports.default = PartTimeStudent;
