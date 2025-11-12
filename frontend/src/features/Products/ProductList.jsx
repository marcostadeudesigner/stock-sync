import {
   TableCell, TableRow,
  Button, Typography, Paper, Box, Tooltip
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { AutoSizer, Column, Table as VirtualizedTable } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { cellStyle, headerCellStyle } from "./productsConstants";



function ProductList({ products, loading, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <Paper elevation={0} sx={{ p: 1 }}>
        <Typography variant="h6" gutterBottom>
          Lista de Produtos (0)
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Nenhum produto cadastrado
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} sx={{ p: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Lista de Produtos ({products.length})
      </Typography>

      <Box sx={{ flex: 1, minHeight: 400, overflowX: 'auto' }}>
        <AutoSizer>
          {({ width, height }) => (
            <VirtualizedTable
              width={width < 500 ? 500 : width}
              height={height}
              headerHeight={50}
              rowHeight={60}
              rowCount={products.length}
              rowGetter={({ index }) => products[index]}
              rowRenderer={({ index, key, style, columns }) => (
                <TableRow component="div" key={key} style={{ ...style, display: 'flex' }} hover>
                  {columns}
                </TableRow>
              )}
              headerClassName="table-header"
              rowClassName="table-row"
            >
              <Column
                label="Produto"
                dataKey="product"
                width={width < 500 ? 250 : width }
                headerRenderer={({ label }) => (
                  <TableCell component="div" variant="head" style={headerCellStyle}>
                    <strong>{label}</strong>
                  </TableCell>
                )}
                cellRenderer={({ cellData }) => (
                  <TableCell component="div" variant="body" style={cellStyle}>
                    {cellData}
                  </TableCell>
                )}
                flexGrow={1}
              />
              <Column
                label="Preço"
                dataKey="price"
                width={width < 500 ? 150 : width * 0.2}
                headerRenderer={({ label }) => (
                  <TableCell component="div" variant="head" style={headerCellStyle}>
                    <strong>{label}</strong>
                  </TableCell>
                )}
                cellRenderer={({ cellData }) => (
                  <TableCell component="div" variant="body" align="right" style={cellStyle}>
                    R$ {parseFloat(cellData).toFixed(2)}
                  </TableCell>
                )}
              />
              <Column
                label="Ações"
                dataKey="id"
                width={ 500 ? 100 : width * 0.15}
                headerRenderer={({ label }) => (
                  <TableCell component="div" variant="head" style={headerCellStyle}>
                    <strong>{label}</strong>
                  </TableCell>
                )}
                cellRenderer={({ rowData }) => (
                  <TableCell component="div" variant="body" align="center" style={cellStyle}>
                    <Tooltip title="Editar produto" arrow>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => onEdit(rowData)}
                        disabled={loading}
                        sx={{ 
                          mr: 1, 
                          minWidth: 'auto',
                          width: 40,
                          height: 40,
                          padding: 0
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Deletar produto" arrow>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => onDelete(rowData.id)}
                        disabled={loading}
                        sx={{ 
                          minWidth: 'auto',
                          width: 40,
                          height: 40,
                          padding: 0
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </Tooltip>
                  </TableCell>
                )}
              />
            </VirtualizedTable>
          )}
        </AutoSizer>
      </Box>
    </Paper>
  );
}

export { ProductList };