import axios from 'axios';

export const sendQuestion = async (questionText) => {
  const res = await axios.post('http://localhost:5000/api/questions', { questionText });
  return res.data;
};
