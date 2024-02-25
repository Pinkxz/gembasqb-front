import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'https://localhost:8080';

const fetchData = async () => {
    const response = await axios.get(API_URL + '/servicos');
    return response.data;
}

export function serviceHook() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['services-hook'],
        retry: 2
    });
 
    return {
        ...query,
        data: query.data?.data
    };
}
