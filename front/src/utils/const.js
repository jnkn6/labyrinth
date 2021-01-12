export const modes = {
    CREATE_NEW_PAGE: 'CREATE_NEW_PAGE',
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
        modes.CREATE_NEW_PAGE,
        modes.EDIT_PAGE,
        modes.READ_PAGE_INFO,
    ],
    EDIT: [
        modes.CREATE_NEW_PAGE,
        modes.EDIT_PAGE,
        modes.EDIT_DOMAIN,
    ]
}
