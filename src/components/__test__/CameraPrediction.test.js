import { render, screen } from '@testing-library/react';
import CameraPrediction from '../CameraPrediction';

describe('CameraPrediction Component', () => {
  it('should display the countdown when provided', () => {
    render(<CameraPrediction isLoading={false} predictionResult="" countdown="3" />);
    const countdownElement = screen.getByText("3");
    expect(countdownElement).toBeInTheDocument();
    expect(countdownElement).toHaveStyle('color: #7ED957');
  });

  it('should display the prediction result when provided', () => {
    const testPredictionResult = "This is a test prediction";
    render(<CameraPrediction isLoading={false} predictionResult={testPredictionResult} countdown="" />);
    const predictionResultElement = screen.getByText(testPredictionResult);
    expect(predictionResultElement).toBeInTheDocument();
  });

  it('should not display the countdown if not provided', () => {
    const { container } = render(<CameraPrediction isLoading={false} predictionResult="" countdown={null} />);
    const countdownElement = container.querySelector(".countdown");
    expect(countdownElement).not.toBeInTheDocument();
  });
  
  it('shows loading spinner when isLoading is true', () => {
    const { container } = render(<CameraPrediction isLoading={true} predictionResult="" countdown={null} />);
    const loadingSpinnerContainer = container.querySelector(".loading-spinner"); // Select the container
    expect(loadingSpinnerContainer).toBeInTheDocument();
    expect(loadingSpinnerContainer).toHaveStyle('display: flex');
  });

});
