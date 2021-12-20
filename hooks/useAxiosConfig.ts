import useFirebaseAuth from "./useFirebaseAuth";

const useAxiosConfig = () => {
    const { token } = useFirebaseAuth();

    return {
        headers: {
            'X-ID-Token': token
        }
    }
}

export default useAxiosConfig;