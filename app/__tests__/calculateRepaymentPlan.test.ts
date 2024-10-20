import {
  calculateRepaymentPlan,
  LoanInput,
  LoanResult,
} from "../repayment-plan/calculateRepaymentPlan";
import { expect, describe } from "@jest/globals";

describe("Loan Calculation", () => {
  test("calculates monthly repayment correctly", () => {
    const loanInput: LoanInput = {
      loanAmount: 250000,
      interestRate: 2,
      initialRepaymentRate: 2,
    };

    const result: LoanResult = calculateRepaymentPlan(loanInput);

    expect(result.monthlyPayment).toBeCloseTo(833.33, 2);
  });

  test("calculates repayment schedule length correctly", () => {
    const loanInput: LoanInput = {
      loanAmount: 300000,
      interestRate: 2,
      initialRepaymentRate: 2,
      interestLockInYears: 9,
    };

    const result: LoanResult = calculateRepaymentPlan(loanInput);

    expect(result.repaymentSchedule.length).toBeGreaterThan(0);
  });

  test("remaining debt is fully repaid by last year", () => {
    const loanInput: LoanInput = {
      loanAmount: 250000,
      interestRate: 2,
      initialRepaymentRate: 2,
      interestLockInYears: 0,
    };

    const result: LoanResult = calculateRepaymentPlan(loanInput);

    expect(
      result.repaymentSchedule[result.repaymentSchedule.length - 1]
        .remainingDebt
    ).toBe(0);
  });

  test("saves remaining debt at interest lock-in years", () => {
    const loanInput: LoanInput = {
      loanAmount: 250000,
      interestRate: 5,
      initialRepaymentRate: 2,
      interestLockInYears: 6,
    };

    const result: LoanResult = calculateRepaymentPlan(loanInput);

    const remainingDebtAtInterestLock =
      Math.round(result.remainingDebtAtInterestLock * 100) / 100;

    expect(remainingDebtAtInterestLock).toEqual(213971.99);
  });

  test("remaining debt is fully repaid by last year", () => {
    const loanInput: LoanInput = {
      loanAmount: 250000,
      interestRate: 2,
      initialRepaymentRate: 2,
      interestLockInYears: 0,
    };

    const result: LoanResult = calculateRepaymentPlan(loanInput);

    expect(
      result.repaymentSchedule[result.repaymentSchedule.length - 1]
        .remainingDebt
    ).toBe(0);
  });

  test("monthly payment equals interestAmount + repaymentAmount", () => {
    const loanInput: LoanInput = {
      loanAmount: 250000,
      interestRate: 2,
      initialRepaymentRate: 2,
      interestLockInYears: 0,
    };

    const result: LoanResult = calculateRepaymentPlan(loanInput);

    expect(result.repaymentSchedule[0].payment).toEqual(
      result.repaymentSchedule[0].interestAmount +
        result.repaymentSchedule[0].repaymentAmount
    );
  });
});
