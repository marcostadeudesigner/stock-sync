import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductList } from "../ProductList";

const sampleProducts = [
  { id: 1, product: "Prod A", price: "10.00" },
  { id: 2, product: "Prod B", price: "20.50" },
];

describe("ProductList", () => {
  test("renders products and calls handlers", async () => {
    const user = userEvent.setup();
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    render(<ProductList products={sampleProducts} loading={false} onEdit={onEdit} onDelete={onDelete} />);

    expect(screen.getByText(/Prod A/)).toBeInTheDocument();
    expect(screen.getByText(/Prod B/)).toBeInTheDocument();

    const editButtons = screen.getAllByRole("button", { name: /Editar/i });
    await user.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledWith(sampleProducts[0]);

    const deleteButtons = screen.getAllByRole("button", { name: /Deletar/i });
    await user.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledWith(sampleProducts[1].id);
  });
});