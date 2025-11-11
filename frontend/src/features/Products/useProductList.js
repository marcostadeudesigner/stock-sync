// useProductList.js
export function useProductList(products, loading, onEdit, onDelete) {
  const formatPrice = (price) => {
    return `R$ ${parseFloat(price).toFixed(2)}`;
  };

  const isEmpty = products.length === 0;

  const handleEdit = (product) => {
    onEdit(product);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  return {
    products,
    loading,
    isEmpty,
    formatPrice,
    handleEdit,
    handleDelete
  };
}