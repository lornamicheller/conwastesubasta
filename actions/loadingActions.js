export const LOADING = "LOADING";

export function setLoading(loading: boolean) {
  return {
    type: LOADING,
    loading
  };
}
