import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

function ProductEditDialog({ open, product, onClose, onSave, loading }) {
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
          onChange={(e) => onSave("change", { ...product, product: e.target.value })}
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
          onChange={(e) => onSave("change", { ...product, price: e.target.value })}
          margin="normal"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={() => onSave("save", product)}
          color="primary"
          variant="contained"
          disabled={loading || !product.product.trim() || product.price === "" || isNaN(parseFloat(product.price)) || parseFloat(product.price) <= 0}
        >
          {loading ? "Atualizando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { ProductEditDialog };