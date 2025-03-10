"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FullTimeStudent = /** @class */ (function () {
    function FullTimeStudent(sid, snm, per, isPass, studentType) {
        this.sid = sid;
        this.snm = snm;
        this.per = per;
        this.isPass = isPass;
        this.studentType = studentType;
    }
    FullTimeStudent.prototype.print = function () {
        console.log("Student Type: ".concat(this.studentType));
    };
    return FullTimeStudent;
}());
exports.default = FullTimeStudent;
