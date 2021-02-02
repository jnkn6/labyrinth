export const modes = {
    EDIT_COMPONENT: 'EDIT_COMPONENT',
    EDIT_DOMAIN: 'EDIT_DOMAIN',
    EDIT_PAGE: 'EDIT_PAGE',
    READ_DOMAIN_INFO: 'READ_DOMAIN_INFO',
    READ_PAGE_INFO: 'READ_PAGE_INFO',
    READ_COMPONENT_INFO: 'READ_COMPONENT_INFO',
}

export const modesCategory = {
    DOMAIN: [
        modes.READ_DOMAIN_INFO,
        modes.EDIT_DOMAIN,
    ],
    PAGE: [
        modes.EDIT_PAGE,
        modes.READ_PAGE_INFO,
    ],
    COMPONENT: [
        modes.EDIT_COMPONENT,
        modes.READ_COMPONENT_INFO,
    ],
    EDIT: [
        modes.EDIT_PAGE,
        modes.EDIT_DOMAIN,
        modes.EDIT_COMPONENT,
    ],
}
