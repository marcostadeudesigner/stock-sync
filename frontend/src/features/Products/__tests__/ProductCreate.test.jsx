import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCreate } from "../ProductCreate";

describe("ProductCreate", () => {
  test("calls onCreate with product and price when form is valid", async () => {
    const user = userEvent.setup();
    const onCreate = jest.fn();
    render(<ProductCreate onCreate={onCreate} loading={false} />);

    await user.type(screen.getByLabelText(/Nome do Produto/i), "Test Product");
    await user.type(screen.getByLabelText(/Preço/i), "12.34");

    const button = screen.getByRole("button", { name: /Criar Produto/i });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    await user.click(button);

    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(onCreate).toHaveBeenCalledWith({ product: "Test Product", price: "12.34" });
  });

  test("button is disabled when form is empty and does not call onCreate", () => {
    const onCreate = jest.fn();
    render(<ProductCreate onCreate={onCreate} loading={false} />);

    const button = screen.getByRole("button", { name: /Criar Produto/i });

    // Button should be disabled when form is empty
    expect(button).toBeDisabled();
    expect(onCreate).not.toHaveBeenCalled();
  });

  test("button remains disabled with only product name filled", async () => {
    const user = userEvent.setup();
    const onCreate = jest.fn();
    render(<ProductCreate onCreate={onCreate} loading={false} />);

    await user.type(screen.getByLabelText(/Nome do Produto/i), "Test Product");

    const button = screen.getByRole("button", { name: /Criar Produto/i });
    expect(button).toBeDisabled();
  });

  test("button remains disabled with only price filled", async () => {
    const user = userEvent.setup();
    const onCreate = jest.fn();
    render(<ProductCreate onCreate={onCreate} loading={false} />);

    await user.type(screen.getByLabelText(/Preço/i), "12.34");

    const button = screen.getByRole("button", { name: /Criar Produto/i });
    expect(button).toBeDisabled();
  });

  test("button remains disabled when price is invalid", async () => {
    const user = userEvent.setup();
    const onCreate = jest.fn();
    render(<ProductCreate onCreate={onCreate} loading={false} />);

    await user.type(screen.getByLabelText(/Nome do Produto/i), "Test Product");
    await user.type(screen.getByLabelText(/Preço/i), "0");

    const button = screen.getByRole("button", { name: /Criar Produto/i });
    expect(button).toBeDisabled();
  });
});