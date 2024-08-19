import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App'; // Ensure this path is correct based on your directory structure

test('deletes a question when the delete button is clicked', async () => {
  // Render the App component
  render(<App />);

  // Click the "View Questions" button to show the questions list
  fireEvent.click(screen.getByText(/View Questions/i));

  // Wait for the question to appear in the DOM
  const questionItem = await screen.findByText(/lorem testum 1/i);

  // Ensure the question is displayed
  expect(questionItem).toBeInTheDocument();

  // Find the delete button for the question item
  const deleteButton = screen.getByRole('button', { name: /Delete/i });

  // Click the delete button
  fireEvent.click(deleteButton);

  // Wait for the question to be removed from the DOM
  await waitFor(() => {
    expect(questionItem).not.toBeInTheDocument();
  });
});
