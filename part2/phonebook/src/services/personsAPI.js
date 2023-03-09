import axios from 'axios'

const PATH = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(PATH).then(response => response.data);
};

const create = newPerson => {
  return axios.post(PATH, newPerson).then(response => response.data);
};

const update = person => {
  return axios.put(PATH + `/${person.id}`, person)
              .then(response => response.data);
};

const deleteById = id => {
  return axios.delete(PATH + `/${id}`)
              .then(response => response.status === 200);
}

export default { getAll, create, update, deleteById }