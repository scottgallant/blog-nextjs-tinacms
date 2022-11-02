// import ThemeSwitch from './ThemeSwitch'
// import React from "react";
import Link from "next/link";
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { MenuIcon, XIcon } from '@heroicons/react/outline'
// // import SocialLinks from './social-links'
// import { useRouter } from "next/router";

export default function Navbar({ data }) {
    return (
        <div className="px-12">
            <div>{data.siteName}</div>
            <ul>
                {data.header.links && data.header.links.map((item, i) => {
                    return (
                        <li>
                            <Link href={item.url}>
                                <a>
                                    {item.text}
                                </a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            {/* <ThemeSwitch /> */}

        </div>
    );
};
