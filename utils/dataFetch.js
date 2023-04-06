import axios from "axios";
import config from "../config/config.json";

export async function getAllTeams(setTeams, setLoading) {
  try {
    const response = await axios.get(`${config.url}/api/get-teams/`);
    if (response.data.isSuccess) {
      setTeams(response.data.data);
      setLoading(false);
    } else throw response.data.error;
  } catch (err) {
    setLoading(false);
    console.log("[SERVER ERROR][dataFetch.js:getAllTeams]: ", err);
  }
}

export async function getTeam(setTeam, setLoading, id) {
  try {
    const response = await axios.get(`${config.url}/api/get-team/${id}`);
    if (response.data.isSuccess) {
      setTeam(response.data.data);
      setLoading(false);
    } else throw response.data.error;
  } catch (err) {
    setLoading(false);
    console.log("[SERVER ERROR][dataFetch.js:getTeam]: ", err);
  }
}
