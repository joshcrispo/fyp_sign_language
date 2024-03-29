import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TutorialVideo from '../TutorialVideo';

describe('TutorialVideo Component', () => {
  it('renders an iframe with a src based on selectedVideoId', () => {
    const videoId1 = 'abc123';
    const { rerender, container } = render(<TutorialVideo selectedVideoId={videoId1} />);

    let iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/${videoId1}`);

    const videoId2 = 'def456';
    rerender(<TutorialVideo selectedVideoId={videoId2} />);

    iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/${videoId2}`);
  });
});
