import { render, screen, fireEvent, within } from '@testing-library/react';
import FeedbackForm from './feedback-form';

describe('FeedbackForm', () => {
  it('should render correctly', () => {
    const { getByText } = render(<FeedbackForm open={true} email="test@example.com" />);
    
    expect(getByText('How was your class today?')).toBeInTheDocument();
    expect(getByText('Terrible')).toBeInTheDocument();
    expect(getByText('Okay')).toBeInTheDocument();
    expect(getByText('Awesome')).toBeInTheDocument();
  });

  it('should update selected reason on select change', () => {
    const { getByText, getByRole, getAllByRole } = render(<FeedbackForm open={true} email="test@example.com" />);

    fireEvent.click(getByText('Terrible'));
    fireEvent.mouseDown(getAllByRole('button')[3]);
    const listbox = within(getByRole('listbox'));
    fireEvent.click(listbox.getByText('I feel very boring'));

    expect(screen.getAllByText('I feel very boring')[1]).toHaveAttribute('aria-selected', "true");
  });
});
