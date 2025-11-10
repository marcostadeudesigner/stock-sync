import { useState } from "react";
import { Box, TextField, Button, Paper, Typography, Alert } from "@mui/material";

function ProductCreate({ onCreate, loading }) {
  const [form, setForm] = useState({ product: "", price: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const isValid = () => {
    return form.product.trim() !== "" && form.price.trim() !== "" && !isNaN(parseFloat(form.price)) && parseFloat(form.price) > 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      setError("Preencha nome e preço (preço > 0).");
      return;
    }
    await onCreate(form);
    setForm({ product: "", price: "" });
  };

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
          disabled={!isValid() || loading}
        >
          {loading ? "Criando..." : "Criar Produto"}
        </Button>
      </Box>
    </Paper>
  );
}

export { ProductCreate };