import { useState } from "react";

export function useProductCreate(onCreate, loading) {
  const [form, setForm] = useState({ product: "", price: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const isValid = () => {
    return form.product.trim() !== "" && 
           form.price.trim() !== "" && 
           !isNaN(parseFloat(form.price)) && 
           parseFloat(form.price) > 0;
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

  return {
    form,
    error,
    handleChange,
    submit,
    isValid: isValid(),
    loading
  };
}