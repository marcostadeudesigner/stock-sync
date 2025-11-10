import { useState, useEffect } from "react";
import { api } from "@shared/api";
import { Container, Grid, Alert } from "@mui/material";
import { ProductCreate } from "./ProductCreate";
import { ProductList } from "./ProductList";
import { ProductEditDialog } from "./ProductEditDialog";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => { getProducts(); }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products/");
      setProducts(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar produtos");
    } finally { setLoading(false); }
  };

  const createProduct = async (payload) => {
    setLoading(true);
    try {
      await api.post("/products/", payload);
      await getProducts();
    } catch (err) {
      console.error(err);
      setError("Erro ao criar produto");
    } finally { setLoading(false); }
  };

  const openEdit = (product) => {
    // keep an editable copy
    setEditing({ ...product });
    setEditOpen(true);
  };

  const handleEditSave = async (action, data) => {
    if (action === "change") {
      setEditing(data);
      return;
    }
    // action === "save"
    setLoading(true);
    try {
      await api.put(`/products/${data.id}/`, { product: data.product, price: data.price });
      await getProducts();
      setEditOpen(false);
      setEditing(null);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar produto");
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/products/${id}/`);
      await getProducts();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Erro ao deletar produto");
    } finally { setLoading(false); }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <ProductCreate onCreate={createProduct} loading={loading} />
        </Grid>
        <Grid item xs={12} md={7}>
          <ProductList products={products} loading={loading} onEdit={openEdit} onDelete={handleDelete} />
        </Grid>
      </Grid>

      <ProductEditDialog
        open={editOpen}
        product={editing}
        onClose={() => { setEditOpen(false); setEditing(null); }}
        onSave={handleEditSave}
        loading={loading}
      />
    </Container>
  );
}

export { Products };