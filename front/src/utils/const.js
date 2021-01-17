export const modes = {
    CREATE_PAGE: 'CREATE_PAGE',
    EDIT_DOMAIN: 'EDIT_DOMAIN',
    EDIT_PAGE: 'EDIT_PAGE',
    READ_DOMAIN_INFO: 'READ_DOMAIN_INFO',
    READ_PAGE_INFO: 'READ_PAGE_INFO',
}

export const modesCategory = {
    DOMAIN: [
        modes.READ_DOMAIN_INFO,
        modes.EDIT_DOMAIN,
    ],
    PAGE: [
        modes.CREATE_PAGE,
        modes.EDIT_PAGE,
        modes.READ_PAGE_INFO,
    ],
    EDIT: [
        modes.EDIT_PAGE,
        modes.EDIT_DOMAIN,
    ],
    CREATE: [
        modes.CREATE_PAGE,
    ]
}
