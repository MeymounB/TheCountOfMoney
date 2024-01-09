export function useGetAllCryptos() {
  const crudQuery = {
    pageSize: 10000,
    page: 1,
  };

  return function () {
    return useFetchAPI<{
      data: { name: string; symbol: string; image_url: string; id: string }[];
    }>(
      "GET",
      `cryptos?crudQuery=${JSON.stringify(crudQuery)}&includeFiats=false`,
    );
  };
}

export function useGetAllAPICurrencies() {
  return function () {
    return useFetchAPI<{ pages: any[] }>("GET", "cryptos/api-currencies");
  };
}

export function useRegisterCryptoCurrency() {
  return function (symbol: string) {
    return useFetchAPI("POST", "bo/cryptos/register/" + symbol);
  };
}

export function useDeleteCryptoCurrency() {
  return function (id: number) {
    return useFetchAPI("DELETE", "bo/cryptos/" + id);
  };
}

// export function useCreateUser() {
//   return function (createUserdto: signUpDto) {
//     return useFetchAPI<UserEntity>("POST", "auth/register", createUserdto);
//   };
// }
//
// export function useUpdateUser() {
//   return function (id: number, updateUserdto: Partial<UserEntity>) {
//     return useFetchAPI<UserEntity>("PATCH", `users/${id}`, updateUserdto);
//   };
// }
//
// export function useDeleteUser() {
//   return function (id: number) {
//     return useFetchAPI<void>("DELETE", `users/${id}`);
//   };
// }
