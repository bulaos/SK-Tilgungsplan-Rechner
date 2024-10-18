"use client";
import { formatToEuroString } from "@/app/utils/formatToEuroString";
import { Box, Button, Slider, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  calculateLoan,
  LoanResult,
} from "../../repayment-plan/calculateRepaymentPlan";
import { FormInput } from "../Input/FormInput";
import { TableUI } from "../Table/Table";

const SLIDER_MIN_VALUE = 0;
const SLIDER_MAX_VALUE = 30;

export type FormValues = {
  loan: number;
  interestRate: number;
  initialRepaymentRate: number;
  interestLockInYears: number;
};

export const RepaymentForm = () => {
  const [showTable, setShowTable] = useState(false);
  const [loanData, setLoanData] = useState<LoanResult | null>(null);
  const [hideButton, setHideButton] = useState(false);

  const formRef = useRef<HTMLDivElement | null>(null);

  const {
    control,
    getValues,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      loan: 250000,
      interestRate: 2,
      initialRepaymentRate: 3,
      interestLockInYears: 0,
    },
  });

  const watchedValues = watch([
    "loan",
    "interestRate",
    "initialRepaymentRate",
    "interestLockInYears",
  ]);

  const previousValues = useRef<FormValues>({
    loan: 0,
    interestRate: 0,
    initialRepaymentRate: 0,
    interestLockInYears: 0,
  });

  const calculateAndUpdate = () => {
    const formValues = getValues();

    if (
      formValues.loan > 0 &&
      formValues.interestRate > 0 &&
      formValues.initialRepaymentRate > 0
    ) {
      const result = calculateLoan({
        loanAmount: formValues.loan,
        interestRate: formValues.interestRate,
        initialRepaymentRate: formValues.initialRepaymentRate,
        interestLockInYears: formValues.interestLockInYears,
      });
      setLoanData(result);
    } else {
      setLoanData(null);
    }
  };

  useEffect(() => {
    if (showTable) {
      const currentValues = getValues();

      if (
        currentValues.loan !== previousValues.current.loan ||
        currentValues.interestRate !== previousValues.current.interestRate ||
        currentValues.initialRepaymentRate !==
          previousValues.current.initialRepaymentRate ||
        currentValues.interestLockInYears !==
          previousValues.current.interestLockInYears
      ) {
        calculateAndUpdate();
        previousValues.current = currentValues;
      }
    }
  }, [watchedValues, showTable]);

  const handleCalculate = () => {
    calculateAndUpdate();
    setShowTable(true);
    setHideButton(true);

    // Scroll down to the table
    setTimeout(() => {
      const element = document.getElementById("tableSection");
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY; // Get the absolute position of the element
        window.scrollTo({
          top: elementPosition - 200, // Offset by -20px
          behavior: "smooth", // Smooth scrolling
        });
      }
    }, 100);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isFormIncomplete =
    !watchedValues[0] || !watchedValues[1] || !watchedValues[2];

  return (
    <>
      <Typography
        component="h2"
        variant="h5"
        color="textPrimary"
        pb={2}
        textAlign="center"
      >
        Berechnen Sie Ihren Tilgungsplan
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
        ref={formRef}
      >
        <form>
          <Controller
            name="loan"
            control={control}
            render={({ field }) => (
              <FormInput
                aria-label="Darlehensbetrag - Input"
                field={field}
                label="Darlehensbetrag"
                startAdornment="€"
                customErrorMessage="Bitte geben Sie einen Betrag ein"
              />
            )}
          />
          <Controller
            name="interestRate"
            control={control}
            render={({ field }) => (
              <FormInput
                aria-label="Zinsatz - Input"
                field={field}
                label="Zinssatz"
                startAdornment="%"
                customErrorMessage="Bitte geben Sie einen Zinsatz in % ein"
              />
            )}
          />
          <Controller
            aria-label="Anfängliche Tilgung - Input"
            name="initialRepaymentRate"
            control={control}
            render={({ field }) => (
              <FormInput
                field={field}
                label="Anfängliche Tilgung"
                startAdornment="%"
                customErrorMessage="Bitte geben Sie den Wert in % ein"
              />
            )}
          />
          <Box display="flex" alignItems="center" width="100%" maxWidth="800px">
            <Controller
              name="interestLockInYears"
              control={control}
              render={({ field }) => (
                <Slider
                  {...field}
                  value={field.value}
                  onChange={(_, newValue) => {
                    setValue("interestLockInYears", newValue as number);
                  }}
                  step={1}
                  min={SLIDER_MIN_VALUE}
                  max={SLIDER_MAX_VALUE}
                  valueLabelDisplay="auto"
                  sx={{ flex: 1, mr: 2 }}
                  aria-label="Slider"
                />
              )}
            />
            <Controller
              name="interestLockInYears"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  color="secondary"
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    // need this check to set value to 0 else app will crash
                    if (value === "") {
                      setValue("interestLockInYears", 0);
                      return;
                    }
                    const newValue = Math.max(
                      SLIDER_MIN_VALUE,
                      Math.min(SLIDER_MAX_VALUE, parseInt(e.target.value))
                    );
                    setValue("interestLockInYears", newValue);
                  }}
                  label="Jahre"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      min: SLIDER_MIN_VALUE,
                      max: SLIDER_MAX_VALUE,
                    },
                  }}
                  sx={{ width: "80px" }}
                />
              )}
            />
          </Box>
          {!hideButton ? (
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                onClick={handleCalculate}
                color="primary"
                disabled={isFormIncomplete}
                aria-label="Tilgungsplan Berechnen"
              >
                Berechnen
              </Button>
            </Box>
          ) : undefined}
        </form>
        {loanData && (
          <Box mt={4} textAlign="center" id="tableSection">
            <Typography variant="h6" color="textPrimary">
              Monatliche Rate:
            </Typography>
            <Typography variant="body1" color="textPrimary" fontWeight="bold">
              {formatToEuroString(loanData.monthlyPayment)}
            </Typography>

            {loanData.remainingDebtAtInterestLock !== 0 ? (
              <>
                <Typography variant="subtitle1" color="textPrimary" mt={2}>
                  Restschuld (Ende der Zinsbindung):
                </Typography>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  fontWeight="bold"
                >
                  {formatToEuroString(loanData.remainingDebtAtInterestLock)}
                </Typography>
              </>
            ) : undefined}
          </Box>
        )}
      </Box>

      {showTable && loanData && (
        <>
          <TableUI data={loanData.repaymentSchedule} />
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="outlined"
              onClick={scrollToForm}
              aria-label=" Neu Berechnen"
            >
              Neu Berechnen
            </Button>
          </Box>
        </>
      )}
    </>
  );
};
