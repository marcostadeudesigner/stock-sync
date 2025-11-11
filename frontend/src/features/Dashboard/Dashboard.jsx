import { Card, CardContent, Typography, CircularProgress, Box, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { useDashboard } from "./useDashboard";

function Dashboard() {
  const navigate = useNavigate();
  const {
    loading,
    error,
    totalItems,
    totalValue,
    formatCurrency
  } = useDashboard();

  // Componente de loading
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, py: 4 }}>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            variant="outlined" 
            sx={{ 
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: 3,
                transform: "translateY(-4px)"
              }
            }}
            onClick={() => navigate("/product")}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ShoppingCartIcon />
                    <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
                      Resumo do Estoque
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Total de itens
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {totalItems}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Valor total
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 1 }}>
                    {formatCurrency(totalValue)}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    startIcon={<ShoppingCartIcon />}
                    sx={{ mt: 2 }}
                  >
                    Ver Produtos
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export { Dashboard };