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
    likes: 87,
    id: '60baac68b190b50f25d45d07',
  },
  {
    title: 'Refactoring',
    author: 'Theo',
    url: 'https://backendmasters.com',
    likes: 65,
    id: '60baaec689dfe610a6d13b58',
  },
  {
    title: 'Refactoring is a core part of programming',
    author: 'Scott',
    url: 'https://syntax.fm',
    likes: 55,
    id: '60bab157e68934121808cfdf',
  },
  {
    title: 'CLI Heroes rock',
    author: 'Soran',
    url: 'https://redhat.com',
    likes: 1000,
    id: '60bab157e68934121808cmj9',
  },
  {
    title: 'Syntax fm is a great podcast',
    author: 'Scott',
    url: 'https://syntax.fm',
    likes: 1000,
    id: '60bab157e68934121808cklm',
  },
  {
    title: 'Considered harmful is considered harmful',
    author: 'Wes',
    url: 'https://syntax.fm',
    likes: 1000,
    id: '60bab157e68934121808cfdf',
  },
  {
    title: "You'l never believe what happens next",
    author: 'Wes',
    url: 'https://syntax.fm',
    likes: 15,
    id: '60bad889e9a50414e9a82e03',
  },
];

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const topLikes = blogs => blogs.sort((a, b) => b.likes - a.likes)[0];

const mostBlogs = blogs => {
  const blogPerAuthor = blogs.reduce((total, post) => {
    total[post.author] = (total[post.author] || 0) + 1;
    return total;
  }, {});
  const keys = Object.keys(blogPerAuthor);
  const values = Object.values(blogPerAuthor);
  return Array.from({ length: keys.length }, (_, i) => ({
    author: keys[i],
    blogs: values[i],
  })).sort((a, b) => b.blogs - a.blogs)[0];
};

const mostLikes = blogs => {
  const likesPerAuthor = blogs.reduce((total, post) => {
    total[post.author] = (total[post.author] || 0) + post.likes;
    return total;
  }, {});
  const keys = Object.keys(likesPerAuthor);
  const values = Object.values(likesPerAuthor);
  return Array.from({ length: keys.length }, (_, i) => ({
    author: keys[i],
    likes: values[i],
  })).sort((a, b) => b.likes - a.likes)[0];
};

module.exports = {
  totalLikes,
  topLikes,
  mostBlogs,
  mostLikes,
};
