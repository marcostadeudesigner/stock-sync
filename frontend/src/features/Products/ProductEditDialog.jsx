import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { useProductEdit } from "./useProductEdit";

function ProductEditDialog({ open, product, onClose, onSave, loading }) {
  const {
    isValid,
    handleChange,
    handleSave,
    loading: saveLoading
  } = useProductEdit(product, onSave, loading);

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Produto</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <TextField
          fullWidth
          label="Nome do Produto"
          name="product"
          value={product.product}
          onChange={(e) => handleChange("product", e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Preço"
          name="price"
          type="number"
          inputProps={{ step: "0.01", min: "0" }}
          value={product.price}
          onChange={(e) => handleChange("price", e.target.value)}
          margin="normal"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={saveLoading || !isValid}
        >
          {saveLoading ? "Atualizando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { ProductEditDialog };