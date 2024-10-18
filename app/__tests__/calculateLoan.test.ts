import {
  calculateLoan,
  LoanInput,
  LoanResult,
} from "../repayment-plan/calculateRepaymentPlan";
import { expect, describe, it } from "@jest/globals";

describe("Loan Calculation", () => {
  test("calculates monthly repayment correctly", () => {
    const loanInput: LoanInput = {
      loanAmount: 250000,
      interestRate: 2,
      initialRepaymentRate: 2,
    };

    const result: LoanResult = calculateLoan(loanInput);

    expect(result.monthlyPayment).toBeCloseTo(833.33, 2);
  });

  test("calculates repayment schedule correctly", () => {
    const loanInput: LoanInput = {
      loanAmount: 250000,
      interestRate: 2,
      initialRepaymentRate: 2,
      interestLockInYears: 9,
    };

    const result: LoanResult = calculateLoan(loanInput);

    expect(result.repaymentSchedule.length).toBeGreaterThan(0);
    expect(
      result.repaymentSchedule[result.repaymentSchedule.length - 1]
        .remainingDebt
    ).toBe(0);
  });

  test("saves remaining debt at interest lock-in years", () => {
    const loanInput: LoanInput = {
      loanAmount: 250000,
      interestRate: 2,
      initialRepaymentRate: 2,
      interestLockInYears: 9,
    };

    const result: LoanResult = calculateLoan(loanInput);

    expect(result.remainingDebtAtInterestLock).toBeGreaterThan(0);
  });
});
