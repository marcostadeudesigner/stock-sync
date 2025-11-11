import { Box, TextField, Button, Paper, Typography, Alert } from "@mui/material";
import { useProductCreate } from "./useProductCreate";

function ProductCreate({ onCreate, loading }) {
  const {
    form,
    error,
    handleChange,
    submit,
    isValid,
    loading: submitLoading
  } = useProductCreate(onCreate, loading);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Novo Produto
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}
      <Box component="form" onSubmit={submit} sx={{ mt: 1 }}>
        <TextField
          fullWidth
          label="Nome do Produto"
          name="product"
          value={form.product}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Preço"
          name="price"
          type="number"
          inputProps={{ step: "0.01", min: "0" }}
          value={form.price}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={!isValid || submitLoading}
        >
          {submitLoading ? "Criando..." : "Criar Produto"}
        </Button>
      </Box>
    </Paper>
  );
}

export { ProductCreate };