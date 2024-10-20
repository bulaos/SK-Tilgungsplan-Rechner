export type LoanInput = {
  loanAmount: number;
  interestRate: number;
  initialRepaymentRate: number;
  interestLockInYears?: number;
};

export type RepaymentSchedule = {
  year: number;
  payment: number;
  interestAmount: number;
  repaymentAmount: number;
  remainingDebt: number;
};

export type LoanResult = {
  monthlyPayment: number;
  remainingDebtAtInterestLock: number;
  repaymentSchedule: RepaymentSchedule[];
};

const calculateMonthlyRepayment = (
  loanAmount: number,
  monthlyInterestRate: number,
  initialRepaymentRateDecimal: number
): number => {
  const repayment =
    loanAmount * (monthlyInterestRate + initialRepaymentRateDecimal / 12);
  // had a rounding error, this ensures decimal precision
  return parseFloat(repayment.toFixed(2));
};

const calculateInterestAndRepayment = (
  remainingDebt: number,
  monthlyInterestRate: number,
  monthlyRepayment: number
): { interestAmount: number; repaymentAmount: number; newDebt: number } => {
  const interestAmount = remainingDebt * monthlyInterestRate;
  const repaymentAmount = monthlyRepayment - interestAmount;
  const newDebt = remainingDebt - repaymentAmount;

  return { interestAmount, repaymentAmount, newDebt: Math.max(newDebt, 0) };
};

export const calculateRepaymentPlan = ({
  loanAmount,
  interestRate,
  initialRepaymentRate,
  interestLockInYears = 0,
}: LoanInput): LoanResult => {
  const annualInterestRate = interestRate / 100;
  const monthlyInterestRate = annualInterestRate / 12;
  const initialRepaymentRateDecimal = initialRepaymentRate / 100;

  const monthlyRepayment = calculateMonthlyRepayment(
    loanAmount,
    monthlyInterestRate,
    initialRepaymentRateDecimal
  );

  let remainingDebt = loanAmount;
  const repaymentSchedule: RepaymentSchedule[] = [];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  let remainingDebtAtInterestLock = 0;
  // needed as debt can be repaid before the last year ends
  let lastYearMonthCount = 12;

  for (let year = 1; remainingDebt > 0; year++) {
    let totalInterestForYear = 0;
    let totalRepaymentForYear = 0;
    // can't use 12 as a default as the year will not always have
    // 12 at the moment of taking a loan
    const monthsInYear = year === 1 ? 12 - currentMonth : 12;

    for (let month = 1; month <= monthsInYear; month++) {
      const { interestAmount, repaymentAmount, newDebt } =
        calculateInterestAndRepayment(
          remainingDebt,
          monthlyInterestRate,
          monthlyRepayment
        );

      totalInterestForYear += interestAmount;
      totalRepaymentForYear += repaymentAmount;
      remainingDebt = newDebt;

      if (remainingDebt === 0) {
        lastYearMonthCount = month;
        break;
      }
    }

    // as mentioned above, lastYearMonthCount is needed to only consider the months until the debt is fully repaid
    repaymentSchedule.push({
      year: currentYear + year - 1,
      payment:
        monthlyRepayment *
        (remainingDebt === 0 ? lastYearMonthCount : monthsInYear),
      interestAmount: totalInterestForYear,
      repaymentAmount: totalRepaymentForYear,
      remainingDebt,
    });

    // current year is counted, that's why we need to add + 1 to show the proper value
    // e.g. year 1 is 2024 but we count one year from 2024 to 2025
    if (interestLockInYears > 0 && year === interestLockInYears + 1) {
      remainingDebtAtInterestLock = remainingDebt;
    }

    if (remainingDebt === 0) break;
  }

  return {
    monthlyPayment: monthlyRepayment,
    remainingDebtAtInterestLock,
    repaymentSchedule,
  };
};
