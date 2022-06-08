import React from 'react';
import {
    Link,
    useMatch,
    useResolvedPath,
    LinkProps,
} from "react-router-dom";

const CustomLink = ({ children, to, ...props }: LinkProps) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link
            style={{ color: match ? 'black' : 'gray', fontWeight: match ? 'bold' : 'normal' }}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
};

export default CustomLink;