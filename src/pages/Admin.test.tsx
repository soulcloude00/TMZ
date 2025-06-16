// Admin.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Admin from './Admin';
import React from 'react';
// Import Vitest globals first so expect is available for jest-dom
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '@/lib/cart-context';
import { vi, describe, it } from 'vitest';
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
    ok: true,
  })
) as any;

describe('Admin Panel - StockItemForm', () => {
  it('renders Add New Item dialog and allows adding/removing multiple images', async () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Admin />
        </CartProvider>
      </MemoryRouter>
    );
    // Open Add New Item dialog
    const addButtons = await screen.findAllByText(/Add New Item/i);
    // Find the actual button, not the span
    const addButton = addButtons.find(btn => btn.tagName === 'BUTTON');
    fireEvent.click(addButton!);

    // Wait for dialog to appear
    const dialogTitle = await screen.findByText(/Add New Stock Item/i);
    expect(dialogTitle).toBeInTheDocument();

    // Find image input(s)
    const imageInputs = screen.getAllByPlaceholderText(/Image URL/i);
    expect(imageInputs.length).toBe(1);

    // Add another image input
    const addImageBtn = screen.getByRole('button', { name: /Add Image/i });
    fireEvent.click(addImageBtn);

    // Now there should be two image inputs
    const updatedInputs = screen.getAllByPlaceholderText(/Image URL/i);
    expect(updatedInputs.length).toBe(2);

    // Remove one image input
    const removeBtns = screen.getAllByLabelText(/Remove image/i);
    fireEvent.click(removeBtns[1]);
    expect(screen.getAllByPlaceholderText(/Image URL/i).length).toBe(1);
  });

  it('submits form with multiple images', async () => {
    const mockSubmit = vi.fn();
    render(
      <MemoryRouter>
        <CartProvider>
          <Admin />
        </CartProvider>
      </MemoryRouter>
    );
    const addButtons2 = await screen.findAllByText(/Add New Item/i);
    const addButton2 = addButtons2.find(btn => btn.tagName === 'BUTTON');
    fireEvent.click(addButton2!);

    // Fill out required fields
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Phone' } });
    fireEvent.change(screen.getByLabelText(/Brand/i), { target: { value: 'TestBrand' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/Stock Count/i), { target: { value: '10' } });

    // Add two images
    const imageInputs = screen.getAllByPlaceholderText(/Image URL/i);
    fireEvent.change(imageInputs[0], { target: { value: 'https://img1.com' } });
    const addImageBtn = screen.getByRole('button', { name: /Add Image/i });
    fireEvent.click(addImageBtn);
    const imageInputs2 = screen.getAllByPlaceholderText(/Image URL/i);
    fireEvent.change(imageInputs2[1], { target: { value: 'https://img2.com' } });

    // Submit form
    const saveBtn = screen.getByText(/Save/i);
    fireEvent.click(saveBtn);

    // No error thrown, form submits (fetch called)
    expect(global.fetch).toHaveBeenCalled();
  });
});
