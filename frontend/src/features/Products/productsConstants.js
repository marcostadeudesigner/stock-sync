import { Margin } from "@mui/icons-material";

// Styles for consistent cell appearance
const cellStyle = {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  borderBottom: '1px solid rgba(224, 224, 224, 1)',
  boxSizing: 'border-box',
};

const headerCellStyle = {
  ...cellStyle,
  backgroundColor: '#f5f5f5',
  padding: '5px',
};

export { cellStyle, headerCellStyle };