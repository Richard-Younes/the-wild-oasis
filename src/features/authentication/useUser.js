import { useQuery } from '@tanstack/react-query';
import { getCurrentUSer } from '../../services/apiAuth';

export function useUser() {
	const { isLoading, data: user } = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUSer,
	});

	return { isLoading, user, isAuthenticated: user?.role === 'authenticated' };
}
