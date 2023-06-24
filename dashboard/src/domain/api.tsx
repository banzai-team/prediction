import axios from "axios";
import { config } from "../config/config";

export type SendModelPayload = { file: any };

export function sendModel(payload: SendModelPayload) {
  const form = new FormData();

  form.append("files", payload.file);

  return axios.post(`${config.apiUrl}/import/building-object`, form, {
    headers: {
      'Content-Type': `multipart/form-data;`,
    },
  });
}

export function getTasks(id: string | undefined) {
    return axios.get(`${config.apiUrl}/building-object/${id}/tasks`);
}

export function getObjects() {
  return axios.get(`${config.apiUrl}/building-object`);
}

//
// export function addFlat(payload: SendModelPayload) {
//   const form = new FormData();
//
//   form.append("file", payload.file);
//
//   return axios.post(`${config.apiUrl}/process_floorplan`, form, {
//     headers: {
//       'Content-Type': `multipart/form-data;`,
//     },
//   });
// }
//
// export function getJobs() {
//   return axios.get(`${config.apiUrl}/jobs`);
// }
//
// export function getJob(id: number | string) {
//   return axios.get(`${config.apiUrl}/jobs/${id}`);
// }
//
// export async function getFlats() {
//   const flats = await axios.get(`${config.apiUrl}/flats`);
//
//   return flats.data;
// }
//
// export async function getFlat(id: number | string) {
//   const flat = await axios.get(`${config.apiUrl}/flat/${id}`);
//
//   return flat.data;
// }
//
// export async function getFlatScans(id: number | string) {
//   const scans = await axios.get(`${config.apiUrl}/flat_scan_by_flat/${id}`);
//
//   return scans.data;
// }
