import { authKey } from "@/constant/authKey";
import { setToLocalStorage } from "@/utils/localStorages";

export const storeUserInfo = (token: string) => {
  return setToLocalStorage(authKey, token);
};
