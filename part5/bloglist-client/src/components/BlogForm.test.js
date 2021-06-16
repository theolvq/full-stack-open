import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('should call event handler passed as prop with the right details', () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const authorInput = component.container.querySelector('#author');
  const titleInput = component.container.querySelector('#title');
  const urlInput = component.container.querySelector('#url');

  const form = component.container.querySelector('form');

  fireEvent.change(authorInput, {
    target: { value: 'Brandon Sanderson' },
  });
  fireEvent.change(titleInput, {
    target: { value: 'this is complicated' },
  });
  fireEvent.change(urlInput, {
    target: { value: 'www.brandonsanderson.com' },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].author).toBe('Brandon Sanderson');
  expect(createBlog.mock.calls[0][0].title).toBe('this is complicated');
  expect(createBlog.mock.calls[0][0].url).toBe('www.brandonsanderson.com');
});
