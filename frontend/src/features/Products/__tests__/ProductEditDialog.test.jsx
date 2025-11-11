import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductEditDialog } from "../ProductEditDialog";

describe("ProductEditDialog", () => {
  const baseProduct = { id: 1, product: "Old", price: "5.00" };

  test("renders dialog with product data when open", () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    render(
      <ProductEditDialog 
        open={true} 
        product={{ ...baseProduct }} 
        onClose={onClose} 
        onSave={onSave} 
        loading={false} 
      />
    );

    expect(screen.getByText(/Editar Produto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome do Produto/i)).toHaveValue("Old");
    expect(screen.getByLabelText(/Preço/i)).toHaveValue(5.00);
  });

  test("does not render dialog when open is false", () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    render(
      <ProductEditDialog 
        open={false} 
        product={{ ...baseProduct }} 
        onClose={onClose} 
        onSave={onSave} 
        loading={false} 
      />
    );

    expect(screen.queryByText(/Editar Produto/i)).not.toBeInTheDocument();
  });

  test("calls onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    const onClose = jest.fn();

    render(
      <ProductEditDialog 
        open={true} 
        product={{ ...baseProduct }} 
        onClose={onClose} 
        onSave={onSave} 
        loading={false} 
      />
    );

    const cancelButton = screen.getByRole("button", { name: /Cancelar/i });
    await user.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("calls onSave when save button is clicked with valid data", async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    const onClose = jest.fn();

    render(
      <ProductEditDialog 
        open={true} 
        product={{ ...baseProduct }} 
        onClose={onClose} 
        onSave={onSave} 
        loading={false} 
      />
    );

    const saveButton = screen.getByRole("button", { name: /Salvar/i });
    
    await waitFor(() => {
      expect(saveButton).not.toBeDisabled();
    });

    await user.click(saveButton);

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledTimes(1);
    });
  });

  test("save button is disabled when loading", () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    render(
      <ProductEditDialog 
        open={true} 
        product={{ ...baseProduct }} 
        onClose={onClose} 
        onSave={onSave} 
        loading={true} 
      />
    );

    const saveButton = screen.getByRole("button", { name: /Atualizando/i });
    expect(saveButton).toBeDisabled();
  });

  test("save button is disabled with invalid product name", () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    const invalidProduct = { id: 1, product: "", price: "5.00" };

    render(
      <ProductEditDialog 
        open={true} 
        product={invalidProduct} 
        onClose={onClose} 
        onSave={onSave} 
        loading={false} 
      />
    );

    const saveButton = screen.getByRole("button", { name: /Salvar/i });
    expect(saveButton).toBeDisabled();
  });

  test("save button is disabled with invalid price", () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    const invalidProduct = { id: 1, product: "Test", price: "" };

    render(
      <ProductEditDialog 
        open={true} 
        product={invalidProduct} 
        onClose={onClose} 
        onSave={onSave} 
        loading={false} 
      />
    );

    const saveButton = screen.getByRole("button", { name: /Salvar/i });
    expect(saveButton).toBeDisabled();
  });

  test("save button is disabled with zero price", () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    const invalidProduct = { id: 1, product: "Test", price: "0" };

    render(
      <ProductEditDialog 
        open={true} 
        product={invalidProduct} 
        onClose={onClose} 
        onSave={onSave} 
        loading={false} 
      />
    );

    const saveButton = screen.getByRole("button", { name: /Salvar/i });
    expect(saveButton).toBeDisabled();
  });
});