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

export const calculateLoan = ({
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

  for (let year = 1; remainingDebt > 0; year++) {
    let totalInterestForYear = 0;
    let totalRepaymentForYear = 0;
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

      if (remainingDebt === 0) break;
    }

    repaymentSchedule.push({
      year: currentYear + year - 1,
      payment: monthlyRepayment * monthsInYear,
      interestAmount: totalInterestForYear,
      repaymentAmount: totalRepaymentForYear,
      remainingDebt,
    });

    if (interestLockInYears > 0 && year === interestLockInYears) {
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
