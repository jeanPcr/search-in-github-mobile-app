import { BACKEND_BASE_URL } from "@env";

export const getProfileByUsername = async (username: string): Promise<any> => {
  return await await fetch(`${BACKEND_BASE_URL}/api/user/${username}`)
    .then((res) => res.json() as Promise<any>)
    .catch((err) => console.log(err));
};
