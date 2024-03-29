import { fireEvent, render, screen } from '@testing-library/react';
import PinnedSubheaderList from '../PinnedSubheaderList';

it('renders "Getting Started" model in the list', () => {
    const models = ["Getting Started", "Another Model"];
    const onModelSelect = jest.fn();

    render(<PinnedSubheaderList models={models} selectedModel={"Getting Started"} onModelSelect={onModelSelect} />);
    const listItemElement = screen.getByText(/another model/i);
    expect(listItemElement).toBeInTheDocument();
  });

it('renders "Another" model in the list', () => {
    const models = ["Getting Started", "Another Model"];
    const onModelSelect = jest.fn();

    render(<PinnedSubheaderList models={models} selectedModel={"Getting Started"} onModelSelect={onModelSelect} />);
    const listItemElement = screen.getByText(/another model/i);
    expect(listItemElement).toBeInTheDocument();
});

it('doesntrenders model not in the list', () => {
    const models = ["Getting Started", "Another Model"];
    const onModelSelect = jest.fn();
  
    render(<PinnedSubheaderList models={models} selectedModel={"Getting Started"} onModelSelect={onModelSelect} />);
    const listItemElement = screen.queryByText(/no model/i);
    expect(listItemElement).not.toBeInTheDocument();
});

it('PinnedSubheaderList renders correctly and matches snapshot', () => {
    const models = ["Getting Started", "Another Model"];
    const { asFragment } = render(<PinnedSubheaderList models={models} selectedModel="Getting Started" onModelSelect={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
});

it('selecting a model triggers onModelSelect callback', () => {
    const models = ["Getting Started", "Another Model"];
    const onModelSelect = jest.fn();
    render(<PinnedSubheaderList models={models} selectedModel={"Another Model"} onModelSelect={onModelSelect} />);
    
    const modelButton = screen.getByRole('button', { name: /another model/i });
    fireEvent.click(modelButton);
    
    expect(onModelSelect).toHaveBeenCalledWith("Another Model");
});
