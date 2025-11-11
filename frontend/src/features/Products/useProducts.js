import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "./productsSlice";

export function useProducts() {
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
      await dispatch(
        updateProduct({ 
          id: data.id, 
          data: { product: data.product, price: data.price } 
        })
      ).unwrap();
      setEditOpen(false);
      setEditing(null);
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
  };

  const closeEditDialog = () => {
    setEditOpen(false);
    setEditing(null);
  };

  return {
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
  };
}