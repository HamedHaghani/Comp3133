var assert = require("assert");

var calculator = require("../app/calculator")


describe("Testing calculator function", ()=>{
    describe('Add Tests', () => {
        it("add(5, 2) expected result 7 PASS", () => {
            assert.equal(calculator.add(5,2), 7);
        });

        it("add(5,2) Expected result 8 Fail", () => {
            assert.notEqual(calculator.add(2,5), 8);
        });
    })

    describe('Sub tests', () => {

        it("sub(5, 2) expected result 3 PASS", () => {
            assert.equal(calculator.sub(5 ,2), 3);
        });
        it("sub(5,2) expected result 5 FAIL", () => {
            assert.notEqual(calculator.sub(5 ,2), 5);
        })

    })

    describe('multiplication tests' , () => {

        it("mul(5, 2) expected result 10 PASS", () => {
            assert.equal(calculator.mul(5,2), 10);
        });

        it("mul(5,2) expected result 12 FAIL", () => {
            assert.notEqual(calculator.mul(5,2), 12);
        });
    })


    describe('Division Tasts' , () => {

        it("div(10, 2) expected result 5 PASS" , () => {
            assert.equal(calculator.div(10, 2), 5);
        });

        it("div(10,2) expected result 2 FAIL" , () => {
            assert.notEqual(calculator.div(10, 2), 2);
        });
        
        

    })

    
    
})