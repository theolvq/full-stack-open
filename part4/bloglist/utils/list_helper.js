const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const topLikes = blogs => blogs.sort((a, b) => b.likes - a.likes)[0];

module.exports = {
  totalLikes,
  topLikes,
};
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
