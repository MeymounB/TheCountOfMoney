export function useGetMe() {
  return function () {
    return useFetchAPI<any>("GET", "bo/users/me");
  };
}

export function useGetUser() {
  return function (id: string) {
    return useFetchAPI<any>("GET", `users/${id}`);
  };
}

export function useGetAllUsers() {
  return function () {
    return useFetchAPI<any[]>("GET", "users");
  };
}

export function useCreateUser() {
  return function (createUserdto: any) {
    return useFetchAPI<any>("POST", "auth/register", createUserdto);
  };
}

export function useUpdateUser() {
  return function (id: number, updateUserdto: any) {
    return useFetchAPI<any>("PATCH", `users/${id}`, updateUserdto);
  };
}

export function useDeleteUser() {
  return function (id: number) {
    return useFetchAPI<void>("DELETE", `users/${id}`);
  };
}
