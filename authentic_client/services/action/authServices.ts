import { authKey } from "@/constant/authKey";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorages";
import { instance as axiosInstance } from "@/helper/axios/axiousInstanse";
export const storeUserInfo = (token: string) => {
  return setToLocalStorage(authKey, token);
};
export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

// export const getUserInfo = () => {
//   const authToken = getFromLocalStorage(authKey);
//   //   console.log(authToken)
//   if (authToken) {
//     const decoded: any = decodedToken(authToken);
//     console.log(decoded);
//     return {
//       ...decoded,
//       role: decoded?.role?.toLowerCase(),
//     };
//   }
// };

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};
// export const removedUser = () => {
//   return removeFromLocalStorage(authKey);
// };

// export const logOut = async (data: { id: string }) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/remove_all_devices`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     if (!res.ok) {
//       return await res.json();
//     }

//     return res;
//   } catch (error) {
//     console.error("Error during logout:", error);
//   }
// };
