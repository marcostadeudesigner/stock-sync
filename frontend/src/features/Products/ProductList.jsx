import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Typography, Paper
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

function ProductList({ products, loading, onEdit, onDelete }) {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Lista de Produtos ({products.length})
      </Typography>

      {products.length === 0 ? (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Nenhum produto cadastrado
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Produto</strong></TableCell>
                <TableCell align="right"><strong>Preço</strong></TableCell>
                <TableCell align="center"><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>{p.product}</TableCell>
                  <TableCell align="right">R$ {parseFloat(p.price).toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => onEdit(p)}
                      disabled={loading}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDelete(p.id)}
                      disabled={loading}
                    >
                      Deletar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export { ProductList };