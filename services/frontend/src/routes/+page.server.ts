import { DefaultApi } from '$lib/generated-client/apis/DefaultApi'
import type { PageServerLoad } from './$types';

const apiInstance = new DefaultApi();

export const load: PageServerLoad = async () => {
    const assignmentsData = await apiInstance.accountDataAssignmentsGet() 
    return {assignmentsData};
}