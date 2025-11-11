import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Alert } from "@mui/material";
import { ProductCreate } from "./ProductCreate";
import { ProductList } from "./ProductList";
import { ProductEditDialog } from "./ProductEditDialog";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "./productsSlice";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const createProduct = async (payload) => {
    await dispatch(addProduct(payload)).unwrap();
  };

  const openEdit = (product) => {
    setEditing({ ...product });
    setEditOpen(true);
  };

  const handleEditSave = async (action, data) => {
    if (action === "change") {
      setEditing(data);
      return;
    }

    try {
      await dispatch(updateProduct({ id: data.id, data: { product: data.product, price: data.price } })).unwrap();
      setEditOpen(false);
      setEditing(null);
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
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