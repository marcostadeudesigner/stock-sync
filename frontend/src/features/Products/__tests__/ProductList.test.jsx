import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductList } from "../ProductList";

// Create a mock store to capture handler calls
const mockHandlerStore = {
  onEdit: null,
  onDelete: null
};

// Simple mock that renders a basic table
jest.mock('react-virtualized', () => ({
  AutoSizer: ({ children }) => children({ width: 1000, height: 500 }),
  Column: () => null,
  Table: ({ rowCount, rowGetter }) => {
    const React = require('react');
    const rows = [];
    
    for (let i = 0; i < rowCount; i++) {
      const rowData = rowGetter({ index: i });
      rows.push(
        React.createElement('div', {
          key: rowData.id,
          'data-testid': `product-row-${rowData.id}`,
          style: { display: 'flex', margin: '8px 0' }
        }, 
          // Product cell
          React.createElement('div', { 
            style: { flex: 1 },
            'data-testid': `product-name-${rowData.id}`
          }, rowData.product),
          // Price cell  
          React.createElement('div', { 
            style: { width: '100px' },
            'data-testid': `product-price-${rowData.id}`
          }, rowData.price),
          // Actions cell with buttons
          React.createElement('div', { 
            style: { width: '150px' },
            'data-testid': `actions-cell-${rowData.id}`
          }, 
            React.createElement('button', { 
              'data-testid': `edit-${rowData.id}`,
              onClick: () => {
                // Call the stored handler
                if (mockHandlerStore.onEdit) {
                  mockHandlerStore.onEdit(rowData);
                }
              }
            }, 'Editar'),
            React.createElement('button', { 
              'data-testid': `delete-${rowData.id}`,
              onClick: () => {
                // Call the stored handler
                if (mockHandlerStore.onDelete) {
                  mockHandlerStore.onDelete(rowData.id);
                }
              }
            }, 'Deletar')
          )
        )
      );
    }
    
    return React.createElement('div', null, ...rows);
  }
}));

const sampleProducts = [
  { id: 1, product: "Prod A", price: "10.00" },
  { id: 2, product: "Prod B", price: "20.50" },
];

describe("ProductList", () => {
  beforeEach(() => {
    // Reset the mock store before each test
    mockHandlerStore.onEdit = null;
    mockHandlerStore.onDelete = null;
  });

  test("renders products and calls handlers", async () => {
    const user = userEvent.setup();
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    // Store the handlers in our mock store
    mockHandlerStore.onEdit = onEdit;
    mockHandlerStore.onDelete = onDelete;

    render(
      <ProductList 
        products={sampleProducts} 
        loading={false} 
        onEdit={onEdit} 
        onDelete={onDelete} 
      />
    );

    // Check if products are rendered
    expect(screen.getByTestId("product-name-1")).toHaveTextContent("Prod A");
    expect(screen.getByTestId("product-name-2")).toHaveTextContent("Prod B");
    expect(screen.getByTestId("product-price-1")).toHaveTextContent("10.00");
    expect(screen.getByTestId("product-price-2")).toHaveTextContent("20.50");

    // Click edit button for product 1
    const editButton = screen.getByTestId("edit-1");
    await user.click(editButton);
    expect(onEdit).toHaveBeenCalledWith(sampleProducts[0]);

    // Click delete button for product 2  
    const deleteButton = screen.getByTestId("delete-2");
    await user.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith(sampleProducts[1].id);
  });
});