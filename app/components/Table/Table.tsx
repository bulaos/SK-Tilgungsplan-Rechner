import { RepaymentSchedule } from "@/app/repayment-plan/calculateRepaymentPlan";
import { formatToEuroString } from "@/app/utils/formatToEuroString";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const TableUI = ({ data }: { data: RepaymentSchedule[] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ width: "100%", overflowX: "auto", pt: 2 }}>
      <Typography
        component="h3"
        variant="h6"
        textAlign="center"
        fontWeight="bold"
      >
        Tilgungsplanübersicht
      </Typography>
      <TableContainer>
        {isMobile ? (
          <Box>
            {data.map((row, index) => (
              <Box
                key={index}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: 2,
                  mt: 1,
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  color="textPrimary"
                  textAlign="center"
                >
                  Jahr: {row.year}
                </Typography>
                <KeyValuePairRow title="Rate" value={row.payment} />
                <KeyValuePairRow
                  title="Zinsanteil"
                  value={row.interestAmount}
                />
                <KeyValuePairRow
                  title="Tilgungsanteil"
                  value={row.repaymentAmount}
                />
                <KeyValuePairRow title="Restschuld" value={row.remainingDebt} />
              </Box>
            ))}
          </Box>
        ) : (
          <Table aria-label="Tilgungsplan Tabelle" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Jahr</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Rate</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Zinsanteil</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Tilgungsanteil
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Restschuld</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "#f9f9f9" },
                    "&:hover": { bgcolor: "#f1f1f1" },
                  }}
                >
                  <TableCell sx={{ padding: "16px", fontSize: "16px" }}>
                    {row.year}
                  </TableCell>
                  <TableCell sx={{ padding: "16px", fontSize: "16px" }}>
                    {formatToEuroString(row.payment)}
                  </TableCell>
                  <TableCell sx={{ padding: "16px", fontSize: "16px" }}>
                    {formatToEuroString(row.interestAmount)}
                  </TableCell>
                  <TableCell sx={{ padding: "16px", fontSize: "16px" }}>
                    {formatToEuroString(row.repaymentAmount)}
                  </TableCell>
                  <TableCell sx={{ padding: "16px", fontSize: "16px" }}>
                    {formatToEuroString(row.remainingDebt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

const KeyValuePairRow = ({
  title,
  value,
}: {
  title: string;
  value: number;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      borderBottom={1}
      borderColor="#292929"
    >
      <Typography color="textPrimary">{title}</Typography>
      <Typography color="textPrimary">{formatToEuroString(value)}</Typography>
    </Box>
  );
};
