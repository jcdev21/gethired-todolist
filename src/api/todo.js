import axios from './axios.instance';
// import { config } from '../configs';

// export async function getAll() {
// 	return await axios.get(`/activity-groups?email=${config.email}`);
// }

// export async function getDetail(id) {
// 	return await axios.get(`/activity-groups/${id}`);
// }

export async function store(data) {
	return await axios.post(`/todo-items`, { ...data, is_active: false });
}

export async function update(id, dataUpdate) {
	return await axios.patch(`/todo-items/${id}`, dataUpdate);
}

// export async function destroy(id) {
// 	return await axios.delete(`/activity-groups/${id}`);
// }
