import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'Testing component is fun too',
    author: 'Theo',
    url: 'https://fullstackopen.com/en',
    likes: 33,
    user: {
      name: 'John',
    },
  };

  let component;
  const likeHandler = jest.fn();
  beforeEach(() => {
    component = render(<Blog blog={blog} addLike={likeHandler} />);
  });
  test('should render blog title and author but no url or likes by default', () => {
    expect(component.container).toHaveTextContent(
      'Testing component is fun too',
      'Theo'
    );
    expect(component.container).not.toHaveTextContent(
      'https://fullstackopen.com/en',
      '33'
    );
  });

  test('should render url and likes once show more button has been clicked', () => {
    const detailsButton = component.container.querySelector('.details');
    fireEvent.click(detailsButton);

    expect(component.container).toHaveTextContent(
      'https://fullstackopen.com/en',
      '33'
    );
  });

  test('should be called twice if button clicked twice', () => {
    const detailsButton = component.container.querySelector('.details');
    fireEvent.click(detailsButton);

    const likeButton = component.container.querySelector('.like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(likeHandler.mock.calls).toHaveLength(2);
  });
});
