// Products.jsx
import { Container, Grid, Alert, Box } from "@mui/material";
import { ProductCreate } from "./ProductCreate";
import { ProductList } from "./ProductList";
import { ProductEditDialog } from "./ProductEditDialog";
import { useProducts } from "./useProducts"; // Importe o hook

function Products() {
  const {
    products,
    loading,
    error,
    editOpen,
    editing,
    createProduct,
    openEdit,
    handleEditSave,
    handleDelete,
    closeEditDialog,
  } = useProducts(); // Use o hook

  return (
    <Container maxWidth="lg" sx={{ py: 4, height: '100vh' }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Grid container spacing={3} sx={{ height: '100%' }}>
        <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ height: '100%' }}>
            <ProductCreate onCreate={createProduct} loading={loading} />
          </Box>
        </Grid>
        <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ height: '100%' }}>
            <ProductList 
              products={products} 
              loading={loading} 
              onEdit={openEdit} 
              onDelete={handleDelete} 
            />
          </Box>
        </Grid>
      </Grid>

      <ProductEditDialog
        open={editOpen}
        product={editing}
        onClose={closeEditDialog}
        onSave={handleEditSave}
        loading={loading}
      />
    </Container>
  );
}

export { Products };