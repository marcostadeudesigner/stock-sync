export function useProductEdit(product, onSave, loading) {
  const isValid = (prod) => {
    return prod && 
           prod.product && 
           prod.product.trim() && 
           prod.price !== "" && 
           !isNaN(parseFloat(prod.price)) && 
           parseFloat(prod.price) > 0;
  };

  const handleChange = (field, value) => {
    onSave("change", { ...product, [field]: value });
  };

  const handleSave = () => {
    onSave("save", product);
  };

  return {
    isValid: isValid(product),
    handleChange,
    handleSave,
    loading
  };
}