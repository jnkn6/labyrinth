import { FETCH_DOMAIN_NODES } from './mutations-types'
import { DOMAININFO_QUERY } from '@/graphql/domain'

export default {
    fetchDomainNodes({commit}, {vue, domain}){
        vue.$apollo.query({
            query: DOMAININFO_QUERY,
                variables : {
                    url: domain
                },
        }).then(res => {
            commit(FETCH_DOMAIN_NODES, [{
                id: res.data.domainInfo._id,
                type: 'domain',
                data: { ...res.data.domainInfo },
                position: {x:100, y:100}
            }]);
        })
    },
}