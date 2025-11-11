import { useState, useEffect } from "react";
import { api } from "@shared/api";

export function useDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/products/");
        if (mounted) {
          setProducts(res.data || []);
          setError("");
        }
      } catch (err) {
        console.error(err);
        if (mounted) setError("Erro ao carregar produtos");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    
    fetchProducts();
    return () => { mounted = false; };
  }, []);

  // Calcula métricas do dashboard
  const totalItems = products.length;
  const totalValue = products.reduce((sum, p) => {
    const value = parseFloat(p.price);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  // Formata valor para moeda brasileira
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", { 
      style: "currency", 
      currency: "BRL" 
    }).format(value);
  };

  return {
    products,
    loading,
    error,
    totalItems,
    totalValue,
    formatCurrency,
  };
}