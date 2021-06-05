const listHelper = require('../utils/list_helper');

describe('total likes', () => {
  test('empty list returns 0', () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test('only one item returns likes of that item', () => {
    const blogs = [
      {
        title: 'Test',
        author: 'MCLovin',
        url: 'https://MCLovin.love',
        likes: 69,
        id: '60baa8d54fc2020d48e0bf5e',
      },
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(69);
  });

  test('calculates right for long list', () => {
    const blogs = [
      {
        title: 'Test',
        author: 'MCLovin',
        url: 'https://MCLovin.love',
        likes: 69,
        id: '60baa8d54fc2020d48e0bf5e',
      },
      {
        title: 'Backend is pretty cool',
        author: 'Theo',
        url: 'https://backendmasters.com',
        likes: 8,
        id: '60baac3b6c41f50f083a22ee',
      },
      {
        title: 'I love MongoDB',
        author: 'Theo',
        url: 'https://backendmasters.com',
        likes: 1000,
        id: '60baac68b190b50f25d45d07',
      },
      {
        title: 'Refactoring',
        author: 'Theo',
        url: 'https://backendmasters.com',
        likes: 1000,
        id: '60baaec689dfe610a6d13b58',
      },
      {
        title: 'Refactoring part2',
        author: 'Theo',
        url: 'https://backendmasters.com',
        likes: 1000,
        id: '60bab157e68934121808cfdf',
      },
      {
        title: 'Refactoring part3',
        author: 'Theo',
        url: 'https://backendmasters.com',
        likes: 0,
        id: '60bad889e9a50414e9a82e03',
      },
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(3077);
  });
});

describe('top likes', () => {
  test('only one item', () => {
    const blogs = [
      {
        title: 'Test',
        author: 'MCLovin',
        url: 'https://MCLovin.love',
        likes: 69,
        id: '60baa8d54fc2020d48e0bf5e',
      },
    ];
    const result = listHelper.topLikes(blogs);
    expect(result).toEqual({
      title: 'Test',
      author: 'MCLovin',
      url: 'https://MCLovin.love',
      likes: 69,
      id: '60baa8d54fc2020d48e0bf5e',
    });
  });

  test('works with actual input', () => {
    const blogs = [
      {
        title: 'Test',
        author: 'MCLovin',
        url: 'https://MCLovin.love',
        likes: 69,
        id: '60baa8d54fc2020d48e0bf5e',
      },
      {
        title: 'Backend is pretty cool',
        author: 'Theo',
        url: 'https://backendmasters.com',
        likes: 8,
        id: '60baac3b6c41f50f083a22ee',
      },
      {
        title: 'I love MongoDB',
        author: 'Theo',
        url: 'https://backendmasters.com',
        likes: 670,
        id: '60baac68b190b50f25d45d07',
      },
      {
        title: 'Refactoring',
        author: 'Theo',
        url: 'https://backendmasters.com',
        likes: 34,
        id: '60baaec689dfe610a6d13b58',
      },
      {
        title: 'Refactoring part2',
        author: 'Theo',
        url: 'https://backendmasters.com',
        likes: 9,
        id: '60bab157e68934121808cfdf',
      },
      {
        title: 'Refactoring part3',
        author: 'Theo',
        url: 'https://backendmasters.com',
        likes: 0,
        id: '60bad889e9a50414e9a82e03',
      },
    ];

    const result = listHelper.topLikes(blogs);

    expect(result).toEqual({
      title: 'I love MongoDB',
      author: 'Theo',
      url: 'https://backendmasters.com',
      likes: 670,
      id: '60baac68b190b50f25d45d07',
    });
  });
});
